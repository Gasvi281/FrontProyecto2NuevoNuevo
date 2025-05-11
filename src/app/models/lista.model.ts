import { Cuenta } from "./cuenta.model";

export interface ListaCompra {
  id?: string;
  cuentaId: string;
  fecha: Date;
  cuenta?: Cuenta; // opcional si necesitas los datos de la cuenta asociados
}
