export interface GroupCreateRequest {
    readonly name: string;

    readonly latitude: number;
    readonly longitude: number;

    readonly radiusMeters: number;
    readonly address: string;
}