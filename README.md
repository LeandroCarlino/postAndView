# Posts & Views

Blog de ejemplo sobre la API pública de [JSONPlaceholder](https://jsonplaceholder.typicode.com): listado con búsqueda y paginación, detalle con comentarios, perfil local y formulario validado.

**Demo:** https://leandrocarlino.github.io/postAndView/

Reescrito en **Angular 22** con standalone components y signals, sin Angular Material ni Bootstrap.

## Qué cambió

| | Antes | Ahora |
|---|---|---|
| Framework | Angular 13 + Material + Bootstrap | **Angular 22**, standalone + signals |
| “Borrar” | solo filtraba el array en memoria; el método del servicio nunca se llamaba | borra de verdad (recordado en `localStorage`) y **con Deshacer** |
| Comentarios | `unshift` + `console.log`, sin resetear el formulario | se guardan por post y sobreviven al recargar |
| Tipos | `getCommentId` declaraba un objeto y la API devuelve un array | `Comentario[]` correcto |
| Email | regex `[a-z]{2,3}$` que rechazaba `.com.ar` | `Validators.email` |
| Errores | loader infinito si la API fallaba | estados de carga, error y vacío |
| Detalle | repetía `post.body` seis veces para rellenar | renderiza los párrafos reales |
| UI | dos sistemas de estilos (Material + Bootstrap) | CSS propio, tema claro/oscuro |
| Tests | spec por defecto | **11 tests** |

## Características

- **Listado** de 100 posts con búsqueda sin acentos, paginación de 10 y contador `1–10 de 100`.
- **Detalle** con los comentarios de la API y un formulario para agregar los propios.
- **Borrado con deshacer**: JSONPlaceholder no persiste `DELETE`, así que la app recuerda los borrados en el navegador para que el post no reaparezca.
- **Perfil** guardado en `localStorage`, sin enviar nada a ningún servidor.
- **Formularios reactivos** con validación y mensajes de error accesibles (`aria-invalid`, `aria-describedby`).
- **Responsive**: la tabla se convierte en tarjetas por debajo de 46 rem.
- **Accesibilidad**: skip link, `aria-current`, `aria-live`, foco visible, tabla con `caption` y `scope`.
- Lighthouse: accesibilidad, buenas prácticas y SEO en 100.

## Estructura

```
src/app/
├── app.ts · app.html · app.css     # shell: cabecera, router-outlet, pie
├── app.config.ts                   # router con input binding + HttpClient
├── app.routes.ts                   # 5 rutas con lazy loading
├── core/
│   ├── post.ts                     # tipos y helper de normalización
│   ├── posts.service.ts            # httpResource + borrados y comentarios locales
│   ├── perfil.service.ts           # perfil en localStorage
│   └── *.spec.ts                   # 8 tests de servicios
└── pages/
    ├── lista/                      # búsqueda, tabla y paginación
    ├── detalle/                    # post + comentarios + formulario
    ├── perfil/                     # datos locales
    ├── info/                       # acerca de
    └── no-encontrado/              # 404
```

## Correr

```bash
npm install
npm start        # http://localhost:4200
npm test         # 11 tests
npm run build
```

## Nota sobre los datos

JSONPlaceholder es una API de prueba: devuelve siempre los mismos 100 posts y **no guarda cambios**. Todo lo que el usuario crea (perfil, comentarios, posts borrados) vive en `localStorage` y es local a ese navegador.
