# Portfolio personal

Este proyecto es una web estatica, asi que puedes publicarla en un VPS Linux sin backend ni base de datos. La opcion mas simple y estable es servirla con `nginx`.

## Estructura

- `index.html`: pagina principal
- `editor.html`: editor auxiliar
- `assets/`: estilos, scripts e imagenes
- `static/`: contenido estatico adicional
- `deploy/nginx/portfolio.conf`: configuracion base de `nginx` para el VPS

## Opcion recomendada: VPS Linux + nginx + HTTPS

Estas instrucciones asumen un VPS con Ubuntu o Debian y un dominio apuntando a la IP del servidor.

### 1. Apunta tu dominio al VPS

En tu proveedor DNS crea estos registros:

- `A` para `@` apuntando a la IP publica de tu VPS
- `A` para `www` apuntando a la misma IP

Si aun no tienes dominio, puedes probar la web con la IP del VPS, pero no tendras HTTPS valido con Certbot hasta configurar el dominio.

### 2. Instala nginx en el VPS

Conectate por SSH:

```bash
ssh usuario@IP_DEL_VPS
```

Instala `nginx` y Certbot:

```bash
sudo apt update
sudo apt install -y nginx certbot python3-certbot-nginx
```

### 3. Crea la carpeta del sitio

```bash
sudo mkdir -p /var/www/portfolio
sudo chown -R $USER:$USER /var/www/portfolio
```

### 4. Sube tu portfolio desde tu PC

Desde la carpeta local del proyecto, sube los archivos por `scp`:

```bash
scp -r index.html editor.html assets static usuario@IP_DEL_VPS:/var/www/portfolio/
```

Si mas adelante cambias algo, repite ese comando para actualizar la web.

### 5. Configura nginx

La plantilla [`deploy/nginx/portfolio.conf`](deploy/nginx/portfolio.conf) ya esta preparada para funcionar sin dominio de pago usando la IP del VPS, porque incluye `server_name _;`.

Si en el futuro compras un dominio, podras cambiar esa linea por algo como:

```nginx
server_name tu-dominio.com www.tu-dominio.com;
```

Puedes copiarla asi:

```bash
scp deploy/nginx/portfolio.conf usuario@IP_DEL_VPS:/tmp/portfolio.conf
```

Luego, en el VPS:

```bash
sudo mv /tmp/portfolio.conf /etc/nginx/sites-available/portfolio.conf
sudo ln -s /etc/nginx/sites-available/portfolio.conf /etc/nginx/sites-enabled/portfolio.conf
sudo rm -f /etc/nginx/sites-enabled/default
sudo nginx -t
sudo systemctl reload nginx
```

### 6. Activa HTTPS

Este paso solo aplica si mas adelante decides usar un dominio. Cuando el dominio ya resuelva hacia tu VPS, ejecuta:

```bash
sudo certbot --nginx -d TU_DOMINIO.com -d www.TU_DOMINIO.com
```

Comprueba que la renovacion automatica esta activa:

```bash
sudo systemctl status certbot.timer
```

## Actualizar la web en el futuro

Cada vez que cambies el portfolio:

```bash
scp -r index.html editor.html assets static usuario@IP_DEL_VPS:/var/www/portfolio/
```

No hace falta reiniciar `nginx` para cambios de HTML, CSS, JS o imagenes.

## Comprobaciones utiles en el VPS

```bash
sudo nginx -t
sudo systemctl status nginx
ls -la /var/www/portfolio
curl -I http://TU_DOMINIO.com
```

## Despliegue alternativo

Si prefieres montarlo con Docker, Portainer o Coolify, la web tambien es compatible porque solo necesita servir archivos estaticos. Aun asi, para una pagina personal en VPS, `nginx` directo suele ser la opcion mas simple.
