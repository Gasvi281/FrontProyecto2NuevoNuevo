import { Routes } from "@angular/router";
import { authRemyGuard } from "src/app/guards/auth-remy.guard";
import { ListaCompraComponent } from "./lista.component";


export const ListaRoutes: Routes =[{
    path:'',
    children: [
        {
            path:'',
            component: ListaCompraComponent,
        },
    ], canActivate: [authRemyGuard]
}]