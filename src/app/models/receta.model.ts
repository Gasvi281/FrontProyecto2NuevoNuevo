import { IngredientesReceta } from "./ingredientesReceta.model";

export interface Recetas{
    id?: string;
    nombre: string;
    dificultad: number;
    Categoria: string;
    ingredientes?: IngredientesReceta[];
}