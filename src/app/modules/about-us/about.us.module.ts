
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared.module';
import { AboutUsComponent } from './about.us.component';

const routes: Routes = [
  {
    path: '', component: AboutUsComponent,
    data: {
      breadcrumbs: [{
        Label: 'About Us',
        Route: '/about-us'
      }]
    }
  }
];

@NgModule({
  declarations: [
    AboutUsComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    SharedModule
  ],
  exports: [RouterModule]
})
export class AboutUsModule { }
