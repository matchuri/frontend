"use client";

import { ArrowLeft } from "lucide-react";

import Skeleton from "@/ui/components/Skeleton";

import { groupRecommendationFlowSkeletonStyles } from "@/ui/styles/groupRecommendationFlowSkeletonStyles";

interface GroupRecommendationFlowSkeletonProps {
    readonly variant: "PREPARATION" | "RESULT" | "VOTE_RESULT";
    readonly onClickBack: () => void;
}

export default function GroupRecommendationFlowSkeleton({
    variant,
    onClickBack,
}: GroupRecommendationFlowSkeletonProps) {
    const title = variant === "PREPARATION"
        ? "그룹 메뉴 추천"
        : variant === "RESULT"
            ? "그룹 메뉴 추천 결과"
            : "투표 결과";

    return (
        <main
            className={groupRecommendationFlowSkeletonStyles.container}
            aria-busy="true"
            aria-label={`${title} 정보를 불러오는 중`}
        >
            <header className={groupRecommendationFlowSkeletonStyles.header}>
                <button
                    type="button"
                    onClick={onClickBack}
                    className={groupRecommendationFlowSkeletonStyles.backButton}
                    aria-label="그룹 상세 페이지로 돌아가기"
                >
                    <ArrowLeft size={22} aria-hidden="true" />
                </button>

                <h1 className={groupRecommendationFlowSkeletonStyles.headerTitle}>
                    {title}
                </h1>

                <div className={groupRecommendationFlowSkeletonStyles.headerSpacer} aria-hidden="true" />
            </header>

            {variant === "PREPARATION" && <PreparationSkeleton />}
            {variant === "RESULT" && <ResultSkeleton />}
            {variant === "VOTE_RESULT" && <VoteResultSkeleton />}
        </main>
    );
}

function PreparationSkeleton() {
    return (
        <>
            <div className={groupRecommendationFlowSkeletonStyles.preparationContent}>
                <section className={groupRecommendationFlowSkeletonStyles.infoCard}>
                    <Skeleton className={groupRecommendationFlowSkeletonStyles.infoLabel} />
                    <Skeleton className={groupRecommendationFlowSkeletonStyles.infoTitle} />

                    <div className={groupRecommendationFlowSkeletonStyles.infoLocationRow}>
                        <Skeleton className={groupRecommendationFlowSkeletonStyles.infoAddress} />
                        <Skeleton className={groupRecommendationFlowSkeletonStyles.infoRadius} />
                    </div>
                </section>

                <section className={groupRecommendationFlowSkeletonStyles.statusCard}>
                    <div className={groupRecommendationFlowSkeletonStyles.statusHeader}>
                        <Skeleton className={groupRecommendationFlowSkeletonStyles.statusTitle} />
                        <Skeleton className={groupRecommendationFlowSkeletonStyles.statusCount} />
                    </div>

                    <Skeleton className={groupRecommendationFlowSkeletonStyles.progressTrack} />
                    <Skeleton className={groupRecommendationFlowSkeletonStyles.statusDescription} />
                </section>

                <section className={groupRecommendationFlowSkeletonStyles.memberSection}>
                    <div className={groupRecommendationFlowSkeletonStyles.sectionHeader}>
                        <Skeleton className={groupRecommendationFlowSkeletonStyles.sectionTitle} />
                        <Skeleton className={groupRecommendationFlowSkeletonStyles.sectionCount} />
                    </div>

                    <div className={groupRecommendationFlowSkeletonStyles.preparationMemberList}>
                        {Array.from({ length: 4 }).map((_, index) => (
                            <div
                                key={index}
                                className={groupRecommendationFlowSkeletonStyles.preparationMemberCard}
                            >
                                <div className={groupRecommendationFlowSkeletonStyles.memberInfo}>
                                    <Skeleton className={groupRecommendationFlowSkeletonStyles.memberAvatar} />
                                    <Skeleton className={groupRecommendationFlowSkeletonStyles.memberName} />
                                </div>

                                <Skeleton className={groupRecommendationFlowSkeletonStyles.memberBadge} />
                            </div>
                        ))}
                    </div>
                </section>
            </div>

            <div className={groupRecommendationFlowSkeletonStyles.preparationBottomActions}>
                <Skeleton className={groupRecommendationFlowSkeletonStyles.bottomButton} />
                <Skeleton className={groupRecommendationFlowSkeletonStyles.bottomButton} />
            </div>
        </>
    );
}

function ResultSkeleton() {
    return (
        <>
            <div className={groupRecommendationFlowSkeletonStyles.resultContent}>
                <section className={groupRecommendationFlowSkeletonStyles.statusCard}>
                    <div className={groupRecommendationFlowSkeletonStyles.statusHeader}>
                        <Skeleton className={groupRecommendationFlowSkeletonStyles.statusTitle} />
                        <Skeleton className={groupRecommendationFlowSkeletonStyles.statusCount} />
                    </div>

                    <Skeleton className={groupRecommendationFlowSkeletonStyles.progressTrack} />
                    <Skeleton className={groupRecommendationFlowSkeletonStyles.statusDescription} />
                </section>

                <section className={groupRecommendationFlowSkeletonStyles.memberSection}>
                    <div className={groupRecommendationFlowSkeletonStyles.sectionHeader}>
                        <Skeleton className={groupRecommendationFlowSkeletonStyles.sectionTitle} />
                        <Skeleton className={groupRecommendationFlowSkeletonStyles.sectionCount} />
                    </div>

                    <div className={groupRecommendationFlowSkeletonStyles.resultMemberList}>
                        {Array.from({ length: 4 }).map((_, index) => (
                            <div
                                key={index}
                                className={groupRecommendationFlowSkeletonStyles.resultMemberItem}
                            >
                                <Skeleton className={groupRecommendationFlowSkeletonStyles.resultMemberAvatar} />
                                <Skeleton className={groupRecommendationFlowSkeletonStyles.resultMemberName} />
                                <Skeleton className={groupRecommendationFlowSkeletonStyles.resultMemberStatus} />
                            </div>
                        ))}
                    </div>
                </section>

                <section className={groupRecommendationFlowSkeletonStyles.tasteSummary}>
                    <Skeleton className={groupRecommendationFlowSkeletonStyles.tasteSummaryTitle} />

                    <div className={groupRecommendationFlowSkeletonStyles.tasteChipList}>
                        <Skeleton className={groupRecommendationFlowSkeletonStyles.tasteChip} />
                        <Skeleton className={groupRecommendationFlowSkeletonStyles.tasteChip} />
                        <Skeleton className={groupRecommendationFlowSkeletonStyles.tasteChipSmall} />
                    </div>
                </section>

                <section className={groupRecommendationFlowSkeletonStyles.resultSection}>
                    <div className={groupRecommendationFlowSkeletonStyles.resultHeader}>
                        <div>
                            <Skeleton className={groupRecommendationFlowSkeletonStyles.resultEyebrow} />
                            <Skeleton className={groupRecommendationFlowSkeletonStyles.resultTitle} />
                        </div>

                        <Skeleton className={groupRecommendationFlowSkeletonStyles.selectionGuide} />
                    </div>

                    <div className={groupRecommendationFlowSkeletonStyles.candidateGrid}>
                        {Array.from({ length: 3 }).map((_, index) => (
                            <div
                                key={index}
                                className={groupRecommendationFlowSkeletonStyles.candidateCard}
                            >
                                <Skeleton className={groupRecommendationFlowSkeletonStyles.candidateImage} />

                                <div className={groupRecommendationFlowSkeletonStyles.candidateBody}>
                                    <Skeleton className={groupRecommendationFlowSkeletonStyles.candidateName} />
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </div>

            <div className={groupRecommendationFlowSkeletonStyles.resultBottomAction}>
                <Skeleton className={groupRecommendationFlowSkeletonStyles.resultBottomButton} />
            </div>
        </>
    );
}

function VoteResultSkeleton() {
    return (
        <div className={groupRecommendationFlowSkeletonStyles.voteResultContent}>
            <section className={groupRecommendationFlowSkeletonStyles.tasteSummary}>
                <Skeleton className={groupRecommendationFlowSkeletonStyles.tasteSummaryTitle} />

                <div className={groupRecommendationFlowSkeletonStyles.tasteChipList}>
                    <Skeleton className={groupRecommendationFlowSkeletonStyles.tasteChip} />
                    <Skeleton className={groupRecommendationFlowSkeletonStyles.tasteChip} />
                    <Skeleton className={groupRecommendationFlowSkeletonStyles.tasteChipSmall} />
                </div>
            </section>

            <section className={groupRecommendationFlowSkeletonStyles.voteResultRestaurantSection}>
                <div className={groupRecommendationFlowSkeletonStyles.voteResultRestaurantHeader}>
                    <div>
                        <Skeleton className={groupRecommendationFlowSkeletonStyles.voteResultEyebrow} />
                        <Skeleton className={groupRecommendationFlowSkeletonStyles.voteResultMenuName} />
                    </div>

                    <Skeleton className={groupRecommendationFlowSkeletonStyles.voteResultLocationButton} />
                </div>

                <Skeleton className={groupRecommendationFlowSkeletonStyles.voteResultMap} />

                <div className={groupRecommendationFlowSkeletonStyles.voteResultRestaurantList}>
                    {Array.from({ length: 2 }).map((_, index) => (
                        <div
                            key={index}
                            className={groupRecommendationFlowSkeletonStyles.voteResultRestaurantCard}
                        >
                            <Skeleton className={groupRecommendationFlowSkeletonStyles.voteResultRestaurantName} />
                            <Skeleton className={groupRecommendationFlowSkeletonStyles.voteResultRestaurantMeta} />
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}