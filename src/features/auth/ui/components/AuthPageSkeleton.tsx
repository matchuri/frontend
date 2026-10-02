import Skeleton from "@/ui/components/Skeleton";

import { authPageSkeletonStyles } from "@/ui/styles/authPageSkeletonStyles";

type AuthPageSkeletonVariant =
    | "LOGIN"
    | "SIGNUP_ACCOUNT"
    | "TERMS"
    | "NICKNAME"
    | "PREFERENCE";

interface AuthPageSkeletonProps {
    readonly variant: AuthPageSkeletonVariant;
}

export default function AuthPageSkeleton({
    variant,
}: AuthPageSkeletonProps) {
    const isLogin = variant === "LOGIN";
    const hasProgress = variant !== "LOGIN";

    return (
        <main
            className={authPageSkeletonStyles.page}
            aria-busy="true"
            aria-label="화면 정보를 불러오는 중"
        >
            <header className={authPageSkeletonStyles.header}>
                <Skeleton className={authPageSkeletonStyles.backButton} />

                <div />

                <div className={authPageSkeletonStyles.headerSpacer} />
            </header>

            <div
                className={
                    isLogin
                        ? authPageSkeletonStyles.loginContent
                        : authPageSkeletonStyles.content
                }
            >
                {hasProgress && (
                    <div className={authPageSkeletonStyles.progress}>
                        <div className={authPageSkeletonStyles.progressMeta}>
                            <Skeleton className={authPageSkeletonStyles.progressLabel} />
                            <Skeleton className={authPageSkeletonStyles.progressStep} />
                        </div>

                        <Skeleton className={authPageSkeletonStyles.progressTrack} />
                    </div>
                )}

                {variant === "LOGIN" && <LoginSkeleton />}

                {variant === "SIGNUP_ACCOUNT" && <SignupAccountSkeleton />}

                {variant === "TERMS" && <TermsSkeleton />}

                {variant === "NICKNAME" && <NicknameSkeleton />}

                {variant === "PREFERENCE" && <PreferenceSkeleton />}
            </div>
        </main>
    );
}

function IntroSkeleton({
    hasDescription = true,
}: {
    readonly hasDescription?: boolean;
}) {
    return (
        <div className={authPageSkeletonStyles.intro}>
            <Skeleton className={authPageSkeletonStyles.title} />

            {hasDescription && (
                <>
                    <Skeleton className={authPageSkeletonStyles.descriptionFirst} />
                    <Skeleton className={authPageSkeletonStyles.descriptionSecond} />
                </>
            )}
        </div>
    );
}

function InputSkeleton() {
    return (
        <div className={authPageSkeletonStyles.inputGroup}>
            <Skeleton className={authPageSkeletonStyles.label} />
            <Skeleton className={authPageSkeletonStyles.input} />
        </div>
    );
}

function LoginSkeleton() {
    return (
        <>
            <div className={authPageSkeletonStyles.loginIntro}>
                <Skeleton className={authPageSkeletonStyles.loginTitle} />
            </div>

            <div className={authPageSkeletonStyles.form}>
                <InputSkeleton />
                <InputSkeleton />
                <Skeleton className={authPageSkeletonStyles.button} />
            </div>

            <div className={authPageSkeletonStyles.signupGuide}>
                <Skeleton className={authPageSkeletonStyles.signupGuideText} />
            </div>

            <div className={authPageSkeletonStyles.divider}>
                <Skeleton className={authPageSkeletonStyles.dividerLine} />
                <Skeleton className={authPageSkeletonStyles.dividerText} />
                <Skeleton className={authPageSkeletonStyles.dividerLine} />
            </div>

            <div className={authPageSkeletonStyles.socialGroup}>
                {Array.from({ length: 3 }).map((_, index) => (
                    <Skeleton
                        key={index}
                        className={authPageSkeletonStyles.socialButton}
                    />
                ))}
            </div>

            <Skeleton className={authPageSkeletonStyles.helperLinks} />
        </>
    );
}

function SignupAccountSkeleton() {
    return (
        <>
            <IntroSkeleton />

            <div className={authPageSkeletonStyles.form}>
                <InputSkeleton />
                <Skeleton className={authPageSkeletonStyles.button} />
            </div>
        </>
    );
}

function TermsSkeleton() {
    return (
        <>
            <IntroSkeleton />

            <div className={authPageSkeletonStyles.termList}>
                <Skeleton className={authPageSkeletonStyles.termAll} />

                {Array.from({ length: 3 }).map((_, index) => (
                    <Skeleton
                        key={index}
                        className={authPageSkeletonStyles.termItem}
                    />
                ))}
            </div>

            <Skeleton className={authPageSkeletonStyles.termGuide} />
            <Skeleton className={authPageSkeletonStyles.button} />
        </>
    );
}

function NicknameSkeleton() {
    return (
        <>
            <IntroSkeleton />

            <div className={authPageSkeletonStyles.form}>
                <InputSkeleton />
                <Skeleton className={authPageSkeletonStyles.button} />
            </div>
        </>
    );
}

function PreferenceSkeleton() {
    return (
        <>
            <IntroSkeleton />

            <div className={authPageSkeletonStyles.preferenceSections}>
                {Array.from({ length: 3 }).map((_, sectionIndex) => (
                    <section
                        key={sectionIndex}
                        className={authPageSkeletonStyles.preferenceSection}
                    >
                        <Skeleton className={authPageSkeletonStyles.preferenceTitle} />

                        <div className={authPageSkeletonStyles.preferenceChips}>
                            {Array.from({ length: 4 }).map((_, chipIndex) => (
                                <Skeleton
                                    key={chipIndex}
                                    className={authPageSkeletonStyles.preferenceChip}
                                />
                            ))}
                        </div>
                    </section>
                ))}

                <Skeleton className={authPageSkeletonStyles.preferenceSearch} />
            </div>

            <Skeleton className={authPageSkeletonStyles.button} />
        </>
    );
}