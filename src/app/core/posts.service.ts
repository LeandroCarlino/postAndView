import { httpResource } from '@angular/common/http';
import { Injectable, computed, signal } from '@angular/core';
import { API, Comentario, Post } from './post';

const CLAVE_BORRADOS = 'postview.borrados.v2';
const CLAVE_COMENTARIOS = 'postview.comentarios.v2';

function leer<T>(clave: string, porDefecto: T): T {
  try {
    const crudo = localStorage.getItem(clave);
    return crudo ? (JSON.parse(crudo) as T) : porDefecto;
  } catch {
    return porDefecto;
  }
}

function guardar(clave: string, valor: unknown): void {
  try {
    localStorage.setItem(clave, JSON.stringify(valor));
  } catch {
    /* sin almacenamiento: seguimos en memoria */
  }
}

@Injectable({ providedIn: 'root' })
export class PostsService {
  private readonly recurso = httpResource<Post[]>(() => `${API}/posts`);

  /**
   * JSONPlaceholder no persiste los DELETE, así que los borrados se
   * recuerdan en localStorage: el post no reaparece al recargar.
   */
  private readonly _borrados = signal<number[]>(
    leer<number[]>(CLAVE_BORRADOS, []),
  );
  private readonly _comentarios = signal<Record<number, Comentario[]>>(
    leer<Record<number, Comentario[]>>(CLAVE_COMENTARIOS, {}),
  );

  readonly cargando = this.recurso.isLoading;
  readonly error = this.recurso.error;
  readonly todos = computed(() => this.recurso.value() ?? []);
  readonly visibles = computed(() =>
    this.todos().filter((post) => !this._borrados().includes(post.id)),
  );

  eliminar(id: number): void {
    if (this._borrados().includes(id)) return;
    this._borrados.update((ids) => [...ids, id]);
    guardar(CLAVE_BORRADOS, this._borrados());
  }

  restaurar(id: number): void {
    this._borrados.update((ids) => ids.filter((x) => x !== id));
    guardar(CLAVE_BORRADOS, this._borrados());
  }

  comentariosDe(postId: number): Comentario[] {
    return this._comentarios()[postId] ?? [];
  }

  agregarComentario(postId: number, comentario: Comentario): void {
    const actuales = this._comentarios()[postId] ?? [];
    const nuevo = { ...comentario, id: Date.now(), postId };
    this._comentarios.update((mapa) => ({
      ...mapa,
      [postId]: [nuevo, ...actuales],
    }));
    guardar(CLAVE_COMENTARIOS, this._comentarios());
  }
}
