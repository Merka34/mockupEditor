import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarModule } from '../../shared/navbar/navbar.module';
import { CommonModule } from '@angular/common';
import { SidebarModule } from '../../shared/sidebar/sidebar.module';
import { Items } from '../../interfaces';

@Component({
    selector: 'app-layout',
    templateUrl: './main-layout.component.html',
    styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent implements OnInit, OnDestroy {

    menu: Items[] = [
        {
            IsMain: true,
            MenuRoutes: [
                {
                    Icon: 'dashboard',
                    TitleRoute: 'Dashboard',
                    Route: 'dashboard'
                }
            ]
        },
        {
            IsMain: false,
            Icon: 'list',
            SectionTitle: 'Páginas',
            MenuRoutes: [
                {
                    IsMain: false,
                    Icon: 'warning',
                    SectionTitle: 'Errores',
                    MenuRoutes: [
                        {
                            IsMain: true,
                            MenuRoutes: [
                                {
                                    Icon: 'content_paste_off',
                                    TitleRoute: 'Error 404',
                                    Route: '404'
                                },
                                {
                                    Icon: 'report',
                                    TitleRoute: 'Error 500',
                                    Route: '500'
                                },
                                {
                                    Icon: 'square_foot',
                                    TitleRoute: 'En mantenimiento',
                                    Route: 'in-maintenance'
                                }
                            ]
                        }
                    ]
                },
                {
                    IsMain: false,
                    Icon: 'all_inbox',
                    SectionTitle: 'Programadas',
                    MenuRoutes: [
                        {
                            IsMain: true,
                            MenuRoutes: [
                                {
                                    Icon: 'draw',
                                    TitleRoute: 'Diseñar',
                                    Route: 'design'
                                },
                                {
                                    Icon: 'print',
                                    TitleRoute: 'Imprimir',
                                    Route: 'print'
                                },
                            ]
                        }
                    ]
                }
            ]
        }
    ]

    constructor() {
    }

    ngOnInit() {
        const body = document.getElementsByTagName('body')[0];
        body.classList.add('2-columns');
    }

    ngOnDestroy() {
        const body = document.getElementsByTagName('body')[0];
        body.classList.remove('2-columns');
    }

}
