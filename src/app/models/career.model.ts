export class Career {
    name: string;
    dateOfBirth: Date;
    phoneNumber: number;
    email: string;
    experience: number;
    currentEmployer: string;
    applyingFor: string;
    currentCTC: number;
    resume: FileEntity;
    applyingRecordId:string;
}

export class FileEntity {
    fileName: string;
    type: string;
    fileContent: string;
}

export class AvailableJobsEntity {
    RecordId: number;
    Department: string;
    Position: string;
    Qualification: string;
    Minimumexp: string;
    Jobdescription: string;
    IsDeleted: boolean;
}
