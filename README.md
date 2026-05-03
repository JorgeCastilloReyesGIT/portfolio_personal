# Jorge Castillo — Portfolio personal

Portfolio profesional de Jorge Castillo, desarrollador junior backend enfocado en Python, Java/Spring Boot, APIs REST, automatización con n8n, IA aplicada y despliegue en VPS.

## Objetivo

Este portfolio está pensado para procesos de selección de perfiles como:

- Junior Backend Developer
- Junior Python Developer
- Junior Java / Spring Boot Developer
- Software Developer Junior
- Automation Developer Junior
- Perfil técnico junior con backend, APIs, automatización y deploy

La web muestra experiencia, proyectos, stack técnico, formación, certificados y vías de contacto en una página clara, visual y fácil de revisar por recruiters o equipos técnicos.

## Secciones principales

- Presentación profesional
- Proyectos destacados
- Skills técnicas
- Experiencia profesional
- Formación
- Certificados
- Contacto y enlaces externos

## Stack

- HTML
- CSS
- JavaScript
- GitHub
- VPS / Nginx
- Docker / Linux

## Proyectos destacados en la web

- Calculadora de afinidad CV-oferta
- Captación automatizada de contactos con n8n y webhooks
- Despliegue de servicios en VPS
- APIs REST con Java y Django

## Despliegue recomendado: VPS Linux + nginx + HTTPS

Este proyecto es una web estática, así que puedes publicarla en un VPS Linux sin backend ni base de datos. La opción más simple y estable es servirla con `nginx`.

## Estructura

- `index.html`: página principal
- `editor.html`: editor auxiliar
- `assets/`: estilos, scripts, documentos e imágenes
- `static/`: contenido estático adicional
- `deploy/nginx/portfolio.conf`: configuración base de `nginx` para el VPS

## Publicación en VPS

Estas instrucciones asumen un VPS con Ubuntu o Debian y un dominio apuntando a la IP del servidor.

### 1. Apunta tu dominio al VPS

En tu proveedor DNS crea estos registros:

- `A` para `@` apuntando a la IP pública de tu VPS
- `A` para `www` apuntando a la misma IP

Si aún no tienes dominio, puedes probar la web con la IP del VPS, pero no tendrás HTTPS válido con Certbot hasta configurar el dominio.

### 2. Instala nginx en el VPS

Conéctate por SSH:

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

### 4. Sube el portfolio desde tu PC

Desde la carpeta local del proyecto:

```bash
scp -r index.html editor.html assets static usuario@IP_DEL_VPS:/var/www/portfolio/
```

Si más adelante cambias algo, repite ese comando para actualizar la web.

### 5. Configura nginx

La plantilla [`deploy/nginx/portfolio.conf`](deploy/nginx/portfolio.conf) está preparada para funcionar sin dominio de pago usando la IP del VPS, porque incluye `server_name _;`.

Si en el futuro compras un dominio, cambia esa línea por algo como:

```nginx
server_name tu-dominio.com www.tu-dominio.com;
```

Puedes copiarla así:

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

Este paso solo aplica si usas un dominio. Cuando el dominio ya resuelva hacia tu VPS:

```bash
sudo certbot --nginx -d TU_DOMINIO.com -d www.TU_DOMINIO.com
```

Comprueba la renovación automática:

```bash
sudo systemctl status certbot.timer
```

## Actualizar la web

Cada vez que cambies el portfolio:

```bash
scp -r index.html editor.html assets static usuario@IP_DEL_VPS:/var/www/portfolio/
```

No hace falta reiniciar `nginx` para cambios de HTML, CSS, JS, documentos o imágenes.

## Limpiar caché local del portfolio

Si el navegador muestra contenido antiguo por `localStorage`, abre DevTools > Console y ejecuta:

```js
localStorage.removeItem('portfolioContentOverride');
location.href = location.pathname + '?v=' + Date.now();
```

## Comprobaciones útiles en el VPS

```bash
sudo nginx -t
sudo systemctl status nginx
ls -la /var/www/portfolio
curl -I http://TU_DOMINIO.com
```

## Despliegue alternativo

La web también puede servirse con Docker, Portainer, Coolify o GitHub Pages porque solo necesita servir archivos estáticos. Para una página personal en VPS, `nginx` directo suele ser la opción más simple.
