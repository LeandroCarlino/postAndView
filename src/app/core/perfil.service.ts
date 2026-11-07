import { Injectable, computed, signal } from '@angular/core';
import { Perfil } from './post';

const CLAVE = 'postview.perfil.v2';

function leer(): Perfil {
  try {
    const crudo = localStorage.getItem(CLAVE);
    return crudo ? (JSON.parse(crudo) as Perfil) : { nombre: '', mail: '' };
  } catch {
    return { nombre: '', mail: '' };
  }
}

@Injectable({ providedIn: 'root' })
export class PerfilService {
  private readonly _perfil = signal<Perfil>(leer());

  readonly perfil = this._perfil.asReadonly();
  readonly completo = computed(() => {
    const perfil = this._perfil();
    return Boolean(perfil.nombre.trim() && perfil.mail.trim());
  });

  guardar(perfil: Perfil): void {
    this._perfil.set(perfil);
    try {
      localStorage.setItem(CLAVE, JSON.stringify(perfil));
    } catch {
      /* sin almacenamiento: queda en memoria */
    }
  }
}
