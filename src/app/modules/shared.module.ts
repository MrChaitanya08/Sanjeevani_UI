import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BreadCrumbComponent } from '../shared/component/bread-crumb/breadcrumb.component';
import { NeedMoreInfoComponent } from '../shared/component/need-more-info/need.more.info.component';
import { DoctorService } from '../service/doctor.service';


@NgModule({
  declarations: [
    BreadCrumbComponent,
    NeedMoreInfoComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [DoctorService],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BreadCrumbComponent,
    NeedMoreInfoComponent
  ]
})

export class SharedModule {
  // static forRoot(): ModuleWithProviders {
  //   return {
  //     ngModule: SharedModule,
  //     providers: [
  //       DoctorService
  //     ]
  //   }
  // }
}
