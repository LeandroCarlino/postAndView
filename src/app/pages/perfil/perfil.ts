import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { PerfilService } from '../../core/perfil.service';

type Campo = 'nombre' | 'mail';

@Component({
  selector: 'app-perfil',
  imports: [ReactiveFormsModule],
  templateUrl: './perfil.html',
  styleUrl: './perfil.css',
})
export class PerfilPagina {
  protected readonly servicio = inject(PerfilService);
  private readonly fb = inject(FormBuilder);

  protected readonly guardado = signal(false);

  protected readonly form = this.fb.nonNullable.group({
    nombre: [
      this.servicio.perfil().nombre,
      [Validators.required, Validators.minLength(3), Validators.maxLength(40)],
    ],
    mail: [
      this.servicio.perfil().mail,
      [Validators.required, Validators.email],
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

    this.servicio.guardar(this.form.getRawValue());
    this.guardado.set(true);
  }
}
