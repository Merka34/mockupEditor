import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditorComponent } from './components/editor/editor.component';
import { GenerarComponent } from './components/generar/generar.component';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  {
    path: 'editor',
    component: EditorComponent
  },
  {
    path: 'generar',
    component: GenerarComponent
  },
  {
    path: '',
    component: HomeComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
