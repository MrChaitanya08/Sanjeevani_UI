
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared.module';
import { PatientGuideComponent } from './patient.guide.component';
import { GeneralInfoComponent } from './general-info/general.info.component';
import { MediclaimComponent } from './mediclaim/mediclaim.component';
import { VisitorsComponent } from './visitors/visitors.component';
import { ResponsibilitiesComponent } from './responsibilities/responsibilities.component';
import { AmenitiesComponent } from './amenities/amenities.component';
import { HealthPackageComponent } from 'src/app/shared/component/health-packages/health.packages.component';

const routes: Routes = [
  {
    path: '', component: PatientGuideComponent,
    data: {
      breadcrumbs: [{
        Label: 'Patient Guide',
        Route: '/patientguide'
      }]
    }
  }
];

@NgModule({
  declarations: [
    PatientGuideComponent,
    GeneralInfoComponent,
    MediclaimComponent,
    VisitorsComponent,
    ResponsibilitiesComponent,
    AmenitiesComponent,
    HealthPackageComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    SharedModule
  ],
  exports: [RouterModule]
})
export class PatientGuideModule { }
