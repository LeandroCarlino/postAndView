import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { PostsService } from './posts.service';

/**
 * Se prueba el estado local del servicio (borrados y comentarios), que es la
 * lógica propia. La carga HTTP se valida en el navegador: `httpResource` es
 * perezoso y no dispara la petición sin un contexto reactivo.
 */
describe('PostsService', () => {
  let servicio: PostsService;

  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    servicio = TestBed.inject(PostsService);
  });

  it('arranca sin comentarios', () => {
    expect(servicio.comentariosDe(1)).toEqual([]);
  });

  it('elimina un post y lo guarda en localStorage', () => {
    servicio.eliminar(2);

    const crudo = localStorage.getItem('postview.borrados.v2');
    expect(crudo).toBe('[2]');
  });

  it('restaura el post eliminado', () => {
    servicio.eliminar(2);
    servicio.restaurar(2);

    expect(localStorage.getItem('postview.borrados.v2')).toBe('[]');
  });

  it('no duplica borrados', () => {
    servicio.eliminar(2);
    servicio.eliminar(2);

    expect(localStorage.getItem('postview.borrados.v2')).toBe('[2]');
  });

  it('guarda comentarios por post, con los nuevos primero', () => {
    servicio.agregarComentario(1, { name: 'Uno', email: 'a@b.com', body: 'x' });
    servicio.agregarComentario(1, { name: 'Dos', email: 'a@b.com', body: 'y' });

    expect(servicio.comentariosDe(1).map((c) => c.name)).toEqual(['Dos', 'Uno']);
    expect(servicio.comentariosDe(2)).toEqual([]);
  });

  it('persiste los comentarios para una nueva instancia', () => {
    servicio.agregarComentario(5, { name: 'Ana', email: 'ana@ejemplo.com', body: 'hola' });

    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    const otra = TestBed.inject(PostsService);

    expect(otra.comentariosDe(5)[0].name).toBe('Ana');
  });
});
