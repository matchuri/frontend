export interface GroupUpdateRequest {
    readonly name?: string;
    readonly latitude?: number;
    readonly longitude?: number;
    readonly level?: number; // TODO: 서버에서 level 지원 시 실제 저장에 반영 예정
}