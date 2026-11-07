import { httpResource } from '@angular/common/http';
import { Component, computed, inject, input, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { API, Comentario, Post } from '../../core/post';
import { PostsService } from '../../core/posts.service';

type Campo = 'nombre' | 'email' | 'cuerpo';

@Component({
  selector: 'app-detalle',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './detalle.html',
  styleUrl: './detalle.css',
})
export class Detalle {
  /** Viene del parámetro `:id` de la ruta. */
  readonly id = input.required<string>();

  protected readonly posts = inject(PostsService);
  private readonly fb = inject(FormBuilder);

  protected readonly postId = computed(() => Number(this.id()));
  private readonly valido = computed(
    () => Number.isInteger(this.postId()) && this.postId() > 0,
  );

  protected readonly post = httpResource<Post>(() =>
    this.valido() ? `${API}/posts/${this.postId()}` : undefined,
  );

  protected readonly remotos = httpResource<Comentario[]>(() =>
    this.valido() ? `${API}/posts/${this.postId()}/comments` : undefined,
  );

  protected readonly locales = computed(() =>
    this.posts.comentariosDe(this.postId()),
  );

  protected readonly comentarios = computed<Comentario[]>(() => [
    ...this.locales(),
    ...(this.remotos.value() ?? []),
  ]);

  protected readonly enviado = signal(false);

  protected readonly form = this.fb.nonNullable.group({
    nombre: [
      '',
      [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(20),
      ],
    ],
    email: ['', [Validators.required, Validators.email]],
    cuerpo: [
      '',
      [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(500),
      ],
    ],
  });

  protected invalido(campo: Campo): boolean {
    const control = this.form.controls[campo];
    return control.invalid && control.touched;
  }

  protected guardar(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const { nombre, email, cuerpo } = this.form.getRawValue();
    this.posts.agregarComentario(this.postId(), {
      name: nombre,
      email,
      body: cuerpo,
    });

    this.form.reset();
    this.enviado.set(true);
  }
}
