"use client";

import { useRouter } from "next/navigation";

import { signupPageStyles } from "@/ui/styles/signupPageStyles";
import type { AuthProvider } from "@/features/auth/domain/model/AuthProvider";
import SocialLoginButton from "@/features/auth/ui/components/SocialLoginButton";

import { accountStorage } from "@/features/signup/infrastructure/storage/accountStorage";
import { useLoginIdValidation } from "@/features/signup/application/hooks/useLoginIdValidation";
import { usePasswordValidation } from "@/features/signup/application/hooks/usePasswordValidation";
import { useEmailVerification } from "@/features/emailVerification/application/hooks/useEmailVerification";
import { useVerificationExpireTimer } from "@/features/emailVerification/application/hooks/useVerificationExpireTimer";
import { useResendTimer } from "@/features/emailVerification/application/hooks/useResendTimer";

const providers: AuthProvider[] = ["GOOGLE", "KAKAO", "NAVER"];

export default function SignupPage() {
    const router = useRouter();

    const {
        loginId,
        message: loginIdMessage,
        canUseLoginId,
        handleLoginIdChange,
    } = useLoginIdValidation();

    const {
        password,
        isPasswordValid,
        message: passwordMessage,
        handlePasswordChange,
    } = usePasswordValidation();

    const {
        email,
        code: verificationCode,
        status: emailVerificationStatus,
        message: emailVerificationMessage,
        emailVerificationToken,
        remainingSeconds,
        resendSeconds,
        confirmAttemptCount,
        maxConfirmAttempts,
        resendAttemptCount,
        maxResendAttempts,
        hasSentVerificationEmail,
        isVerified: isEmailVerified,
        canSendVerificationEmail,
        canResendVerificationEmail,
        canConfirmVerificationEmail,
        setRemainingSeconds,
        setResendSeconds,
        handleExpired,
        handleEmailChange,
        handleCodeChange,
        sendVerificationEmail,
        confirmVerificationEmail,
    } = useEmailVerification({
        purpose: "SIGNUP",
    });

    const { stopVerificationTimer } = useVerificationExpireTimer({
        remainingSeconds,
        setRemainingSeconds,
        onExpired: handleExpired,
    });

    useResendTimer({
        resendSeconds,
        setResendSeconds,
    });

    const canSubmit =
        canUseLoginId &&
        isPasswordValid &&
        isEmailVerified &&
        !!emailVerificationToken;

    const handleSubmit = () => {
        if (!canSubmit) return;

        accountStorage.save({
            id: loginId.trim(),
            password: password.trim(),
            email: email.trim(),
            emailVerificationToken,
            isSocial: false,
        });

        router.push("/terms");
    };

    const getLoginIdMessageColor = () => {
        if (!loginIdMessage) return "";

        if (canUseLoginId) {
            return "text-blue-500";
        }

         if (loginIdMessage === "확인 중...") {
            return "text-gray-400";
         }

        return "text-red-500";
    };

    const getEmailVerificationMessageColor = () => {
        switch (emailVerificationStatus) {
            case "VERIFIED":
                return "text-blue-500";
            case "ERROR":
            case "EXPIRED":
                return "text-red-500";
            case "SENDING":
            case "VERIFYING":
            case "SENT":
                return "text-gray-500";
            default:
                return "";
        }
    };

    const formatSeconds = (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const remaining = seconds % 60;

        return `${minutes}:${remaining.toString().padStart(2, "0")}`;
    };

    return (
        <div className={signupPageStyles.container}>
            {/* 로고 */}
            <div className="absolute top-20 flex items-center gap-2 text-2xl font-semibold text-black">
                <span>Matchuri</span>
            </div>

            <div className={signupPageStyles.card}>
                {/* 제목 */}
                <div className="flex flex-col gap-1 w-full">
                    <h1 className={signupPageStyles.title}>계정 만들기</h1>
                </div>

                {/* 소셜 로그인 */}
                <div className={signupPageStyles.socialGroup}>
                    {providers.map((provider) => (
                        <SocialLoginButton key={provider} provider={provider} />
                    ))}
                </div>

                {/* divider */}
                <div className={signupPageStyles.divider}>
                    <div className={signupPageStyles.dividerLine}></div>
                        <span>또는</span>
                    <div className={signupPageStyles.dividerLine}></div>
                </div>

                {/* 입력 영역 */}
                <div className={signupPageStyles.formGroup}>
                    {/* 아이디 */}
                    <div className={signupPageStyles.inputGroup}>
                        <label className={signupPageStyles.label}>아이디</label>

                        <input
                            type="text"
                            className={signupPageStyles.input}
                            value={loginId}
                            onChange={(e) => handleLoginIdChange(e.target.value)}
                            placeholder="아이디를 입력하세요"
                        />

                        {loginIdMessage && (
                            <p className={`mt-2 text-sm ${getLoginIdMessageColor()}`}>
                                {loginIdMessage}
                            </p>
                        )}
                    </div>

                    {/* 비밀번호 */}
                    <div className={signupPageStyles.inputGroup}>
                        <label className={signupPageStyles.label}>비밀번호</label>

                        <input
                            type="password"
                            className={signupPageStyles.input}
                            value={password}
                            onChange={(e) => handlePasswordChange(e.target.value)}
                            placeholder="비밀번호를 입력하세요"
                        />

                        {passwordMessage && (
                            <p className="mt-2 text-sm text-red-500">
                                {passwordMessage}
                            </p>
                        )}
                    </div>

                    <div className={signupPageStyles.inputGroup}>
                        <label className={signupPageStyles.label}>이메일</label>

                        <div className="flex gap-2">
                            <input
                                type="email"
                                className={signupPageStyles.input}
                                value={email}
                                onChange={(e) => handleEmailChange(e.target.value)}
                                placeholder="이메일을 입력하세요"
                            />

                            {!hasSentVerificationEmail ? (
                                <button
                                    type="button"
                                    onClick={sendVerificationEmail}
                                    disabled={!canSendVerificationEmail}
                                    className={
                                        canSendVerificationEmail
                                            ? `${signupPageStyles.nextButton} whitespace-nowrap`
                                            : `${signupPageStyles.nextButton} whitespace-nowrap opacity-50 cursor-not-allowed`
                                    }
                                >
                                    인증
                                </button>
                            ) : (
                                <button
                                    type="button"
                                    onClick={sendVerificationEmail}
                                    disabled={isEmailVerified}
                                    className={
                                        canResendVerificationEmail && !isEmailVerified
                                            ? `${signupPageStyles.nextButton} whitespace-nowrap`
                                            : `${signupPageStyles.nextButton} whitespace-nowrap opacity-50 cursor-not-allowed`
                                    }
                                >
                                    {isEmailVerified ? "완료" : "재발송"}
                                </button>
                            )}
                        </div>

                        {hasSentVerificationEmail && !isEmailVerified && (
                            <p className="mt-2 text-xs text-gray-400">
                                인증 코드 발송 횟수 {resendAttemptCount}/{maxResendAttempts}
                                {resendSeconds !== null &&
                                    resendSeconds > 0 &&
                                    `, 인증코드 재발송 가능 시간: ${resendSeconds}초 후`}
                            </p>
                        )}
                    </div>

                    <div className={signupPageStyles.inputGroup}>
                        <label className={signupPageStyles.label}>인증 코드</label>

                        <div className="flex gap-2">
                            <input
                                type="text"
                                className={signupPageStyles.input}
                                value={verificationCode}
                                onChange={(e) => handleCodeChange(e.target.value)}
                                placeholder="인증 코드를 입력하세요"
                                disabled={isEmailVerified}
                            />

                            <button
                                type="button"
                                onClick={() => confirmVerificationEmail(stopVerificationTimer)}
                                disabled={!canConfirmVerificationEmail || isEmailVerified}
                                className={
                                    canConfirmVerificationEmail && !isEmailVerified
                                        ? `${signupPageStyles.nextButton} whitespace-nowrap`
                                        : `${signupPageStyles.nextButton} whitespace-nowrap opacity-50 cursor-not-allowed`
                                }
                            >
                                {isEmailVerified ? "완료" : "확인"}
                            </button>
                        </div>

                        {/*
                        {remainingSeconds !== null && !isEmailVerified && (
                            <p className="mt-2 text-sm text-gray-500">
                                인증 유효시간 {formatSeconds(remainingSeconds)}
                            </p>
                        )}
                        */}

                        {!isEmailVerified && (
                            <p className="mt-2 text-xs text-gray-400">
                                인증 시도 {confirmAttemptCount}/{maxConfirmAttempts}
                                {remainingSeconds !== null &&
                                    `, 인증 유효시간 ${formatSeconds(remainingSeconds)}`}
                          </p>
                        )}

                        {emailVerificationMessage && (
                            <p
                                className={`mt-2 text-sm ${getEmailVerificationMessageColor()}`}
                            >
                                {emailVerificationMessage}
                            </p>
                        )}
                    </div>

                    {/* 계속 버튼 */}
                    <div className="flex justify-end">
                        <button
                            type="button"
                            onClick={handleSubmit}
                            disabled={!canSubmit}
                            className={
                                canSubmit
                                    ? signupPageStyles.nextButton
                                    : `${signupPageStyles.nextButton} opacity-50 cursor-not-allowed`
                            }
                        >
                        계속
                        </button>
                    </div>
                </div>
          </div>
        </div>
    );
}