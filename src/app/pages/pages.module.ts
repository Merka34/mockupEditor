import { NgModule } from '@angular/core';
import { DesignModule } from './design/design.module';
import { DashboardModule } from './dashboard/dashboard.module';

@NgModule({
    imports: [
        DashboardModule,
        DesignModule,
    ]
})

export class PagesModule {
}
