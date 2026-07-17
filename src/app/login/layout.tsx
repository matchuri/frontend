import type { ReactNode } from "react";
import { ReCaptchaProvider } from "next-recaptcha-v3";

import { clientEnv } from "@/infrastructure/config/env";

export default function LoginLayout({ children }: { children: ReactNode }) {
    return (
        <ReCaptchaProvider reCaptchaKey={clientEnv.captchaSiteKey}>
            {children}
        </ReCaptchaProvider>
    );
}
