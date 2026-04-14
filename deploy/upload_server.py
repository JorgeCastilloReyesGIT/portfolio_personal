#!/usr/bin/env python3
import argparse
import base64
import json
import re
import unicodedata
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import urlparse


ALLOWED_MIME_TYPES = {
    "image/png": ".png",
    "image/jpeg": ".jpg",
    "image/webp": ".webp",
    "image/gif": ".gif",
    "image/avif": ".avif",
    "image/svg+xml": ".svg",
}

MAX_REQUEST_BYTES = 12 * 1024 * 1024
MAX_IMAGE_BYTES = 8 * 1024 * 1024


def sanitize_filename(file_name: str, mime_type: str) -> str:
    raw_name = (file_name or "certificado").strip()
    source_path = Path(raw_name)
    base_name = source_path.stem or "certificado"
    extension = source_path.suffix.lower()

    if extension not in ALLOWED_MIME_TYPES.values():
        extension = ALLOWED_MIME_TYPES[mime_type]

    normalized = unicodedata.normalize("NFD", base_name)
    ascii_name = normalized.encode("ascii", "ignore").decode("ascii")
    safe_name = re.sub(r"\s+", "-", ascii_name)
    safe_name = re.sub(r"[^a-zA-Z0-9._-]", "-", safe_name)
    safe_name = re.sub(r"-+", "-", safe_name).strip("-.") or "certificado"

    return f"{safe_name}{extension}"


class UploadHandler(BaseHTTPRequestHandler):
    server_version = "PortfolioUpload/1.0"

    @property
    def certificates_dir(self) -> Path:
        return self.server.certificates_dir

    def do_OPTIONS(self):
        self.send_response(204)
        self._send_common_headers()
        self.end_headers()

    def do_GET(self):
        parsed = urlparse(self.path)

        if parsed.path == "/api/health":
            self._send_json(200, {"ok": True, "path": "health"})
            return

        self._send_json(404, {"ok": False, "error": "Ruta no encontrada."})

    def do_POST(self):
        parsed = urlparse(self.path)

        if parsed.path != "/api/upload/certificate":
            self._send_json(404, {"ok": False, "error": "Ruta no encontrada."})
            return

        try:
            payload = self._read_json_body()
            relative_path = self._save_certificate(payload)
        except ValueError as error:
            self._send_json(400, {"ok": False, "error": str(error)})
            return
        except Exception as error:
            self._send_json(500, {"ok": False, "error": str(error)})
            return

        self._send_json(200, {"ok": True, "path": relative_path})

    def log_message(self, format, *args):
        return

    def _read_json_body(self):
        content_length = int(self.headers.get("Content-Length", "0") or "0")

        if content_length <= 0:
            raise ValueError("El cuerpo de la peticion esta vacio.")

        if content_length > MAX_REQUEST_BYTES:
            raise ValueError("La peticion supera el limite permitido.")

        raw_body = self.rfile.read(content_length)

        try:
            return json.loads(raw_body.decode("utf-8"))
        except json.JSONDecodeError as error:
            raise ValueError("La peticion no contiene JSON valido.") from error

    def _save_certificate(self, payload):
        data_url = str(payload.get("dataUrl") or "")
        file_name = str(payload.get("fileName") or "")

        match = re.match(r"^data:(image/[a-zA-Z0-9.+-]+);base64,(.+)$", data_url, re.DOTALL)
        if not match:
            raise ValueError("Solo se aceptan imagenes en formato data URL base64.")

        mime_type = match.group(1)
        encoded_data = match.group(2)

        if mime_type not in ALLOWED_MIME_TYPES:
            raise ValueError("El formato de imagen no esta soportado.")

        try:
            image_bytes = base64.b64decode(encoded_data, validate=True)
        except ValueError as error:
            raise ValueError("La imagen enviada no tiene un base64 valido.") from error

        if len(image_bytes) > MAX_IMAGE_BYTES:
            raise ValueError("La imagen supera el limite de 8 MB.")

        final_name = sanitize_filename(file_name, mime_type)
        final_path = self.certificates_dir / final_name
        final_path.write_bytes(image_bytes)

        return f"static/certificates/{final_name}"

    def _send_common_headers(self):
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type")
        self.send_header("Cache-Control", "no-store")

    def _send_json(self, status_code, payload):
        body = json.dumps(payload).encode("utf-8")
        self.send_response(status_code)
        self._send_common_headers()
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)


def build_parser():
    parser = argparse.ArgumentParser(description="Portfolio certificate upload server")
    parser.add_argument("--host", default="127.0.0.1")
    parser.add_argument("--port", type=int, default=8787)
    parser.add_argument(
        "--root",
        default=str(Path(__file__).resolve().parents[1]),
        help="Project root that contains static/certificates",
    )
    return parser


def main():
    args = build_parser().parse_args()
    root_path = Path(args.root).resolve()
    certificates_dir = root_path / "static" / "certificates"
    certificates_dir.mkdir(parents=True, exist_ok=True)

    server = ThreadingHTTPServer((args.host, args.port), UploadHandler)
    server.certificates_dir = certificates_dir
    server.serve_forever()


if __name__ == "__main__":
    main()
