import type { Metadata } from "next";
import type { ReactNode } from "react";
import { ReCaptchaProvider } from "next-recaptcha-v3";

import { clientEnv } from "@/infrastructure/config/env";
import LoginReCaptchaBadge from "@/features/auth/ui/components/LoginReCaptchaBadge";

export const metadata: Metadata = {
    title: "로그인",
    robots: {
        index: false,
        follow: false,
    },
};

export default function LoginLayout({children}: {children: ReactNode}) {
    return (
        <ReCaptchaProvider reCaptchaKey={clientEnv.captchaSiteKey}>
            <LoginReCaptchaBadge />
            {children}
        </ReCaptchaProvider>
    );
}