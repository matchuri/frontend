export interface MemberLocationData {
    readonly latitude: number;
    readonly longitude: number;
    readonly radiusMeters: number;
    readonly address: string;
}

export interface MemberLocationResponse {
    readonly success: boolean;
    readonly data: MemberLocationData | null;
    readonly error: {
        readonly status: number;
        readonly code: string;
        readonly message: string;
        readonly details: readonly unknown[];
    } | null;
}