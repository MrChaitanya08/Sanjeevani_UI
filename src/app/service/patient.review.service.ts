import { Injectable } from '@angular/core';
import { HttpWrapperService } from './http.wrapper.service';
import { map, tap } from 'rxjs/operators';
import { of, Observable } from 'rxjs';
import { PatientReviewEntity, PatientReview, Review } from '../models/patient.review.model';
import { ApiResources } from '../models/app.response.model';

@Injectable()
export class PatientReviewService {

    constructor(private httpWrapper: HttpWrapperService) { }

    getPatientReviewByFacilityId(facilityRecordId: number): Observable<PatientReviewEntity[]> {
        const url = `patientReview/getPatientReviewByFacilityId?facilityRecordId=${facilityRecordId}`;
        return this.httpWrapper.get<ApiResources>(url)
            .pipe(map(response => response.Resources));
    }

    getPatientReviewByDoctorId(doctorRecordId: number): Observable<Review[]> {
        const url = `patientReview/getPatientReviewByDoctorId?doctorRecordId=${doctorRecordId}`;
        return this.httpWrapper.get<ApiResources>(url)
            .pipe(map(response => response.Resources));
    }

    createPatientReview(review: Review): Observable<boolean> {
        const url = `patientReview`;
        return this.httpWrapper.post<boolean>(url,review)
            .pipe(map(response => response));
    }
}
