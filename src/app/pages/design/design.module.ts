import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Route } from './design.routing';
import { DesignComponent } from './design.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(Route),
    ],
    declarations: [
        DesignComponent
    ],
    providers: []
})

export class DesignModule {
}
