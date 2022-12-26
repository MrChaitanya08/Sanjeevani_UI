
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared.module';
import { Covid19Component } from './covid.19.component';

const routes: Routes = [
  {
    path: '', component: Covid19Component,
    data: {
      breadcrumbs: [{
        Label: 'Covid-19',
        Route: '/covid-19'
      }]
    }
  }
];

@NgModule({
  declarations: [
    Covid19Component
  ],
  imports: [
    RouterModule.forChild(routes),
    SharedModule
  ],
  exports: [RouterModule]
})
export class Covid19Module { }
