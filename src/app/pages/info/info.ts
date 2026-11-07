import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-info',
  imports: [RouterLink],
  template: `
    <header class="pagina__head">
      <p class="kicker">Acerca de</p>
      <h1>Información</h1>
      <p class="lede">
        Un blog mínimo para practicar listados, detalle, formularios y estado local
        en Angular moderno.
      </p>
    </header>

    <section class="bloque">
      <h2>De dónde salen los datos</h2>
      <p>
        Los posts y los comentarios vienen de
        <a href="https://jsonplaceholder.typicode.com" target="_blank" rel="noopener">JSONPlaceholder</a>,
        una API pública de prueba. No tiene claves ni límites agresivos, y es ideal
        para demos.
      </p>
      <p>
        Esa API <strong>no guarda cambios</strong>: si borrás un post o agregás un
        comentario, el servidor no lo recuerda. Por eso la app persiste esas acciones
        en <code>localStorage</code>, así el resultado se mantiene al recargar.
      </p>
    </section>

    <section class="bloque">
      <h2>Cómo está hecho</h2>
      <ul>
        <li>Angular 22 con componentes standalone y signals.</li>
        <li><code>httpResource</code> para el listado, el detalle y los comentarios.</li>
        <li>Formularios reactivos con validación (el correo acepta <code>.com.ar</code>).</li>
        <li>Estado local persistido para perfil, borrados y comentarios propios.</li>
        <li>Sin frameworks de UI: CSS propio, tema claro/oscuro y tabla que se vuelve tarjetas en móvil.</li>
      </ul>
    </section>

    <p><a class="boton" routerLink="/">Ir a los posts</a></p>
  `,
  styles: `
    :host { display: block; max-width: 46rem; }
    .pagina__head { margin-bottom: 1.75rem; }
    .pagina__head h1 { margin-bottom: 0.5rem; font-size: clamp(2rem, 5vw, 2.8rem); font-weight: 800; }
    .lede { color: var(--mudo); }
    .kicker { margin: 0 0 0.5rem; font-family: var(--mono); font-size: 0.7rem; font-weight: 600; letter-spacing: 0.14em; text-transform: uppercase; color: var(--acento); }
    .bloque { margin-bottom: 2rem; }
    .bloque h2 { margin-bottom: 0.65rem; font-size: 1.15rem; font-weight: 800; }
    .bloque p { margin: 0 0 0.8rem; color: var(--tinta-suave); }
    .bloque ul { margin: 0; padding-left: 1.2rem; display: grid; gap: 0.45rem; color: var(--tinta-suave); }
    code { font-family: var(--mono); font-size: 0.86em; padding: 0.1em 0.35em; border-radius: 5px; background: var(--superficie-2); }
  `,
})
export class Info {}
