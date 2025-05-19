import { Routes } from "@angular/router";
import { authRemyGuard } from "src/app/guards/auth-remy.guard";
import { ComentarioComponent } from "./comentario/comentario.component";
import { CrearComentarioComponent } from "./crear-comentario/crear-comentario.component";
import { EditarComentarioComponent } from "./editar-comentario/editar-comentario.component";

export const ComentarioRoutes: Routes =[{
    path:'',
    children: [
        {
            path:'',
            component: ComentarioComponent,
        },
        {
            path: 'crear',
            component: CrearComentarioComponent
        },
        {
            path: 'editar/:id',
            component: EditarComentarioComponent
        }
    ], canActivate: [authRemyGuard]
}]