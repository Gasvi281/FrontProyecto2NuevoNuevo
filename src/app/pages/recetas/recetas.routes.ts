import { Routes } from "@angular/router";
import { authRemyGuard } from "src/app/guards/auth-remy.guard";
import { ListaRecetasComponent } from "./listaRecetas/lista-recetas/lista-recetas.component";
import { ObjetoRecetaComponent } from "./objetoReceta/objeto-receta/objeto-receta.component";
import { RecetaFormComponent } from "./receta-form/receta-form.component";
import { AddRecetaComponent } from "./add-receta/add-receta.component";


export const RecetasRoutes: Routes =[{
    path:'',
    children: [
        {
            path:'',
            component: ListaRecetasComponent,
        },
        {
            path:'receta/objeto/:id',
            component: ObjetoRecetaComponent,
        },
        {
            path:'receta/editar/:id',
            component: RecetaFormComponent,
        },
        {
            path:'receta/add',
            component: AddRecetaComponent,
        }
    ], canActivate: [authRemyGuard]
}]