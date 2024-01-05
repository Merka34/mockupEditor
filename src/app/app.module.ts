import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EditorComponent } from './components/editor/editor.component';
import { GenerarComponent } from './components/generar/generar.component';
import { HomeComponent } from './components/home/home.component';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [
    AppComponent,
    EditorComponent,
    GenerarComponent,
    HomeComponent
  ],
  imports: [
    MatButtonModule,
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
