import { httpClient } from "@/infrastructure/http/httpClient";
import type { SubmitAgreementsResponse } from "@/features/auth/infrastructure/api/dto/SubmitAgreementsResponse";
import type { UpdateNicknameResponse } from "@/features/auth/infrastructure/api/dto/UpdateNicknameResponse";

interface SubmitAgreementsRequest {
    agreements: {
        agreementType: string;
        agreementVersion: string;
    }[];
}

interface UpdateNicknameRequest {
    nickname: string;
}

export const onboardingApi = {
    submitRequiredAgreements(payload: SubmitAgreementsRequest) {
        return httpClient.post<SubmitAgreementsResponse>(
            "/api/v1/member-agreements/consents",
            payload,
        );
    },

    updateOnboardingNickname(payload: UpdateNicknameRequest) {
        return httpClient.patch<UpdateNicknameResponse>(
            "/api/v1/members/me",
            payload,
        );
    },
} as const;