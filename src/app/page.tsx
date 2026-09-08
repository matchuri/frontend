"use client";

import Link from "next/link";
import {
    ArrowRight,
    ChefHat,
    MapPin,
    SlidersHorizontal,
    Sparkles,
    Store,
    UsersRound,
} from "lucide-react";

import { useRootRedirectGuard } from "@/features/routeGuard/application/hooks/useRootRedirectGuard";

import { homePageStyles } from "@/ui/styles/homePageStyles";

const recommendationSteps = [
    {
        id: 1,
        title: "취향과 위치 설정",
        description: "좋아하는 음식 취향과 식사할 위치를 간단하게 설정해요.",
        icon: SlidersHorizontal,
    },
    {
        id: 2,
        title: "메뉴 추천 받기",
        description: "입력한 정보를 바탕으로 오늘 먹기 좋은 메뉴 3가지를 추천해요.",
        icon: ChefHat,
    },
    {
        id: 3,
        title: "주변 맛집 찾기",
        description: "마음에 드는 메뉴의 주변 맛집을 바로 확인해보세요.",
        icon: Store,
    },
] as const;

export default function Home() {
    const { shouldShowPublicHome } = useRootRedirectGuard();

    if (!shouldShowPublicHome) {
        return null;
    }

    return (
        <main className={homePageStyles.container}>
            <header className={homePageStyles.header}>
                <Link
                    href="/"
                    className={homePageStyles.logo}
                    aria-label="맛추리 홈"
                >
                    <div className={homePageStyles.logoIcon}>
                        <ChefHat
                            size={22}
                            strokeWidth={2.3}
                            aria-hidden="true"
                        />
                    </div>

                    <span className={homePageStyles.logoText}>
                        Matchuri
                    </span>
                </Link>

                <Link
                    href="/login"
                    className={homePageStyles.loginButton}
                >
                    로그인
                </Link>
            </header>

            <div className={homePageStyles.content}>
                <section className={homePageStyles.hero}>
                    <div className={homePageStyles.heroDecorationTop} />

                    <div className={homePageStyles.heroContent}>
                        <div className={homePageStyles.heroBadge}>
                            <Sparkles
                                size={13}
                                aria-hidden="true"
                            />
                            오늘의 메뉴 고민 해결사
                        </div>

                        <h1 className={homePageStyles.heroTitle}>
                            오늘 뭐 먹지?
                            <br />
                            <span className={homePageStyles.heroTitleHighlight}>
                                고민은 이제 그만!
                            </span>
                        </h1>

                        <p className={homePageStyles.heroDescription}>
                            취향과 위치만 알려주세요.
                            <br />
                            지금 먹기 좋은 메뉴를 추천해드릴게요.
                        </p>

                        <Link
                            href="/guest-recommendation"
                            className={homePageStyles.startButton}
                        >
                            지금 시작하기

                            <ArrowRight
                                size={18}
                                aria-hidden="true"
                            />
                        </Link>
                    </div>
                </section>

                <section className={homePageStyles.introSection}>
                    <div className={homePageStyles.sectionHeader}>
                        <span className={homePageStyles.sectionEyebrow}>
                            MATCHURI
                        </span>

                        <h2 className={homePageStyles.sectionTitle}>
                            이렇게 사용하세요
                        </h2>
                    </div>

                    <div className={homePageStyles.stepList}>
                        {recommendationSteps.map((step) => {
                            const Icon = step.icon;

                            return (
                                <article
                                    key={step.id}
                                    className={homePageStyles.stepCard}
                                >
                                    <div className={homePageStyles.stepIcon}>
                                        <Icon
                                            size={21}
                                            strokeWidth={2}
                                            aria-hidden="true"
                                        />
                                    </div>

                                    <div className={homePageStyles.stepContent}>
                                        <div className={homePageStyles.stepTitleRow}>
                                            <span className={homePageStyles.stepNumber}>
                                                {step.id}
                                            </span>

                                            <h3 className={homePageStyles.stepTitle}>
                                                {step.title}
                                            </h3>
                                        </div>

                                        <p className={homePageStyles.stepDescription}>
                                            {step.description}
                                        </p>
                                    </div>
                                </article>
                            );
                        })}
                    </div>
                </section>

                <section className={homePageStyles.featureSection}>
                    <div className={homePageStyles.featureCard}>
                        <div className={homePageStyles.featureIcon}>
                            <MapPin
                                size={22}
                                strokeWidth={2}
                                aria-hidden="true"
                            />
                        </div>

                        <div>
                            <strong className={homePageStyles.featureTitle}>
                                내 주변 맛집까지 한 번에
                            </strong>

                            <p className={homePageStyles.featureDescription}>
                                추천 메뉴를 정한 뒤 현재 위치 주변의 맛집도 바로 찾아볼 수 있어요.
                            </p>
                        </div>
                    </div>

                    <div className={homePageStyles.featureCard}>
                        <div className={homePageStyles.featureIcon}>
                            <UsersRound
                                size={22}
                                strokeWidth={2}
                                aria-hidden="true"
                            />
                        </div>

                        <div>
                            <strong className={homePageStyles.featureTitle}>
                                함께 고르는 메뉴
                            </strong>

                            <p className={homePageStyles.featureDescription}>
                                회원가입하면 친구들과 취향을 모아 그룹 메뉴 추천도 받을 수 있어요.
                            </p>
                        </div>
                    </div>
                </section>

                <section className={homePageStyles.signupSection}>
                    <div>
                        <h2 className={homePageStyles.signupTitle}>
                            Matchuri를 더 편리하게 이용해보세요
                        </h2>

                        <p className={homePageStyles.signupDescription}>
                            가입하면 취향과 추천 기록을 관리하고
                            <br />
                            그룹 메뉴 추천도 이용할 수 있어요.
                        </p>
                    </div>

                    <Link
                        href="/signup"
                        className={homePageStyles.signupButton}
                    >
                        회원가입
                    </Link>

                    <p className={homePageStyles.loginGuide}>
                        이미 계정이 있나요?{" "}
                        <Link
                            href="/login"
                            className={homePageStyles.loginLink}
                        >
                            로그인
                        </Link>
                    </p>
                </section>
            </div>
        </main>
    );
}