import { Producto } from "./producto.model";

export interface ProductoLista{
    id?: string;
    cantidad: string;
    Producto: Producto;
    estado?: string;
}