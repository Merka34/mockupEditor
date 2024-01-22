import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Route } from './dashboard.routing';
import { DashboardComponent } from './dashboard.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(Route),
    ],
    declarations: [
        DashboardComponent
    ],
    providers: []
})

export class DashboardModule {
}
