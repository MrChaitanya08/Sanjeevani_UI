import { Injectable } from '@angular/core';
import { HttpWrapperService } from './http.wrapper.service';
import { map, tap } from 'rxjs/operators';
import { of, Observable } from 'rxjs';
import { PatientReviewEntity, PatientReview } from '../models/patient.review.model';
import { Facility, FacilityEntity } from '../models/facility.model';
import { ApiResources } from '../models/app.response.model';

@Injectable()
export class FacilityService {

    facility: FacilityEntity[];
    constructor(private httpWrapper: HttpWrapperService) { }

    getFacilities(): Observable<FacilityEntity[]> {
        const url = `Facility`;
        if (!this.facility) {
            return this.httpWrapper.get<ApiResources>(url).pipe(tap(response => {
                this.facility = response.Resources;
            })).pipe(map(response => response.Resources));
        }
        return of(this.facility);
    }

    get Facility() {
        return this.facility;
    }

    getFacilityNameById(id: number) {
        const facility = this.facility.filter(x => x.RecordId == id);
        return facility && facility.length > 0 ? facility[0].Name : '';
    }
}
