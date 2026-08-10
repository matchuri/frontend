import type { ReactNode } from "react";
import { ReCaptchaProvider } from "next-recaptcha-v3";

import { clientEnv } from "@/infrastructure/config/env";
import LoginReCaptchaBadge from "@/features/auth/ui/components/LoginReCaptchaBadge";

export default function LoginLayout({children}: {children: ReactNode}) {
    return (
        <ReCaptchaProvider reCaptchaKey={clientEnv.captchaSiteKey}>
            <LoginReCaptchaBadge />
            {children}
        </ReCaptchaProvider>
    );
}