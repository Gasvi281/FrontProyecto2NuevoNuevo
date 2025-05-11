import { Routes } from "@angular/router";
import { authRemyGuard } from "src/app/guards/auth-remy.guard";
import { ListaRecetasComponent } from "./listaRecetas/lista-recetas/lista-recetas.component";
import { ObjetoRecetaComponent } from "./objetoReceta/objeto-receta/objeto-receta.component";


export const RecetasRoutes: Routes =[{
    path:'',
    children: [
        {
            path:'',
            component: ListaRecetasComponent,
        },
        {
            path:'receta/:nombre',
            component: ObjetoRecetaComponent,
        }
    ], canActivate: [authRemyGuard]
}]