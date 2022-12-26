import { Component, OnInit, AfterViewInit } from '@angular/core';
import { PatientReviewService } from 'src/app/service/patient.review.service';
import { PatientReviewEntity, Review } from 'src/app/models/patient.review.model';
import { FacilityService } from 'src/app/service/facility.service';
import { Facility, FacilityEntity } from 'src/app/models/facility.model';
import { Router, Route } from '@angular/router';
import { DoctorService } from 'src/app/service/doctor.service';
import { Utils } from 'src/app/shared/Utils/utils';
import { SortOrder } from 'src/app/models/app.settings.model';
declare var $: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit {
  dimension: any = {}
  established = 0;
  selectedConsultant: FacilityEntity;
  patientReviews: PatientReviewEntity[] = null;
  ratingCount = [1, 2, 3, 4, 5];
  facilities: FacilityEntity[] = null;
  facilitiesDLL: FacilityEntity[] = null;
  loadingConsultant = false;
  loadingReviews = false;
  createdReview: Review;
  selectedDepartment: string = "0";
  showFigCounter = false;
  math: any;
  establishedValue: number;
  qualDocValue: number;
  surgeriesValue: number;
  satPatValue: number;
  constructor(
    private patientReviewService: PatientReviewService,
    private facilityService: FacilityService,
    private doctorService: DoctorService,
    private router: Router) { }

  ngOnInit() {
    this.math = Math;
    this.checkElementVisibility();
    this.selectedConsultant = Object.assign({ RecordId: 25, Name: 'Interventional Radiologist' });
    this.getFacility();
    this.dimension = { width: 1350, height: 800, space: 0 };
    this.getPatientReviews();

    // const request = {
    //   placeId: 'AlzaSyCrd4b7WiYxdTOfEAzlXkTolsbac51-jL0',
    //   fields: ['reviews']
    // };
    
    // this.service = new google.maps.places.PlacesService(document.getElementById('googleReviews'));

    // this.service.getDetails(request, this.callback);
    $("#google-reviews").googlePlaces({
      placeId: 'ChIJS1FDlAK35zsRiWEYnt-AGco',
      render: ['reviews'],
      min_rating: 5,
      max_rows: 0
  });
  }

  
  checkElementVisibility() {
    this.checkAboutDivVisibility();
    this.checkFacilitiesDivVisibility();
    this.checkDoctorDivVisibility();
    this.checkFacilitiesImageDivVisibility();
    this.checkFiguresDivVisibility();
  }

  private checkAboutDivVisibility(): void {
    const aboutImg  = new IntersectionObserver(
      function (entriesDiv) {
        const entryDiv = entriesDiv[0];
        if (entryDiv.isIntersecting === true) {
          const image = entryDiv.target.firstElementChild;
          image.classList.remove('display-n');
          image.classList.add('animate__animated', 'animate__fadeInLeft', 'animate__fast');
        }
      },
      { threshold: [0.7] }); 
    aboutImg.observe(document.querySelector("#home-about-img"));

    const aboutTxt = new IntersectionObserver(
      function (entriesDiv) {
        const aboutTxtDiv = entriesDiv[0];
        if (aboutTxtDiv.isIntersecting === true) {
          const aboutTxt = aboutTxtDiv.target.firstElementChild.firstElementChild;
          if(aboutTxt.classList.contains('display-n')){
            aboutTxt.classList.remove('display-n');
            aboutTxt.classList.add('animate__animated', 'animate__fadeInRightBig', 'animate__fast');
          }
        }
      },
      { threshold: [0.7] });
    aboutTxt.observe(document.querySelector("#home-about-txt"));
  }

  private checkFiguresDivVisibility(): void {
    const self = this;
    const figCounter = new IntersectionObserver(
      function (entries) {
        const entry = entries[0];
        if (entry.isIntersecting === true) {
          self.showFigCounter = true;
        }
      },
      { threshold: [0.5] });
    figCounter.observe(document.querySelector("#figures"));
  }

  private checkFacilitiesImageDivVisibility(): void {
    var facImg = new IntersectionObserver(
      function (entries) {
        const entry = entries[0];
        if (entry.isIntersecting === true) {
          var firstRowImage = entry.target.firstElementChild;
          firstRowImage.classList.remove('display-n');
          firstRowImage.classList.add('animate__animated', 'animate__fadeInLeftBig', 'animate__fast');

          var secondRowImage = entry.target.lastElementChild;
          secondRowImage.classList.remove('display-n');
          secondRowImage.classList.add('animate__animated', 'animate__fadeInRightBig', 'animate__fast');
        }
      },
      { threshold: [0.5] });

    facImg.observe(document.querySelector("#fac-img-animation"));
  }

  private checkFacilitiesDivVisibility(): void {
    const allFacilities = document.querySelectorAll(".facilities-row");
    const failities = new IntersectionObserver(
      function (facDivEntries) {
        facDivEntries.forEach((facDivEntry) => {
          if (facDivEntry.isIntersecting === true) {
            const elem = facDivEntry.target.firstElementChild;
            elem.classList.remove('animate__animated', 'animate__zoomIn', 'animate__fast');
            elem.classList.remove('display-n');
            elem.classList.add('animate__animated', 'animate__zoomIn', 'animate__fast');
          }
        });
      }, {
      threshold: [0.7]
    }
    );

    allFacilities.forEach(facility => {
      failities.observe(facility);
    });
  }

  private checkDoctorDivVisibility(): void {
    const allDoctors = document.querySelectorAll(".doctors-row");
    const doctors = new IntersectionObserver(
      function (docDivEntries) {
        docDivEntries.forEach((docDiventry, index) => {
          if (docDiventry.isIntersecting === true) {
            const elem = docDiventry.target.firstElementChild;
            elem.classList.remove('display-n');
            if (index == 0) {
              elem.classList.add('animate__animated', 'animate__fadeInLeft', 'animate__fast');
            } else if (index == 1) {
              elem.classList.add('animate__animated', 'animate__fadeInRight', 'animate__fast');
            } else if (index == 2) {
              elem.classList.add('animate__animated', 'animate__fadeInRight', 'animate__fast');
            }
          }
        });
      },
      { threshold: [0.6] });
    allDoctors.forEach(doctor => {
      doctors.observe(doctor);
    });
  }

  createIntersectionObserver(animationName, animationSpeed, thresholdValue) {
    return new IntersectionObserver(
      function (entriesDiv) {
        const entryDiv = entriesDiv[0];
        if (entryDiv.isIntersecting === true) {
          const image = entryDiv.target.firstElementChild;
          image.classList.remove('display-n');
          image.classList.add('animate__animated', animationSpeed, animationName);
        }
      },
      { threshold: [thresholdValue] });
  }

  ngAfterViewInit() {
    $('#main-banner').flexslider({
      animation: "slide",
      directionNav: true,
      controlNav: false,
      slideshowSpeed: 5000
    });

    $('#facilities-banner').flexslider({
      animation: "slide",
      directionNav: false,
      controlNav: true,
      slideshowSpeed: 5000
    });
  }
  getFacility() {
    this.loadingConsultant = true;
    this.facilityService.getFacilities().subscribe(
      response => {
        this.loadingConsultant = false;
        this.facilities = Utils.Sort(response, 'Name', SortOrder.asc);
        // const facilitiesDLL = Object.assign([], response);
        // facilitiesDLL.unshift({ RecordId: 0, Name: 'Select Department' });
        // this.facilitiesDLL = facilitiesDLL;
      },
      erro => {
        this.loadingConsultant = false;
      });
  }
  getReview(consultant: FacilityEntity) {
    this.patientReviews = null;
    this.selectedConsultant = consultant;
    this.getPatientReviews();
  }

  getPatientReviews() {
    this.loadingReviews = true;
    this.patientReviewService.getPatientReviewByFacilityId(this.selectedConsultant.RecordId).subscribe(
      response => {
        this.loadingReviews = false;
        if (response && response.length > 0) {
          const firstResponse = response[0];
          if (firstResponse.Reviews && firstResponse.Reviews.length > 2) {
            firstResponse.Reviews = [firstResponse.Reviews[0], firstResponse.Reviews[1]];
          }
          this.patientReviews = [firstResponse];
        } else {
          this.patientReviews = [];
        }
      },
      error => {
        this.loadingReviews = false;
      }
    )
  }

  createPatientReview() {
    this.patientReviewService.createPatientReview(this.createdReview).subscribe(
      response => {
        console.log(response);
      }
    );
  }

  navigateToTmetable() {
    this.router.navigateByUrl('/doctors/timetable');
  }
  loadReviews(doctorRecordId) {
    //this.doctorService.SelectedDoctorRecordId = doctorRecordId;
    this.router.navigateByUrl('/doctors/doctor-review/'+doctorRecordId);
  }
  navigateBySliderClick(naviagetPage) {
    this.router.navigateByUrl(`/${naviagetPage}`);
  }
  navigateToFacilities(url) {
    this.router.navigateByUrl(`/facilities/${url}`);
  }
  navigateToDoctorReview(doctorRecordId){
    this.doctorService.SelectedDoctorRecordId = doctorRecordId;
    this.router.navigateByUrl('/doctors/doctor-review');
  }
}
