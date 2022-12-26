import { Component, OnInit, AfterViewInit } from '@angular/core';
import { DoctorService } from 'src/app/service/doctor.service';
import { DoctorEntity, DoctorSlimEntity, Doctor } from 'src/app/models/doctor.model';
import { PatientReviewService } from 'src/app/service/patient.review.service';
import { Review } from 'src/app/models/patient.review.model';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { LoaderService } from 'src/app/service/loader.service';

@Component({
  selector: 'app-patient-review',
  templateUrl: './patient.review.component.html',
  styleUrls: ['./patient.review.component.scss']
})
export class PatientReviewComponent implements OnInit {

  doctorsSlim: DoctorSlimEntity[] = [];
  selectedDoctorRecordId: number;
  selectedDoctor: DoctorEntity;
  patientReviews: Review[] = [];
  actualRating = [];
  ratingCount = [1, 2, 3, 4, 5];
  doctorImageSrc: any;
  defaultImage: '../../../../assets/img/img_avatar.png';

  constructor(
    private doctorService: DoctorService,
    private patientReviewService: PatientReviewService,
    private route: ActivatedRoute,
    private domSanitizer: DomSanitizer,
    private loaderService: LoaderService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.selectedDoctorRecordId = params['doctorRecordId'] || this.doctorService.SelectedDoctorRecordId
         || 1;
      this.getDoctorSlim();
      if (this.selectedDoctorRecordId > 0) {
        this.getDoctor();
        this.patientReviewByDoctorId();
        this.getDoctorImage();
      }
    });

  }

  private getDoctorImage() {
    this.doctorImageSrc = '../../../../assets/img/img_avatar.png';
    if (Object.keys(this.doctorService.AllDoctorImage).length == 0) {
      this.doctorService.getDoctorImageById(this.selectedDoctorRecordId).subscribe(
        response => {
          if (response) {
            this.doctorImageSrc = this.domSanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,' + response.DoctorPhotoBase64String);
          }
        },
        error => {
          
        });
    } else {
      const docImage = this.doctorService.getDoctorImageByIdFromCache(this.selectedDoctorRecordId);
      if (docImage) {
        this.doctorImageSrc = docImage;
      }
    }

  }

  private getDoctorSlim() {
    this.loaderService.show();
    this.doctorService.getDoctorsSlim().subscribe(
      response => {
        this.doctorsSlim = response;
        this.loaderService.hide();
      },
      error => {
      });
  }

  private getDoctor() {
    this.loaderService.show();
    this.doctorService.getDoctorById(this.selectedDoctorRecordId).subscribe(
      response => {
        this.selectedDoctor = response;
        this.loaderService.hide();
      }
    )
  }

  private patientReviewByDoctorId() {
    this.loaderService.show();
    this.patientReviewService.getPatientReviewByDoctorId(this.selectedDoctorRecordId).subscribe(
      response => {
        this.patientReviews = response;
        this.actualRating = response.map(x => x.Rating);
        this.loaderService.hide();
      }
    )
  }

  public doctorChange(event) {
    if (event) {
      this.selectedDoctorRecordId = event.target.value;
      this.getDoctor();
      this.patientReviewByDoctorId();
      this.getDoctorImage();
    }
  }
}
