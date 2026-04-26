import { httpClient } from "@/infrastructure/http/httpClient";

interface ApiError {
    readonly status: number;
    readonly code: string;
    readonly message: string;
}

interface NicknameExistsData {
    readonly nickname: string;
    readonly exists: boolean;
}

interface NicknameExistsResponse {
    readonly success: boolean;
    readonly data: NicknameExistsData;
    readonly error: ApiError | null;
}

export async function existsNickname(nickname: string): Promise<boolean> {
    const encodedNickname = encodeURIComponent(nickname);

    const response = await httpClient.get<NicknameExistsResponse>(
        `/api/v1/members/exists/nickname/${encodedNickname}`,
    );

    if (!response.success) {
        throw new Error(
            response.error?.message || "닉네임 중복 확인에 실패했습니다.",
        );
    }

    return response.data.exists;
}