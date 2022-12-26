import { Component, OnInit, } from '@angular/core';
import { FormControl, Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Review } from 'src/app/models/patient.review.model';
import { PatientReviewService } from 'src/app/service/patient.review.service';
import { Router } from '@angular/router';
import { ContactUsService } from 'src/app/service/contact.us.service';
import { ContactUsEntity } from 'src/app/models/contact.us.inquiry.model';
import { LoaderService } from 'src/app/service/loader.service';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact.us.component.html',
  styleUrls: ['./contact.us.component.scss']
})
export class ContactUsComponent implements OnInit {

  reviewForm: FormGroup;
  contactUsInquiry: ContactUsEntity;

  constructor(
    private fb: FormBuilder,
    private contactUsService: ContactUsService,
    private loaderService: LoaderService) {
  }

  ngOnInit() {
    this.reviewForm = this.fb.group({
      name: ['', [Validators.required]],
      phonenumber: ['', [Validators.required, Validators.minLength(10)]],
      emailId: [''],
      requirement: ['', [Validators.required]]
    });
  }

  get form() { return this.reviewForm.controls; }

  getErrorMessage() {
    return this.form.email.hasError('required') ? 'You must enter a value' :
      this.form.email.hasError('email') ? 'Not a valid email' : '';
  }

  submitInquiry() {
    this.loaderService.show();
    this.contactUsInquiry = Object.assign(new ContactUsEntity(), {
      Name: this.form.name.value,
      PhoneNumber: this.form.phonenumber.value,
      EmailId: this.form.emailId.value,
      Requirement: this.form.requirement.value
    });
    this.contactUsService.addContactUsInquiry(this.contactUsInquiry).subscribe(
      response => {
        this.loaderService.hide();
        alert('Thank you for contacting us. Your will be contacted soon.');
        this.clearInquiry();
      });
  }

  clearInquiry() {
    this.form.name.setValue('');
    this.form.phonenumber.setValue('');
    this.form.emailId.setValue('');
    this.form.requirement.setValue('');
    this.reviewForm.markAsPristine();
    this.reviewForm.markAsUntouched();
  }

  keyPress(event: any) {
    const pattern = /[0-9\+\-\ ]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }
}

