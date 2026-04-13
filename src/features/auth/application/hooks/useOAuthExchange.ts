"use client";

import { useAuthAction } from "@/features/auth/application/hooks/useAuthAction";
import { exchangeOAuthCode } from "@/features/auth/application/usecase/exchangeOAuthCode";
import type { AuthProvider } from "@/features/auth/domain/model/AuthProvider";

export function useOAuthExchange() {
    const actions = useAuthAction();

    const exchangeOAuthCodeFn = async (
        provider: AuthProvider,
        code: string
    ) => {
        return exchangeOAuthCode(provider, code, actions);
    };

    return { exchangeOAuthCode: exchangeOAuthCodeFn };
}