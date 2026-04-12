// OAuth 로그인 성공 시 실제 데이터 내용
export interface OAuthExchangeData {
    accessToken: string;
    refreshToken: string | null;
    expiresIn: number;
    member: {
        id: number;
        role: string;
    };
}