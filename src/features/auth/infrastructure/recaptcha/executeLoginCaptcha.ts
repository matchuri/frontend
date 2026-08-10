const LOGIN_RECAPTCHA_ACTION = "login";

type ReCaptchaExecutor = (
    action: string,
) => Promise<string | null | undefined>;

export async function executeLoginCaptcha(
    executeRecaptcha: ReCaptchaExecutor,
): Promise<string> {
    const token = await executeRecaptcha(LOGIN_RECAPTCHA_ACTION);

    if (!token) {
        throw new Error("reCAPTCHA token is empty");
    }

    return token;
}