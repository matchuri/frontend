"use client";

// import Image from "next/image";
import { clientEnv } from "@/infrastructure/config/env";
import type { AuthProvider } from "../../domain/model/AuthProvider";
import { socialLoginConfig } from "../config/socialLoginConfig";

interface Props {
    provider: AuthProvider;
}

export default function SocialLoginButton({ provider }: Props) {
    const config = socialLoginConfig[provider];

    const handleLogin = () => {
        const providerPath = provider.toLowerCase();

        window.location.href = `${clientEnv.apiBaseUrl}/api/v1/auth/oauth2/${providerPath}`;
    };

    return (
        <button onClick={handleLogin} className={config.className}>
            <div className="flex items-center justify-center gap-2">
                <span>{config.text}</span>
        </div>
        </button>
    );
}