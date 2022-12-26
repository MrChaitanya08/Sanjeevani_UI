
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared.module';
import { SpecialitiesComponent } from './specialities.component';
import { SpecialitiesAllComponent } from './specialities-all/specialities-all.component';
import { SpecialitiesSurgeryComponent } from './specialities-surgery/specialities.surgery.component';
import { SpecialitiesCancercareComponent } from './specialities-cancercare/specialities.cancercare.component';
import { SpecialitiesCardiacareComponent } from './specialities-cardiaccare/specialities.cardiaccare.component';
import { SpecialitiesStemcellComponent } from './specialities-stemcell/specialities.stemcell.component';
import { SpecialitiesNewBornComponent } from './specialities-newborn/specialities.newborn.component';
import { SpecialitiesMedicalTourismComponent } from './specialities-medicaltourism/specialities.medicaltourism.component';

const routes: Routes = [
  {
    path: '', component: SpecialitiesComponent,
    children: [
      {
        path: '', component: SpecialitiesAllComponent,
        data: {
          breadcrumbs: [{
            Label: 'Specialities',
            Route: '/specialities'
          }]
        }
      },
      {
        path: 'surgery', component: SpecialitiesSurgeryComponent,
        data: {
          breadcrumbs: [{
            Label: 'Specialities',
            Route: '/specialities'
          },
          {
            Label: 'Surgery',
            Route: '/specialities/surgery'
          }]
        }
      },
      {
        path: 'cancercare', component: SpecialitiesCancercareComponent,
        data: {
          breadcrumbs: [{
            Label: 'Specialities',
            Route: '/specialities'
          },
          {
            Label: 'Cancer Care',
            Route: '/specialities/cancercare'
          }]
        }
      },
      {
        path: 'cardiaccare', component: SpecialitiesCardiacareComponent,
        data: {
          breadcrumbs: [{
            Label: 'Specialities',
            Route: '/specialities'
          },
          {
            Label: 'Cardiac Care',
            Route: '/specialities/cardiaccare'
          }]
        }
      },
      {
        path: 'newborn', component: SpecialitiesNewBornComponent,
        data: {
          breadcrumbs: [{
            Label: 'Specialities',
            Route: '/specialities'
          },
          {
            Label: 'New Born Screening',
            Route: '/specialities/newborn'
          }]
        }
      },
      {
        path: 'medicaltourism', component: SpecialitiesMedicalTourismComponent,
        data: {
          breadcrumbs: [{
            Label: 'Specialities',
            Route: '/specialities'
          },
          {
            Label: 'Medical Tourism',
            Route: '/specialities/medicaltourism'
          }]
        }
      },
      {
        path: 'stemcell', component: SpecialitiesStemcellComponent,
        data: {
          breadcrumbs: [{
            Label: 'Specialities',
            Route: '/specialities'
          },
          {
            Label: 'Stem cell',
            Route: '/specialities/stemcell'
          }]
        }
      }
    ]

  }
];

@NgModule({
  declarations: [
    SpecialitiesComponent,
    SpecialitiesAllComponent,
    SpecialitiesSurgeryComponent,
    SpecialitiesCancercareComponent,
    SpecialitiesCardiacareComponent,
    SpecialitiesStemcellComponent,
    SpecialitiesNewBornComponent,
    SpecialitiesMedicalTourismComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    SharedModule
  ],
  exports: [RouterModule]
})
export class SpecialitiesModule { }
