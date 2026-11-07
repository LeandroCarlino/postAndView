export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export interface Comentario {
  postId?: number;
  id?: number;
  name: string;
  email: string;
  body: string;
}

export interface Perfil {
  nombre: string;
  mail: string;
}

export const API = 'https://jsonplaceholder.typicode.com';
export const POR_PAGINA = 10;

/** Minúsculas y sin acentos, para buscar sin pelear con tildes. */
export function normalizar(texto: string): string {
  return texto
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim();
}
