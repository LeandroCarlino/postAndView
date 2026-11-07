import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-no-encontrado',
  imports: [RouterLink],
  template: `
    <p class="kicker">Error 404</p>
    <h1>Esta página no existe</h1>
    <p class="texto">
      Puede que el enlace esté mal escrito o que el contenido ya no esté disponible.
    </p>
    <a class="boton" routerLink="/">Volver a los posts</a>
  `,
  styles: `
    :host { display: block; max-width: 40rem; padding-block: 2rem; }
    .kicker { margin: 0 0 0.5rem; font-family: var(--mono); font-size: 0.7rem; font-weight: 600; letter-spacing: 0.14em; text-transform: uppercase; color: var(--acento); }
    h1 { margin-bottom: 0.75rem; font-size: clamp(1.8rem, 4.5vw, 2.6rem); font-weight: 800; }
    .texto { margin-bottom: 1.5rem; color: var(--mudo); }
  `,
})
export class NoEncontrado {}
