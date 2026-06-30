// 모든 API 응답의 공통 포맷
export interface ApiResponse<T> {
    success: boolean;
    data: T;
    error: null | {
        message: string;
        code: string;
    };
}