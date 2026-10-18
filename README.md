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
| `VITE_SUPABASE_URL` | URL del proyecto de Supabase (backend). |
| `VITE_SUPABASE_PUBLISHABLE_KEY` | Clave pública (`sb_publishable_...`) del proyecto. Nunca uses la clave secreta/service_role. |
| `VITE_GA_ID` | ID de Google Analytics 4. Si falta, no se carga Analytics ni el aviso de cookies. |
| `VITE_ADMIN_USER`, `VITE_ADMIN_PASSWORD_HASH` | Solo para el **modo local** (sin Supabase). El hash se genera con `npm run hash-password -- "tu-contraseña"`. |

Si las variables de Supabase faltan, el sitio funciona igual en **modo local**: el contenido se guarda en el navegador y el login usa la contraseña local. Sirve para desarrollar sin conexión, pero no publica cambios.

Al publicar el sitio (Vercel, Netlify, etc.) configura las mismas variables en el panel del hosting.

## Backend (Supabase)

Proyecto `travelfans` (región São Paulo). El esquema está versionado en `supabase/migrations/`:

- **`public.site_content`**: una sola fila con todo el contenido del sitio en JSON. Lectura pública; solo administradores pueden escribir (RLS).
- **`private.admins`**: correos autorizados como administradores (esquema no expuesto por la API).
- **Bucket `site-images`**: imágenes que se suben desde el panel. Lectura pública por URL; solo administradores suben o borran (máx. 2 MB, WebP/JPEG/PNG).

### Crear la cuenta de administrador

1. En el dashboard de Supabase: **Authentication > Users > Add user > Create new user**, con el correo autorizado (`angelwtf36@gmail.com`) y una contraseña segura. Marca "Auto Confirm User".
2. Recomendado: **Authentication > Sign In / Providers > Email** y desactiva "Allow new users to sign up", para que nadie más pueda registrarse.
3. Inicia sesión en `/login` con ese correo.

### Agregar otro administrador

Crea su usuario como en el paso 1 y agrega su correo en el SQL Editor:

```sql
insert into private.admins (email) values ('correo@ejemplo.com');
```

## Estructura

```
src/
  app/
    pages/        Home, Login, Admin (Login y Admin se cargan aparte)
    components/   Secciones de la portada, carrusel, selector de idioma, aviso de cookies…
    context/      AuthContext (sesión) y ContentContext (contenido del sitio)
    content/      Contenido por defecto, validación, compresión de imágenes, enlaces de WhatsApp
  services/
    supabaseClient.ts   Cliente de Supabase (null si no hay .env)
    authService.ts      Login del panel (Supabase Auth o modo local)
    localAuth.ts        Login de respaldo sin backend
    contentService.ts   Lectura/escritura del contenido (Supabase o localStorage)
    AnalyticsService.ts Google Analytics con consentimiento
    i18nConfig.ts       Textos en es/en/pt
```

## Limitaciones conocidas

- Los textos que edita el administrador (destinos, paquetes, opiniones) se muestran tal como se escribieron, sin traducir. Los textos del hero se traducen mientras no se modifiquen.
- Las imágenes reemplazadas o borradas en el panel quedan en el bucket `site-images`; se pueden limpiar a mano desde **Storage** en el dashboard.
- En el plan gratis, Supabase pausa el proyecto tras una semana sin actividad. Mientras está pausado el sitio muestra el contenido por defecto; se reactiva desde el dashboard.
- Para la vista previa al compartir el enlace, agrega `og:url` y `og:image` (URLs absolutas) en `index.html` cuando el sitio tenga dominio.
