import { oauthCallbackLoadingStyles } from "@/ui/styles/oauthCallbackLoadingStyles";

export default function OAuthCallbackLoadingView() {
    return (
        <main
            className={oauthCallbackLoadingStyles.container}
            role="status"
            aria-live="polite"
            aria-busy="true"
        >
            <div
                className={oauthCallbackLoadingStyles.spinner}
                aria-hidden="true"
            />

            <h1 className={oauthCallbackLoadingStyles.title}>
                로그인 처리 중입니다
            </h1>

            <p className={oauthCallbackLoadingStyles.description}>
                잠시만 기다려 주세요
            </p>
        </main>
    );
}