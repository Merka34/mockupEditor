import { Component, OnDestroy, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
    selector: 'app-not-found',
    templateUrl: './not-found.component.html'
})
export class NotFoundComponent implements OnInit, OnDestroy {

    constructor(
        private location: Location
    ) {
    }

    ngOnInit() {
        const body = document.getElementsByTagName('body')[0];
        body.classList.add('2-columns');
    }

    ngOnDestroy() {
        const body = document.getElementsByTagName('body')[0];
        body.classList.remove('2-columns');
    }

    back() {
        this.location.back();
    }

}
