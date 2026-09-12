"use client";

import Image from "next/image";

import { clientEnv } from "@/infrastructure/config/env";
import type { AuthProvider } from "@/features/auth/domain/model/AuthProvider";
import { socialLoginConfig } from "@/features/auth/ui/config/socialLoginConfig";
import { authPageStyles } from "@/ui/styles/authPageStyles";

interface Props {
    readonly provider: AuthProvider;
    readonly variant?: "full" | "icon";
}

function getOAuthStartUrl(provider: AuthProvider) {
    return `${clientEnv.apiBaseUrl}/api/v1/auth/oauth2/${provider.toLowerCase()}`;
}

export default function SocialLoginButton({
    provider,
    variant = "full",
}: Props) {
    const config = socialLoginConfig[provider];

    const handleLogin = () => {
        window.location.href = getOAuthStartUrl(provider);
    };

    if (variant === "icon") {
        return (
            <button
                type="button"
                onClick={handleLogin}
                className={authPageStyles.socialIconButton}
                aria-label={config.ariaLabel}
                title={config.ariaLabel}
            >
                <Image
                    src={config.icon}
                    alt=""
                    fill
                    sizes="56px"
                    loading="eager"
                    className={authPageStyles.socialIcon}
                    aria-hidden="true"
                />
            </button>
        );
    }

    return (
        <button type="button" onClick={handleLogin} className={config.className}>
            <div className="flex items-center justify-center gap-2">
                <Image
                    src={config.icon}
                    alt=""
                    width={20}
                    height={20}
                    aria-hidden="true"
                />
                <span>{config.text}</span>
            </div>
        </button>
    );
}