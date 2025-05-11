import { Routes } from "@angular/router";
import { authRemyGuard } from "src/app/guards/auth-remy.guard";
import { PerfilComponent } from "./perfil.component";


export const PerfilRoutes: Routes =[{
    path:'',
    children: [
        {
            path:'',
            component: PerfilComponent,
        },
    ], canActivate: [authRemyGuard]
}]