// 서버 응답 구조를 타입으로 정의
export interface LoginMember {
    readonly id: number;
    readonly role: string;
}