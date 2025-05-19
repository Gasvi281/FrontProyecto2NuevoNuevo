import { Routes } from "@angular/router";
import { authRemyGuard } from "src/app/guards/auth-remy.guard";
import { ProductoListComponent } from "./producto-list.component";
import { ObjetoproductoComponent } from "../../ObjetoProducto/objetoproducto/objetoproducto.component";
import { CrearProductoComponent } from "../../productoForms/crear-producto/crear-producto.component";
import { EditarProductoComponent } from "../../productoForms/editar-producto/editar-producto.component";


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
        },
        {
            path: 'crear',
            component: CrearProductoComponent
        },
        {
            path: 'editar/:id',
            component: EditarProductoComponent
        }
    ], canActivate: [authRemyGuard]
}]