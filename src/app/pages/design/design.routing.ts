import { Routes } from '@angular/router';
import { DesignComponent } from './design.component';

export const Route: Routes = [
    {
        path: '',
        children: [
            {
                path: 'design',
                component: DesignComponent
            }
        ]
    }
];
