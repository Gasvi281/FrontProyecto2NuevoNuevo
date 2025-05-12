import { Routes } from '@angular/router';
import { BlankComponent } from './layouts/blank/blank.component';
import { FullComponent } from './layouts/full/full.component';

export const routes: Routes = [
  {
    path: '',
    component: FullComponent,
    children: [
      {
        path: '',
        redirectTo: '/dashboard',
        pathMatch: 'full',
      },
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./pages/pages.routes').then((m) => m.PagesRoutes),
      },
      {
        path: 'ui-components',
        loadChildren: () =>
          import('./pages/ui-components/ui-components.routes').then(
            (m) => m.UiComponentsRoutes
          ),
      },
      {
        path: 'extra',
        loadChildren: () =>
          import('./pages/extra/extra.routes').then((m) => m.ExtraRoutes),
      },
      {
        path: 'productos',
        loadChildren: ()=>
          import('./pages/productos/producto-list/producto-list.routes').then((m) => m.ProductoRoutes)
      },
      {
        path:'perfil',
        loadChildren: ()=>
          import('./pages/perfil/perfil.routes').then((m) => m.PerfilRoutes)
      },
      {
        path:'recetas',
        loadChildren: ()=>
          import('./pages/recetas/recetas.routes').then((m) => m.RecetasRoutes)
      },
      {
        path:'lista',
        loadChildren: ()=>
          import('./pages/lista-compra/lista-compra.routes').then((m) => m.ListaCompraRoutes)
      }
    ],
  },
  {
    path: '',
    component: BlankComponent,
    children: [
      {
        path: 'authentication',
        loadChildren: () =>
          import('./pages/authentication/authentication.routes').then(
            (m) => m.AuthenticationRoutes
          ),
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'authentication/error',
  },
];
