import { Routes } from '@angular/router';
import { authRemyGuard } from 'src/app/guards/auth-remy.guard';
import { PerfilComponent } from './perfil.component';
import { EditarPerfilComponent } from './editar-perfil/editar-perfil.component';

export const PerfilRoutes: Routes = [
    {
        path: '',
        canActivate: [authRemyGuard],
        children: [
            {
                path: '',
                component: PerfilComponent,
            },
            {
                path: 'editar/:id',
                component: EditarPerfilComponent,
            }
        ]
    }
];
