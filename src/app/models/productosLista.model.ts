import { Producto } from "./producto.model";

export interface ProductoLista{
    id?: string;
    cantidad: string;
    producto: Producto;
    estado?: string;
}