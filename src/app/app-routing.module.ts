import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReviewComponent } from './modules/review/review.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  
  {
    path: 'home',
    loadChildren: () => import('./modules/home/home.module').then( m => m.HomeModule)
  },
  {
    path: 'covid-19',
    loadChildren: () => import('./modules/covid-19/covid.19.module').then( m => m.Covid19Module)
  },
  {
    path: 'write-review',
    component: ReviewComponent
  },
  {
    path: 'facilities',
    loadChildren: () => import('./modules/facilities/facilities.module').then( m => m.FacilitiesModule)
  },
  {
    path: 'specialities',
    loadChildren: () => import('./modules/specialities/specialities.module').then( m => m.SpecialitiesModule)
  },
  {
    path: 'about-us',
    loadChildren: () => import('./modules/about-us/about.us.module').then( m => m.AboutUsModule)
  },
  {
    path: 'patient-guide',
    loadChildren: () => import('./modules/patient-guide/patient.guide.module').then( m => m.PatientGuideModule)
  },
  {
    path: 'patient-guide/:fragment',
    loadChildren: () => import('./modules/patient-guide/patient.guide.module').then( m => m.PatientGuideModule)
  },
  {
    path: 'doctors',
    loadChildren: () => import('./modules/doctors/doctors.module').then( m => m.DoctorsModule)
  },
  {
    path: 'contact',
    loadChildren: () => import('./modules/contact/contact.module').then( m => m.ContactModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{scrollPositionRestoration:'enabled',anchorScrolling:'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
