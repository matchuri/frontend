export interface SaveMemberLocationRequest {
    readonly latitude: number;
    readonly longitude: number;
    readonly radiusMeters: number;
    readonly address: string;
}