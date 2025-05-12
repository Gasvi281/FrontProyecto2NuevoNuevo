import { Cuenta } from "./cuenta.model";
import { ProductoLista } from "./productosLista.model";

export interface ListaCompra {
  id?: string;
  cuentaId: string;
  fecha: Date;
  cuenta?: Cuenta; // opcional si necesitas los datos de la cuenta asociados
  elementosLista: ProductoLista[];
}
