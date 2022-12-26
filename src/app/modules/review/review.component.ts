import { Component, OnInit, } from '@angular/core';
import { FormControl, Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Review } from 'src/app/models/patient.review.model';
import { PatientReviewService } from 'src/app/service/patient.review.service';
import { Router } from '@angular/router';
import { DoctorService } from 'src/app/service/doctor.service';
import { DoctorSlimEntity } from 'src/app/models/doctor.model';
import { LoaderService } from 'src/app/service/loader.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss']
})
export class ReviewComponent implements OnInit {
  reviewForm: FormGroup;
  selectedDoctor = null;
  addedStar = [];
  review: Review;
  doctorsSlim: DoctorSlimEntity[] = [];
  defaultImg = '../../../assets/img/our-team/sample_doctor.png';
  doctorImageSrc:any;
  constructor(
    private fb: FormBuilder,
    private patReviewService: PatientReviewService,
    private route: Router,
    private doctorService: DoctorService,
    private loaderService: LoaderService,
    private domSanitizer: DomSanitizer,) {
  }

  
  ngOnInit() {
    this.doctorImageSrc = '../../../assets/img/our-team/sample_doctor.png';
    this.reviewForm = this.fb.group({
      selectDoctor: ['', [Validators.required]],
      rating: [''],
      title: ['', [Validators.required]],
      review: ['', [Validators.required]],
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]]
    });
    this.getDoctorSlim();
  }

  // convenience getter for easy access to form fields
  get form() { return this.reviewForm.controls; }

  private getDoctorSlim() {
    this.loaderService.show();
    this.doctorService.getDoctorsSlim().subscribe(
      response => {
        response.unshift(Object.assign(new DoctorSlimEntity(), {
          RecordId: '',
          DoctorName: 'Select a Doctor',
          FacilityRecordId: 0,
          Degree: ''
        }))
        this.doctorsSlim = response;
        this.loaderService.hide();
      },
      error => {
        this.loaderService.hide();
      });
  }

  onSubmit() {
    console.log(this.reviewForm.controls);
  }

  getErrorMessage() {
    return this.form.email.hasError('required') ? 'You must enter a value' :
      this.form.email.hasError('email') ? 'Not a valid email' : '';
  }
  addStar(index: number) {
    if (this.addedStar && this.addedStar[index]) {
      this.addedStar.splice(index, 1);
    } else {
      this.addedStar[index] = 1;
    }
  }

  submitReview() {
    this.loaderService.show();
    this.review = Object.assign(new Review(), {
      DoctorRecordId: this.selectedDoctor.RecordId,
      PatientName: this.form.name.value,
      PatientEmail: this.form.email.value,
      Rating: this.addedStar.length,
      Title: this.form.title.value,
      Review: this.form.review.value
    });
    this.patReviewService.createPatientReview(this.review).subscribe(
      response => {
        this.loaderService.hide();
        setTimeout(() => {
          alert('Thank you for providing a review. Your review is submitted successfully');
          this.route.navigateByUrl('/home');
        }, 10);
        
        
      });
  }

  public doctorChange(event) {
    if (event) {
      const doctorRecordId = event.target.value;
      this.getDoctorImage(doctorRecordId);
      const selectedDoctor = this.doctorsSlim.filter(x => x.RecordId == doctorRecordId);
      if (selectedDoctor && selectedDoctor.length > 0) {
        this.selectedDoctor = selectedDoctor[0];
        
      }
    }
  }

  canelReview() {
    this.route.navigateByUrl('/home');
  }

  private getDoctorImage(doctorRecordId) {
    this.doctorService.getDoctorImageById(doctorRecordId).subscribe(
      response => {
        if (response && response.DoctorPhotoBase64String) {
          this.doctorImageSrc = this.domSanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,' + response.DoctorPhotoBase64String);
        } else{
          this.doctorImageSrc = '../../../assets/img/our-team/sample_doctor.png';
        }
      },
      error => {
        
      });

  }
}

