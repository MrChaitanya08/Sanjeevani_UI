import { Component, OnInit, AfterViewInit } from '@angular/core';
import { DoctorService } from 'src/app/service/doctor.service';
import { DoctorEntity, DoctorSlimEntity } from 'src/app/models/doctor.model';
import { FacilityService } from 'src/app/service/facility.service';
import { FacilityEntity } from 'src/app/models/facility.model';
import { LoaderService } from 'src/app/service/loader.service';

@Component({
  selector: 'app-doctors-timetable',
  templateUrl: './doctors.timetable.component.html',
  styleUrls: ['./doctors.timetable.component.scss']
})
export class DoctorsTimeTableComponent implements OnInit {

  doctors: DoctorEntity[] = [];
  doctorsSlim: DoctorSlimEntity[] = [];
  facilities: FacilityEntity[];
  defaultFacility = 0;
  defaultDoctor = 0;

  constructor(
    private doctorService: DoctorService,
    private facilityService: FacilityService,
    private loaderService: LoaderService
  ) { }

  ngOnInit() {
    this.getFacility();
    this.getDoctorSlim();
    this.getDoctors();
  }

  private getDoctorSlim() {
    this.loaderService.show();
    this.doctorService.getDoctorsSlim().subscribe(
      response => {
        this.doctorsSlim = response;
        this.loaderService.hide();
      },
      error => {
        this.loaderService.hide();
      }
    );
  }

  private getFacility() {
    this.loaderService.show();
    this.facilityService.getFacilities().subscribe(
      response => {
        this.facilities = response;
        this.loaderService.hide();
      },
      error => {
        this.loaderService.hide();
      });
  }

  private getDoctors() {
    this.loaderService.show();
    this.doctorService.getDoctors().subscribe(
      response => {
        this.doctors = response;
        this.loaderService.hide();
      }
    )
  }

  public facilityChange(event) {
    if (event) {
      this.doctors = [];
      const facilityRecordId = event.target.value;
      this.doctors = this.doctorService.getDoctorsByFacltyIdFromCache(facilityRecordId);
    }
  }

  public doctorChange(event) {
    if (event) {
      this.doctors = [];
      const doctorRecordId = event.target.value;
      this.doctors = this.doctorService.getDoctorByIdFromCache(doctorRecordId);
    }
  }

}
