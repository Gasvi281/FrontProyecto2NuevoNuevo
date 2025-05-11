import { Producto } from "./producto.model";

export interface IngredientesReceta{
    id?: string;
    cantidad: string;
    producto: Producto;
}