import { Routes } from "@angular/router";
import { authRemyGuard } from "src/app/guards/auth-remy.guard";
import { ListaComponent } from "./lista.component";


export const ListaRoutes: Routes =[{
    path:'',
    children: [
        {
            path:'',
            component: ListaComponent,
        },
    ], canActivate: [authRemyGuard]
}]