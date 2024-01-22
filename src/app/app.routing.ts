import { Routes } from '@angular/router';
import { MainLayoutComponent } from './layouts/main/main-layout.component';
import { NotFoundComponent } from './layouts/error/not-found/not-found.component';
import { ErrorComponent } from './layouts/error/error/error.component';
import { MaintenanceComponent } from './layouts/error/maintenance/maintenance.component';

export const Route: Routes = [
    {
        path: '',
        redirectTo: '/',
        pathMatch: 'full',
    },
    {
        path: '',
        component: MainLayoutComponent,
        children: [
            {
                path: '',
                loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule)
            }
        ]
    },
    {
        path: '',
        children: [
            {
                path: '404',
                component: NotFoundComponent
            },
            {
                path: '500',
                component: ErrorComponent
            },
            {
                path: 'in-maintenance',
                component: MaintenanceComponent
            }
        ]
    },
    {
        path: '**',
        redirectTo: '/in-maintenance'
    }
];
