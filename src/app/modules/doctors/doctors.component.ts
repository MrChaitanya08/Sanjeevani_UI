import { Component, OnInit, AfterViewInit } from '@angular/core';
import { DoctorService } from 'src/app/service/doctor.service';
import { DoctorEntity, DoctorSlimEntity } from 'src/app/models/doctor.model';
import { FacilityService } from 'src/app/service/facility.service';
import { FacilityEntity } from 'src/app/models/facility.model';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { LoaderService } from 'src/app/service/loader.service';

@Component({
  selector: 'app-doctors',
  templateUrl: './doctors.component.html',
  styleUrls: ['./doctors.component.scss']
})
export class DoctorsComponent implements OnInit {

  doctors: DoctorEntity[] = [];
  doctorsSlim: DoctorSlimEntity[] = [];
  facilities: FacilityEntity[];
  defaultFacility = 0;
  defaultDoctor = 0;
  allDoctorImage = {};
  defaultImageSrc = '../../../assets/img/img_avatar.png';

  constructor(
    private doctorService: DoctorService,
    private facilityService: FacilityService,
    private router: Router,
    private domSanitizer: DomSanitizer,
    private loaderService: LoaderService
  ) { }

  ngOnInit() {
    this.getFacility();
    this.getDoctorSlim();
    this.getDoctors();
    this.getAllDoctorImage();
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
      });
  }

  private getAllDoctorImage() {
    this.loaderService.show();
    if (Object.keys(this.doctorService.AllDoctorImage).length == 0) {
      this.doctorService.getAllDoctorImage().subscribe(
        response => {
          if (response && response.length > 0) {
            response.map(x => {
              this.allDoctorImage[x.DoctorRecordId] =
                this.domSanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,' + x.DoctorPhotoBase64String);               
            });
            this.doctorService.AllDoctorImage = this.allDoctorImage;
          }
          this.loaderService.hide();
        },
        error => {
          this.loaderService.hide();
        });
    } else {
      this.allDoctorImage = this.doctorService.AllDoctorImage;
      this.loaderService.hide();
    }
  }

  private getFacility() {
    this.facilityService.getFacilities().subscribe(
      response => {
        const facilitiesDLL = Object.assign([], response);
        facilitiesDLL.unshift({ RecordId: 0, Name: 'All Departments' });
        this.facilities = facilitiesDLL;
      },
      error => {
      });
  }

  private getDoctors() {
    this.loaderService.show();
    this.doctorService.getDoctors().subscribe(
      response => {
        this.doctors = response;
        this.loaderService.hide();
      },
      error=>{
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

  public navigateToDoctorReview(doctorRecordId) {
    this.doctorService.SelectedDoctorRecordId = doctorRecordId;
    this.router.navigateByUrl('/doctors/doctor-review');
  }

}
