import { ListaCompra } from './lista.model';
export interface Cuenta {
  id?: string;
  nombre: string;
  nombreUsuario: string;
  email: string;
  password: string;
  preferencias?: any[];
  impedimentos?: any[];
  lista?: ListaCompra;
  estado?: string;
}