import { Injectable } from '@angular/core';
import { HttpWrapperService } from './http.wrapper.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ApiResources } from '../models/app.response.model';
import { AvailableJobsEntity } from '../models/career.model';

@Injectable()
export class CareerService {

    constructor(private httpWrapper: HttpWrapperService) { }

    getAvailableJobs(): Observable<AvailableJobsEntity[]> {
        const url = `career`;
        return this.httpWrapper.get<ApiResources>(url)
            .pipe(map(response => response.Resources));
    }

    submitResume(formData: any): Observable<any> {
        const url = `career`;
        return this.httpWrapper.post<any>(url, formData)
            .pipe(map(response => response));
    }
}
