"use client";

import { clientEnv } from "@/infrastructure/config/env";
import type { AuthProvider } from "@/features/auth/domain/model/AuthProvider";
import { socialLoginConfig } from "@/features/auth/ui/config/socialLoginConfig";

interface Props {
    provider: AuthProvider;
}

function getOAuthStartUrl(provider: AuthProvider) {
    return `${clientEnv.apiBaseUrl}/api/v1/auth/oauth2/${provider.toLowerCase()}`;
}

export default function SocialLoginButton({ provider }: Props) {
    const config = socialLoginConfig[provider];

    const handleLogin = () => {
        window.location.href = getOAuthStartUrl(provider);
    };

    return (
        <button type="button" onClick={handleLogin} className={config.className}>
            <div className="flex items-center justify-center gap-2">
                <span>{config.text}</span>
            </div>
        </button>
    );
}