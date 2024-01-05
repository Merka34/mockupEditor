import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    private r: Router
  ) { }

  ngOnInit(): void {
  }

  verEditor(){
    this.r.navigate(['/editor']);
  }

  verGenerar(){
    this.r.navigate(['/generar']);
  }


}
