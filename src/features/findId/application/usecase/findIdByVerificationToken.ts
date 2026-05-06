import { findIdApi } from "@/features/findId/infrastructure/api/findIdApi";
import type { FindIdState } from "@/features/findId/domain/state/FindIdState";

interface FindIdByVerificationTokenParams {
    readonly emailVerificationToken: string;
}

export async function findIdByVerificationToken({
    emailVerificationToken,
}: FindIdByVerificationTokenParams): Promise<FindIdState> {
    try {
        const response = await findIdApi.findId({
            emailVerificationToken,
        });

        if (!response.success || !response.data) {
            return {
                status: "NOT_FOUND",
                message: "조회 결과가 없습니다.",
            };
        }

        return {
            status: "FOUND",
            loginId: response.data.loginId,
        };
    } catch {
        return {
            status: "ERROR",
            message: "아이디 조회 중 오류가 발생했습니다.",
        };
    }
}