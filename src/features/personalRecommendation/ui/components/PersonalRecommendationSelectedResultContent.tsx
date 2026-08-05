"use client";

import { ArrowLeft } from "lucide-react";

import { isLocationRadiusMeters } from "@/features/locationSetting/domain/config/locationRadiusPolicy";
import type { LocationSetting } from "@/features/locationSetting/domain/model/LocationSetting";

import type { RecommendedMenu } from "@/features/personalRecommendation/domain/model/PersonalRecommendation";

import PersonalRecommendationSelectedRestaurantContent from "@/features/personalRecommendation/ui/components/PersonalRecommendationSelectedRestaurantContent";

import { personalRecommendationResultPageStyles } from "@/ui/styles/personalRecommendationResultPageStyles";

interface PersonalRecommendationSelectedResultContentProps {
    readonly selectedCandidate: RecommendedMenu;
    readonly keywords: readonly string[];
    readonly location: LocationSetting | null;
    readonly isLocationLoading: boolean;
    readonly onBack: () => void;
}

export default function PersonalRecommendationSelectedResultContent({
    selectedCandidate,
    keywords,
    location,
    isLocationLoading,
    onBack,
}: PersonalRecommendationSelectedResultContentProps) {
    return (
        <main className={personalRecommendationResultPageStyles.container}>
            <button
                type="button"
                onClick={onBack}
                className={personalRecommendationResultPageStyles.backButton}
            >
                <ArrowLeft size={24} />
            </button>

            <h1 className={personalRecommendationResultPageStyles.title}>
                메뉴 추천 결과
            </h1>

            <section className={personalRecommendationResultPageStyles.summaryCard}>
                <h2 className={personalRecommendationResultPageStyles.summaryTitle}>
                    취향 프로필 요약
                </h2>

                <div className={personalRecommendationResultPageStyles.keywordGroup}>
                    {keywords.length > 0 ? (
                        keywords.map((keyword) => (
                            <span
                                key={keyword}
                                className={
                                    personalRecommendationResultPageStyles.keywordChip
                                }
                            >
                                #{keyword}
                            </span>
                        ))
                    ) : (
                        <span
                            className={
                                personalRecommendationResultPageStyles.emptyText
                            }
                        >
                            표시할 취향 정보가 없습니다.
                        </span>
                    )}
                </div>
            </section>

            <section
                className={
                    personalRecommendationResultPageStyles.selectedMenuSection
                }
            >
                <span
                    className={
                        personalRecommendationResultPageStyles.selectedMenuLabel
                    }
                >
                    선택한 메뉴
                </span>

                <h2
                    className={
                        personalRecommendationResultPageStyles.selectedMenuName
                    }
                >
                    {selectedCandidate.menuName}
                </h2>
            </section>

            {isLocationLoading && (
                <div
                    className={
                        personalRecommendationResultPageStyles.messageBox
                    }
                >
                    위치 정보를 불러오는 중입니다.
                </div>
            )}

            {!isLocationLoading && location === null && (
                <div
                    className={
                        personalRecommendationResultPageStyles.messageBox
                    }
                >
                    설정된 위치가 없어 주변 맛집을 조회할 수 없습니다.
                </div>
            )}

            {!isLocationLoading &&
                location !== null &&
                !isLocationRadiusMeters(location.radiusMeters) && (
                    <div
                        className={
                            personalRecommendationResultPageStyles.errorBox
                        }
                    >
                        저장된 맛집 검색 반경을 사용할 수 없습니다. 개인
                        위치를 다시 설정해주세요.
                    </div>
                )}

            {!isLocationLoading &&
                location !== null &&
                isLocationRadiusMeters(location.radiusMeters) && (
                    <PersonalRecommendationSelectedRestaurantContent
                        menuName={selectedCandidate.menuName}
                        location={location}
                    />
                )}
        </main>
    );
}