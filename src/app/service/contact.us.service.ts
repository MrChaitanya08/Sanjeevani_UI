import { Injectable } from '@angular/core';
import { HttpWrapperService } from './http.wrapper.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ContactUsEntity } from '../models/contact.us.inquiry.model';

@Injectable()
export class ContactUsService {

    constructor(private httpWrapper: HttpWrapperService) { }

    addContactUsInquiry(inquiry: ContactUsEntity): Observable<any> {
        const url = `ContactUs`;
        return this.httpWrapper.post<any>(url, inquiry)
            .pipe(map(response => response));
    }
}
