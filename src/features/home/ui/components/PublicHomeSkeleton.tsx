// 게스트 상태일 때의 메인 화면
import Skeleton from "@/ui/components/Skeleton";

import { publicHomeSkeletonStyles } from "@/ui/styles/publicHomeSkeletonStyles";

export default function PublicHomeSkeleton() {
    return (
        <main
            className={publicHomeSkeletonStyles.page}
            aria-busy="true"
            aria-label="메인 화면을 불러오는 중"
        >
            <header className={publicHomeSkeletonStyles.header}>
                <div className={publicHomeSkeletonStyles.logoWrapper}>
                    <Skeleton className={publicHomeSkeletonStyles.logoIcon}/>
                    <Skeleton className={publicHomeSkeletonStyles.logoText}/>
                </div>

                <Skeleton className={publicHomeSkeletonStyles.loginButton}/>
            </header>

            <div className={publicHomeSkeletonStyles.content}>
                <section className={publicHomeSkeletonStyles.hero}>
                    <Skeleton className={publicHomeSkeletonStyles.heroBadge}/>
                    <Skeleton className={publicHomeSkeletonStyles.heroTitleFirst}/>
                    <Skeleton className={publicHomeSkeletonStyles.heroTitleSecond}/>
                    <Skeleton className={publicHomeSkeletonStyles.heroDescriptionFirst}/>
                    <Skeleton className={publicHomeSkeletonStyles.heroDescriptionSecond}/>
                    <Skeleton className={publicHomeSkeletonStyles.heroButton}/>
                </section>

                <section className={publicHomeSkeletonStyles.introSection}>
                    <div className={publicHomeSkeletonStyles.sectionHeader}>
                        <Skeleton className={publicHomeSkeletonStyles.sectionEyebrow}/>
                        <Skeleton className={publicHomeSkeletonStyles.sectionTitle}/>
                    </div>

                    <div className={publicHomeSkeletonStyles.stepList}>
                        {Array.from({ length: 3 }).map(
                            (_, index) => (
                                <div
                                    key={index}
                                    className={publicHomeSkeletonStyles.stepCard}
                                >
                                    <Skeleton className={publicHomeSkeletonStyles.stepIcon}/>

                                    <div className={publicHomeSkeletonStyles.stepContent}>
                                        <Skeleton className={publicHomeSkeletonStyles.stepTitle}/>
                                        <Skeleton className={publicHomeSkeletonStyles.stepDescriptionFirst}/>
                                        <Skeleton className={publicHomeSkeletonStyles.stepDescriptionSecond}/>
                                    </div>
                                </div>
                            ),
                        )}
                    </div>
                </section>

                <section className={publicHomeSkeletonStyles.featureSection}>
                    {Array.from({ length: 2 }).map(
                        (_, index) => (
                            <div
                                key={index}
                                className={publicHomeSkeletonStyles.featureCard}
                            >
                                <Skeleton className={publicHomeSkeletonStyles.featureIcon}/>

                                <div className={publicHomeSkeletonStyles.featureContent}>
                                    <Skeleton className={publicHomeSkeletonStyles.featureTitle}/>
                                    <Skeleton className={publicHomeSkeletonStyles.featureDescriptionFirst}/>
                                    <Skeleton className={publicHomeSkeletonStyles.featureDescriptionSecond}/>
                                </div>
                            </div>
                        ),
                    )}
                </section>

                <section className={publicHomeSkeletonStyles.signupSection}>
                    <Skeleton className={publicHomeSkeletonStyles.signupTitle}/>
                    <Skeleton className={publicHomeSkeletonStyles.signupDescriptionFirst}/>
                    <Skeleton className={publicHomeSkeletonStyles.signupDescriptionSecond}/>
                    <Skeleton className={publicHomeSkeletonStyles.signupButton}/>
                    <Skeleton className={publicHomeSkeletonStyles.signupGuide}/>
                </section>
            </div>
        </main>
    );
}