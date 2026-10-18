# TravelFans

Sitio de la agencia de viajes TravelFans: portada con destinos, paquetes y opiniones, cotización por WhatsApp y un panel de administración para editar el contenido.

Hecho con React 18, Vite, Tailwind CSS 4, react-router e i18next (español, inglés y portugués). El diseño original viene de Figma Make: https://www.figma.com/design/PrT5Zj0nbr7fln85A744GZ/Dise%C3%B1ar-vistas-agencia-de-viajes

## Cómo correrlo

```bash
npm install
npm run dev        # servidor de desarrollo en http://localhost:5173
npm run typecheck  # revisa los tipos de TypeScript
npm run build      # typecheck + build de producción en dist/
```

## Configuración (.env)

Copia `.env.example` como `.env` y completa los valores:

| Variable | Para qué sirve |
| --- | --- |
| `VITE_ADMIN_USER` | Usuario del panel (por defecto `admin`). |
| `VITE_ADMIN_PASSWORD_HASH` | Hash de la contraseña del panel. Se genera con `npm run hash-password -- "tu-contraseña"`. Si falta, se usa la contraseña de ejemplo `travelfans2024` y el panel muestra un aviso. |
| `VITE_GA_ID` | ID de Google Analytics 4. Si falta, no se carga Analytics ni el aviso de cookies. |

## Estructura

```
src/
  app/
    pages/        Home, Login, Admin (Login y Admin se cargan aparte)
    components/   Secciones de la portada, carrusel, selector de idioma, aviso de cookies…
    context/      AuthContext (sesión) y ContentContext (contenido del sitio)
    content/      Contenido por defecto, validación, compresión de imágenes, enlaces de WhatsApp
  services/
    authService.ts      Login del panel
    contentService.ts   Lectura/escritura del contenido
    AnalyticsService.ts Google Analytics con consentimiento
    i18nConfig.ts       Textos en es/en/pt
```

## Limitaciones conocidas (falta un backend)

El sitio todavía no tiene servidor, así que:

- **El contenido editado en el panel se guarda solo en el navegador de quien lo edita.** Los visitantes ven el contenido por defecto de `src/app/content/defaultContent.ts`. Para publicar cambios, reemplaza `localRepository` en `src/services/contentService.ts` por uno que llame a un backend (Supabase, Spring Boot, etc.); el resto de la app no necesita cambios.
- **El login no es seguridad real.** La contraseña se guarda como hash PBKDF2 (no se puede leer del código), la sesión expira a las 8 horas y se bloquean 60 segundos tras 5 intentos fallidos, pero todo corre en el navegador. Reemplaza `authService.ts` por un proveedor con servidor antes de manejar datos sensibles.
- Los textos que edita el administrador (destinos, paquetes, opiniones) se muestran tal como se escribieron, sin traducir. Los textos del hero se traducen mientras no se modifiquen.
- Para la vista previa al compartir el enlace, agrega `og:url` y `og:image` (URLs absolutas) en `index.html` cuando el sitio tenga dominio.
