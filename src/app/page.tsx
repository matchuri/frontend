"use client";

import Image from "next/image";
import { useRef } from "react";
import { ChefHat, Map, SlidersHorizontal } from "lucide-react";

import { useRootRedirectGuard } from "@/features/routeGuard/application/hooks/useRootRedirectGuard";

import HomeGuideCard from "@/ui/components/HomeGuideCard";

import { homePageStyles } from "@/ui/styles/homePageStyles";

export default function Home() {
    const { shouldShowPublicHome } = useRootRedirectGuard();
    const guideSectionRef = useRef<HTMLElement | null>(null);

    if (!shouldShowPublicHome) {
        return null;
    }

    const handleClickStart = () => {
        alert("로그인이 필요합니다.");
    };

    const handleClickGuide = () => {
        guideSectionRef.current?.scrollIntoView({
            behavior: "smooth",
            block: "start",
        });
    };

    return (
        <main className={homePageStyles.container}>
            <section className={homePageStyles.heroSection}>
                <div className={homePageStyles.heroContent}>
                    <div className={homePageStyles.badge}>
                        <span className={homePageStyles.badgeDot} />
                        오늘의 메뉴 고민 해결사
                    </div>

                    <h1 className={homePageStyles.title}>
                        당신에게 딱 맞는
                        <br />
                        <span className={homePageStyles.titleHighlight}>
                            메뉴를 찾아보세요.
                        </span>
                    </h1>

                    <p className={homePageStyles.description}>
                        당신의 취향을 분석하여 오늘 가장 먹고 싶은 메뉴를 추천해 드립니다.
                        <br />
                        혼자서도, 소중한 사람들과도 즐거운 식사를 시작하세요.
                    </p>

                    <div className={homePageStyles.buttonGroup}>
                        <button
                            type="button"
                            onClick={handleClickStart}
                            className={homePageStyles.startButton}
                        >
                            지금 시작하기
                        </button>

                        <button
                            type="button"
                            onClick={handleClickGuide}
                            className={homePageStyles.guideButton}
                        >
                            사용 방법 보기
                        </button>
                    </div>
                </div>

                <div className={homePageStyles.imageWrapper}>
                    <Image
                        src="/images/food_image.png"
                        alt="메뉴 추천 음식 이미지"
                        fill
                        priority
                        sizes="(max-width: 1024px) 100vw, 45vw"
                        className={homePageStyles.image}
                    />
                </div>
            </section>

            <section
                ref={guideSectionRef}
                className={homePageStyles.guideSection}
            >
                <div className={homePageStyles.guideContent}>
                    <div className={homePageStyles.guideHeader}>
                        <h2 className={homePageStyles.guideTitle}>
                            이렇게 사용하세요
                        </h2>

                        <div className={homePageStyles.guideUnderline} />
                    </div>

                    <div className={homePageStyles.guideGrid}>
                        <HomeGuideCard
                            step="1"
                            title="취향 설정"
                            description={
                                <>
                                    선호하는 맛, 조리방식, 음식 종류 등을
                                    <br />
                                    상세하게 설정하세요.
                                </>
                            }
                            icon={<SlidersHorizontal size={16} />}
                        />

                        <HomeGuideCard
                            step="2"
                            title="메뉴 추천 받기"
                            description={
                                <>
                                    추천된 3가지 메뉴 중
                                    <br />
                                    원하는 메뉴를 선택하세요.
                                </>
                            }
                            icon={<ChefHat size={16} />}
                        />

                        <HomeGuideCard
                            step="3"
                            title="맛집 방문"
                            description={
                                <>
                                    지도에 표시된 주변 맛집을
                                    <br />
                                    확인하고 방문하세요.
                                </>
                            }
                            icon={<Map size={16} />}
                        />
                    </div>
                </div>
            </section>

            <footer className={homePageStyles.footer}>
                <span>© 2026 MenuMatch. All rights reserved.</span>

                <div className={homePageStyles.footerLinks}>
                    <span>Privacy Policy</span>
                    <span>Terms of Service</span>
                    <span>Contact Support</span>
                </div>
            </footer>
        </main>
    );
}