import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';

export const Route: Routes = [
    {
        path: '',
        children: [
            {
                path: 'dashboard',
                component: DashboardComponent
            }
        ]
    }
];
