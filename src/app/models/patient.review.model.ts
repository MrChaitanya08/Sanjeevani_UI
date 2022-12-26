export class PatientReview {
    PatientReviews: PatientReviewEntity[]
}

export class PatientReviewEntity {
    DoctorRecordId: number;
    DoctorName: string;
    Degree: string;
    Reviews: ReviewEntity[];
}

export class ReviewEntity {
    PatientName: string;
    PatientEmail: string;
    Rating: number;
    Title: string;
    Review: string;
    CreateDate: Date;
}

export class Review extends ReviewEntity{
    DoctorRecordId: number;
    FacilityRecordId: number;
}