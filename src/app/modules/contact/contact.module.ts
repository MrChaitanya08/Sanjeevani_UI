
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared.module';
import { ContactUsService } from 'src/app/service/contact.us.service';
import { ContactUsComponent } from './contact-us/contact.us.component';
import { CareerComponent } from './career/career.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { CareerService } from 'src/app/service/career.service';

const routes: Routes = [
  {
    path: '', component: ContactUsComponent
  },
  {
    path: 'career', component: CareerComponent,
    data: {
      breadcrumbs: [
        {
          Label: 'ContactUs',
          Route: '/contact'
        },
        {
        Label: 'Career',
        Route: '/contact/career'
      }]
    }
  }
];

@NgModule({
  declarations: [
    ContactUsComponent,
    CareerComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    SharedModule,
    BsDatepickerModule.forRoot(),
  ],
  providers:[ContactUsService,CareerService],
  exports: [RouterModule]
})
export class ContactModule { }
