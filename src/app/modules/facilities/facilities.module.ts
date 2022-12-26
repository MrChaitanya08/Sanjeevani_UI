
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { FacilitiesComponent } from './facilities.component';
import { FacilitiesAllComponent } from './facilities-all/facilities.all.component';
import { FacilitiesRoomComponent } from './facilities-room/facilities.room.component';
import { FacilitiesPathologyComponent } from './facilities-pathology/facilities.pathology.component';
import { FacilitiesDialysisComponent } from './facilities-dialysis/facilities.dialysis.component';
import { FacilitiesICUComponent } from './facilities-icu/facilities.icu.component';
import { FacilitiesMaternityHomeComponent } from './facilities-maternityhome/facilities.maternityhome.component';
import { FacilitiesOPComponent } from './facilities-op/facilities.op.component';
import { FacilitiesBloodBankComponent } from './facilities-bloodbank/facilities.bloodbank.component';
import { FacilitiesPharmacyComponent } from './facilities-pharmacy/facilities.pharmacy.component';
import { FacilitiesXRayComponent } from './facilities-xray/facilities.xray.component';
import { SharedModule } from '../shared.module';

const routes: Routes = [
  {
    path: '', component: FacilitiesComponent,
    children: [
      {
        path: '', component: FacilitiesAllComponent,
        data: {
          breadcrumbs: [{
            Label: 'Facilities',
            Route: '/facilities'
          }]
        }
      },
      {
        path: 'room', component: FacilitiesRoomComponent,
        data: {
          breadcrumbs: [{
            Label: 'Facilities',
            Route: '/facilities'
          },
          {
            Label: 'Rooms',
            Route: '/facilities/room'
          }]
        }
      },
      {
        path: 'pathology', component: FacilitiesPathologyComponent,
        data: {
          breadcrumbs: [{
            Label: 'Facilities',
            Route: '/facilities'
          },
          {
            Label: 'Pathology',
            Route: '/facilities/pathology'
          }]
        }
      },
      {
        path: 'dialysis', component: FacilitiesDialysisComponent,
        data: {
          breadcrumbs: [{
            Label: 'Facilities',
            Route: '/facilities'
          },
          {
            Label: 'Dialysis',
            Route: '/facilities/dialysis'
          }]
        }
      },
      {
        path: 'icu', component: FacilitiesICUComponent,
        data: {
          breadcrumbs: [{
            Label: 'Facilities',
            Route: '/facilities'
          },
          {
            Label: 'ICU/ICCU',
            Route: '/facilities/icu'
          }]
        }
      },
      {
        path: 'maternity', component: FacilitiesMaternityHomeComponent,
        data: {
          breadcrumbs: [{
            Label: 'Facilities',
            Route: '/facilities'
          },
          {
            Label: 'Maternity Home',
            Route: '/facilities/maternity'
          }]
        }
      },
      {
        path: 'op', component: FacilitiesOPComponent,
        data: {
          breadcrumbs: [{
            Label: 'Facilities',
            Route: '/facilities'
          },
          {
            Label: 'Operation Theatre',
            Route: '/facilities/op'
          }]
        }
      },
      {
        path: 'bloodbank', component: FacilitiesBloodBankComponent,
        data: {
          breadcrumbs: [{
            Label: 'Facilities',
            Route: '/facilities'
          },
          {
            Label: 'Blood Bank',
            Route: '/facilities/bloodbank'
          }]
        }
      },
      {
        path: 'pharmacy', component: FacilitiesPharmacyComponent,
        data: {
          breadcrumbs: [{
            Label: 'Facilities',
            Route: '/facilities'
          },
          {
            Label: 'Pharmacy',
            Route: '/facilities/pharmacy'
          }]
        }
      },
      {
        path: 'xray', component: FacilitiesXRayComponent,
        data: {
          breadcrumbs: [{
            Label: 'Facilities',
            Route: '/facilities'
          },
          {
            Label: 'XRay',
            Route: '/facilities/xray'
          }]
        }
      }
    ]

  }
];

@NgModule({
  declarations: [
    FacilitiesComponent,
    FacilitiesAllComponent,
    FacilitiesRoomComponent,
    FacilitiesPathologyComponent,
    FacilitiesDialysisComponent,
    FacilitiesICUComponent,
    FacilitiesMaternityHomeComponent,
    FacilitiesOPComponent,
    FacilitiesBloodBankComponent,
    FacilitiesPharmacyComponent,
    FacilitiesXRayComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    SharedModule
  ],
  exports: [RouterModule]
})
export class FacilitiesModule { }
