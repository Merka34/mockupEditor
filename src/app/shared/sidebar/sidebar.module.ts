import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SidebarComponent } from './sidebar.component';

const components = [
    SidebarComponent
];

@NgModule({
    declarations: [
        components
    ],
    exports: [
        components
    ],
    imports: [
        RouterModule,
        CommonModule
    ]
})
export class SidebarModule {
}
