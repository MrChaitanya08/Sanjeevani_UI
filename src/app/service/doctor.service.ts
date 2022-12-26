import { Injectable } from '@angular/core';
import { HttpWrapperService } from './http.wrapper.service';
import { map, tap } from 'rxjs/operators';
import { of, Observable } from 'rxjs';
import { DoctorEntity, Doctor, DoctorSlimEntity, DoctorImageEntity } from '../models/doctor.model';
import { ApiResources, ApiResource } from '../models/app.response.model';
import { DomSanitizer } from '@angular/platform-browser';

@Injectable()
export class DoctorService {

    week = [
        'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'
    ];
    doctors: DoctorEntity[];
    doctorsSlim: DoctorSlimEntity[];
    selectedDoctorRecordId: number;
    allDoctorImage = {};

    constructor(private httpWrapper: HttpWrapperService,
        private domSanitizer:DomSanitizer) { }

    get Doctors() {
        return this.doctors;
    }

    get AllDoctorImage() {
        return this.allDoctorImage;
    }

    set AllDoctorImage(doctorImage){
        this.allDoctorImage = doctorImage;
    }
    set SelectedDoctorRecordId(value) {
        this.selectedDoctorRecordId = value;
    }

    get SelectedDoctorRecordId() {
        return this.selectedDoctorRecordId;
    }
    getDoctors(): Observable<DoctorEntity[]> {
        const url = `doctor`;
        if (!this.doctors) {
            return this.httpWrapper.get<ApiResources>(url).pipe(tap(response => {
                this.doctors = this.setDoctorTimimg(response.Resources);
            })).pipe(map(_ => this.doctors));
        }
        return of(this.doctors);
    }

    getDoctorById(doctorRecordId): Observable<DoctorEntity> {
        const url = `doctor/getDoctorById?doctorRecordId=${doctorRecordId}`;
        if (!this.doctors) {
            return this.httpWrapper.get<ApiResource>(url).pipe(tap(response => {
                const resource = this.setDoctorTimimg([response.Resource]);
                response.Resource = resource[0];
            })).pipe(map(response => response.Resource));
        }
        const doctor = this.getDoctorByIdFromCache(doctorRecordId);
        if (doctor && doctor.length > 0) {
            //this.doctors.push(doctor[0]);
            return of(doctor[0]);
        } else {
            return of(null);
        }
    }

    getDoctorsSlim(): Observable<DoctorSlimEntity[]> {
        const url = `doctor/getDoctorsSlim`;
        if (!this.doctorsSlim) {
            return this.httpWrapper.get<ApiResources>(url).pipe(tap(response => {
                this.doctorsSlim = response.Resources;
            })).pipe(map(response => response.Resources));
        }
        return of(this.doctorsSlim);
    }

    getAllDoctorImage(): Observable<any> {
        const url = `doctor/getAllDoctorImage`;
        if (Object.keys(this.allDoctorImage).length == 0) {
            return this.httpWrapper.get<ApiResources>(url).pipe(map(response => response.Resources));
        }
        return of(this.allDoctorImage);
    }    

    getDoctorByIdFromCache(doctorId: number) {
        if (doctorId == 0) {
            return this.doctors;
        } else {
            return this.doctors.filter(x => x.RecordId == doctorId);
        }
    }

    getDoctorsByFacltyIdFromCache(facilityId: number) {
        if (facilityId == 0) {
            return this.doctors;
        } else {
            return this.doctors.filter(x => x.FacilityRecordId == facilityId);
        }
    }

    setDoctorTimimg(doctors: DoctorEntity[]) {
        if (doctors) {
            let prevDayTime = null;
            let timing = null;
            doctors.forEach(x => {
                if (x.Mon === 'All Day') { // do not calculate timing if doctor is available all day
                    x.Timing = 'All Day';
                } else {
                    timing = null;
                    this.week.forEach((item, index) => {
                        if (index == 0) {
                            if (x[item] != '-')
                                timing = item;
                        } else if (prevDayTime != x[item]) {
                            if (prevDayTime != '-') {
                                timing = (timing.includes(this.week[index - 1])) ? `${timing} ${prevDayTime}, `
                                    : `${timing} - ${this.week[index - 1]} ${prevDayTime}, `;
                                if (x[item] != '-') {
                                    timing = `${timing}${item}`;
                                }
                            } else {
                                timing = `${timing}${item}`;
                            }
                        }
                        prevDayTime = x[item];
                    });
                    if (!timing.includes('-') && prevDayTime != '-') {
                        timing = `${timing} - Sun ${prevDayTime}`;
                    }
                    x.Timing = timing.trim().replace(/(,$)/g, "");
                }

            });
        }
        return doctors;
    }

    getDoctorImageById(doctorRecordId){
        const url = `doctor/GetDoctorImageById?doctorRecordId=${doctorRecordId}`;
        return this.httpWrapper.get<ApiResource>(url).pipe(map(response => response.Resource));        
    }

    getDoctorImageByIdFromCache(doctorRecordId){
        return this.allDoctorImage[doctorRecordId];
    }
}
