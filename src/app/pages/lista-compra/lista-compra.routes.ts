import { Routes } from "@angular/router";
import { authRemyGuard } from "src/app/guards/auth-remy.guard";
import { ListaCompraComponent } from "./lista-compra.component";


export const ListaCompraRoutes: Routes =[{
    path:'',
    children: [
        {
            path:'',
            component: ListaCompraComponent,
        },
    ], canActivate: [authRemyGuard]
}]