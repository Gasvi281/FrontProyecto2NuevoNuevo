import { ListaCompra } from './lista.model';
import { Comentario } from './comentario.model';
export interface Cuenta {
  id?: string;
  nombre: string;
  nombreUsuario: string;
  email: string;
  password: string;
  preferencias?: any[];
  impedimentos?: any[];
  comentarios?: Comentario[];
  lista?: ListaCompra;
  estado?: string;
}