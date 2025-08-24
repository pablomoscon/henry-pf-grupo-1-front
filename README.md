![logo MariArt](./public/logoReadme.png)

> ### Descripción del Proyecto

<p>El objetivo de esta App es modernizar y optimizar el acceso a servicios exclusivos de alojamiento de lujo para gatos. Permitiendo a los usuarios:</p>

- Acceder a información detallada del alojamiento, como fotografías y descripciones de los servicios.
- Recibir notificaciones y recordatorios sobre reservas y fechas clave como el check-in y check-out.
- Una experiencia exclusiva e intuitiva para gestionar reservas en tiempo real.
- Mantener una comunicación directa con cuidadores mediante un sistema de chat en tiempo real.
- Acceso a una bitácora con fotos, videos y posteos sobre la estadía del huésped gatuno, actualizados por su cuidador.

##### GitHub Pages Front: <https://github.com/courreges-do/henry-pf-grupo-1-front>

##### GitHub Pages Back: <https://github.com/courreges-do/henry-pf-grupo-1-front>

##### Documentación Front: [Enlace a la documentación en PDF](./public/manual_usuario.pdf)

> ### Herramientas utilizadas

- Next.js (React, TailwindCSS, API Routes ).
- Fetch y Axios (para peticiones HTTP).
- Toastify (alertas, notificaciones).
- GitHub.
- OAuth 2.0 y JWT.
- Vercel.

> ### Pasos para ejecutar el proyecto localmente

1. Clonar Repositorio: git clone <https://github.com/courreges-do/henry-pf-grupo-1-front>
2. Dentro de la carpeta del proyecto ejecutar: npm install
3. Posteriormente ejecutar: npm run dev

### Configuración de Variables de Entorno

Para ejecutar este proyecto, es necesario crear un archivo .env en el directorio raíz con el nombre .env.local y agregar lo siguiente:

NEXT_PUBLIC_API_URL=https://api.example.com
