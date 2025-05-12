import { ListaCompra } from './lista.model';
export interface Cuenta {
  id?: string;
  nombre: string;
  nombreUsuario: string;
  email: string;
  password: string;
  preferencias?: any[];  // ✅ igual que en backend
  impedimentos?: any[];  // ✅ igual que en backend
  lista?: ListaCompra;
  estado?: string;
}