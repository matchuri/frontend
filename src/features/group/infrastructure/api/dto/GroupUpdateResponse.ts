export interface GroupUpdateResponse {
    readonly success: boolean;

    readonly data: {
        readonly groupId: number;
        readonly name: string;
        readonly latitude: number;
        readonly longitude: number;
        readonly radiusMeters: number;
        readonly address: string;
        readonly status: "ACTIVE";
        readonly updatedAt: string;
    };

    readonly error: {
        readonly status: number;
        readonly code: string;
        readonly message: string;
        readonly details: readonly unknown[];
    } | null;
}