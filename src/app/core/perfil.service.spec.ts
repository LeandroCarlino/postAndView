import { TestBed } from '@angular/core/testing';
import { PerfilService } from './perfil.service';

describe('PerfilService', () => {
  let servicio: PerfilService;

  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({});
    servicio = TestBed.inject(PerfilService);
  });

  it('arranca vacío', () => {
    expect(servicio.perfil()).toEqual({ nombre: '', mail: '' });
    expect(servicio.completo()).toBe(false);
  });

  it('guarda y marca el perfil como completo', () => {
    servicio.guardar({ nombre: 'Leandro', mail: 'leandro@ejemplo.com' });

    expect(servicio.perfil().nombre).toBe('Leandro');
    expect(servicio.completo()).toBe(true);
  });

  it('persiste en localStorage', () => {
    servicio.guardar({ nombre: 'Ana', mail: 'ana@ejemplo.com' });

    const crudo = localStorage.getItem('postview.perfil.v2');
    expect(crudo).toContain('Ana');
  });
});
