import { Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { POR_PAGINA, Post, normalizar } from '../../core/post';
import { PostsService } from '../../core/posts.service';

@Component({
  selector: 'app-lista',
  imports: [RouterLink],
  templateUrl: './lista.html',
  styleUrl: './lista.css',
})
export class Lista {
  protected readonly posts = inject(PostsService);

  protected readonly busqueda = signal('');
  protected readonly pagina = signal(1);
  protected readonly ultimoBorrado = signal<Post | null>(null);

  protected readonly filtrados = computed(() => {
    const consulta = normalizar(this.busqueda());
    const lista = this.posts.visibles();
    if (!consulta) return lista;

    return lista.filter(
      (post) =>
        normalizar(post.title).includes(consulta) ||
        normalizar(post.body).includes(consulta),
    );
  });

  protected readonly totalPaginas = computed(() =>
    Math.max(1, Math.ceil(this.filtrados().length / POR_PAGINA)),
  );

  protected readonly paginaActual = computed(() => {
    const inicio = (this.pagina() - 1) * POR_PAGINA;
    return this.filtrados().slice(inicio, inicio + POR_PAGINA);
  });

  protected readonly rango = computed(() => {
    const total = this.filtrados().length;
    if (!total) return '0 de 0';
    const desde = (this.pagina() - 1) * POR_PAGINA + 1;
    const hasta = Math.min(this.pagina() * POR_PAGINA, total);
    return `${desde}–${hasta} de ${total}`;
  });

  protected buscar(evento: Event): void {
    this.busqueda.set((evento.target as HTMLInputElement).value);
    this.pagina.set(1);
  }

  protected limpiar(): void {
    this.busqueda.set('');
    this.pagina.set(1);
  }

  protected ir(pagina: number): void {
    if (pagina < 1 || pagina > this.totalPaginas()) return;
    this.pagina.set(pagina);
  }

  protected eliminar(post: Post): void {
    this.posts.eliminar(post.id);
    this.ultimoBorrado.set(post);
  }

  protected deshacer(): void {
    const post = this.ultimoBorrado();
    if (!post) return;
    this.posts.restaurar(post.id);
    this.ultimoBorrado.set(null);
  }

  protected recortar(texto: string, largo: number): string {
    return texto.length > largo ? `${texto.slice(0, largo).trimEnd()}…` : texto;
  }
}
