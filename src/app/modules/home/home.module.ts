
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgImageSliderModule } from 'ng-image-slider';
import { HomeComponent } from './home.component';
import { Routes, RouterModule } from '@angular/router';
import { MatSelectModule, MatFormFieldModule, MatInputModule, MAT_LABEL_GLOBAL_OPTIONS } from '@angular/material';
import { MatSliderModule } from '@angular/material/slider';
import { MatIconModule } from '@angular/material/icon';
import { SharedModule } from '../shared.module';
import { CountoModule }  from 'angular2-counto';

const routes: Routes = [
    {
      path: '', component: HomeComponent
    }
  ];

@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    SharedModule,
    NgImageSliderModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    MatSliderModule,
    MatIconModule,
    CountoModule
  ],
  exports: [RouterModule]
})
export class HomeModule {}
