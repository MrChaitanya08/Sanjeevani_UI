
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared.module';
import { DoctorsComponent } from './doctors.component';
import { DoctorsTimeTableComponent } from './doctor-timetable/doctors.timetable.component';
import { PatientReviewComponent } from './patient-review/patient.review.component';
import { RatingGraphComponent } from 'src/app/shared/component/rating-graph/rating.graph.component';

const routes: Routes = [
  {
    path: '', component: DoctorsComponent,
    data: {
      breadcrumbs: [{
        Label: 'Doctors',
        Route: '/doctors'
      }]
    }
  }, 
  {
    path: 'timetable', component: DoctorsTimeTableComponent,
    data: {
      breadcrumbs: [{
        Label: 'Doctors',
        Route: '/doctors'
      },
      {
        Label: 'TimeTable',
        Route: '/doctors/timetable'
      }]
    }
  },
  {
    path: 'doctor-review', component: PatientReviewComponent,
    data: {
      breadcrumbs: [{
        Label: 'Doctors',
        Route: '/doctors'
      },
      {
        Label: 'Doctor Review',
        Route: '/doctors/doctor-review'
      }]
    }
  },
  {
    path: 'doctor-review/:doctorRecordId', component: PatientReviewComponent,
    data: {
      breadcrumbs: [{
        Label: 'Doctors',
        Route: '/doctors'
      },
      {
        Label: 'Doctor Review',
        Route: '/doctors/doctor-review'
      }]
    }
  }
];

@NgModule({
  declarations: [
    DoctorsComponent,
    DoctorsTimeTableComponent,
    PatientReviewComponent,
    RatingGraphComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    SharedModule
  ],
  exports: [RouterModule]
})
export class DoctorsModule { }
