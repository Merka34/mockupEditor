import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { Route } from './app.routing';

import { MaterialModule } from './material.module';
import { NavbarModule } from './shared/navbar/navbar.module';
import { SidebarModule } from './shared/sidebar/sidebar.module';

import { AppComponent } from './app.component';
import { MainLayoutComponent } from './layouts/main/main-layout.component';
import { NotFoundComponent } from './layouts/error/not-found/not-found.component';
import { ErrorComponent } from './layouts/error/error/error.component';
import { MaintenanceComponent } from './layouts/error/maintenance/maintenance.component';

@NgModule({
    imports: [
        CommonModule,
        BrowserAnimationsModule,
        // FormsModule,
        // ReactiveFormsModule,
        RouterModule.forRoot(Route, {useHash: true}),
        MaterialModule,
        // MatNativeDateModule,
        NavbarModule,
        SidebarModule,
        // FooterModule,
        // SearchModule,
        // CustomerModule
    ],
    declarations: [
        AppComponent,
        MainLayoutComponent,
        NotFoundComponent,
        ErrorComponent,
        MaintenanceComponent
    ],
    providers: [
        // MatNativeDateModule
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
