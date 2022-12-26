import { Component, OnInit } from '@angular/core';
import { ContactUsService } from 'src/app/service/contact.us.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  providers: [ContactUsService]
})
export class FooterComponent implements OnInit {
  headerHight = '50px';
  name: string;
  phone: number;
  message: any;
  constructor(private contactUsService: ContactUsService) { }

  ngOnInit() {
  }
  submitInquiry() {
    const contactUsInquiry: any = {
      Name: this.name,
      PhoneNumber: this.phone,
      Requirement: this.message
    };
    this.contactUsService.addContactUsInquiry(contactUsInquiry).subscribe(
      response => {
        alert('Thank you for contacting us. Your will be contacted soon.');
        this.clearInquiry();
      });
  }

  clearInquiry() {
    this.name = '';
    this.phone = null;
    this.message = '';
  }

}
