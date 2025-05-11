import { Routes } from "@angular/router";
import { authRemyGuard } from "src/app/guards/auth-remy.guard";
import { ProductoListComponent } from "./producto-list.component";
import { ObjetoproductoComponent } from "../../ObjetoProducto/objetoproducto/objetoproducto.component";


export const ProductoRoutes: Routes =[{
    path:'',
    children: [
        {
            path:'',
            component: ProductoListComponent,
        },
        {
            path:'producto/:id',
            component: ObjetoproductoComponent
        }
    ], canActivate: [authRemyGuard]
}]