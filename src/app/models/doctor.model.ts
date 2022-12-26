export class Doctor {
    Doctors: DoctorEntity[];
}

export class DoctorEntity {
    RecordId:number;
    FacilityRecordId:number;
    DoctorName: string;
    DateOfBirth: string;
    Gender: string;
    Phone: string;
    Email: string;
    Degree: string;
    Sun: string;
    Mon: string;
    Tue: string;
    Wed: string;
    Thu: string;
    Fri: string;
    Sat: string;
    Timing:string;
    FacilityName:string;

}

export class DoctorSlimEntity {
    RecordId:number;
    DoctorName: string;
    FacilityRecordId: number;
    Degree:string;
}

export class DoctorImageEntity {
    DoctorRecordId: number;
    DoctorPhotoBase64String: string;
}