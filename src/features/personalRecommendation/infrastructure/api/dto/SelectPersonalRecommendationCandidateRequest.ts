export interface SelectPersonalRecommendationCandidateRequest {
    readonly selectedCandidateId: number;

    readonly latitude: number;
    readonly longitude: number;
    readonly radiusMeters: number;
    readonly address: string;
}