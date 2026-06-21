# Portfolio — Sergio Durán Utrera

CV interactivo / portafolio personal de página única (single-page), desplegado en GitHub Pages.

## Stack

- HTML semántico
- SCSS (arquitectura ITCSS + BEM) — única fuente de estilos
- JavaScript vanilla (i18n ES/EN + formulario de contacto)

## Desarrollo local

```bash
pnpm install     # instala sass
pnpm build       # compila scss/main.scss -> css/main.css (preview local)
pnpm dev         # recompila al guardar (watch)
pnpm test        # comprueba que no haya texto sin traducir (i18n)
```

Abre `index.html` con cualquier servidor estático (p. ej. `python -m http.server`).

> El directorio `css/` está en `.gitignore`: **el CSS no se versiona**. La fuente es el SASS;
> el CSS se compila en CI al desplegar.

## Despliegue (GitHub Pages)

El sitio se publica con **GitHub Actions** (`.github/workflows/deploy.yml`): en cada push a `main`
se ejecuta `sass` para compilar el CSS y se sube el sitio. Configuración única:

> **Settings → Pages → Source = "GitHub Actions".**

URL: https://sdurutr436.github.io

`.nojekyll` evita el procesado Jekyll del artefacto.

### Dominio propio (CNAME) — preparado pero inactivo

Hay un `CNAME.example` de plantilla. Para activar un dominio:

1. Renómbralo a `CNAME` con tu dominio real.
2. Descomenta la línea `cp CNAME _site/` en `deploy.yml`.
3. Apunta el DNS a GitHub Pages.

## Formulario de contacto (backend serverless, opcional)

El formulario funciona sin backend: si no hay endpoint configurado, muestra un aviso para
escribir directamente al email. Para activar el envío:

1. Despliega un endpoint serverless gratuito (Cloudflare Workers, Railway, Formspree…) que
   acepte `POST` con JSON `{ name, email, type, message }` y reenvíe el correo.
2. Pon su URL en el atributo `data-endpoint` del `<form class="c-form">` en `index.html`.

El sitio estático carga y funciona aunque el backend no exista.
