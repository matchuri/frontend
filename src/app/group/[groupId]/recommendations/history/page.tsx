"use client";

import { ArrowLeft } from "lucide-react";
import { useAtomValue } from "jotai";
import { useParams, useRouter } from "next/navigation";

import { DEFAULT_MAP_LEVEL } from "@/features/map/domain/config/mapPolicy";

import { useGroupDetail } from "@/features/group/application/hooks/useGroupDetail";
import { useGroupRecommendationHistories } from "@/features/groupRecommendation/application/hooks/useGroupRecommendationHistories";

import type { GroupRecommendationHistory as GroupRecommendationHistoryItem } from "@/features/groupRecommendation/domain/model/GroupRecommendationHistory";

import {
    groupDetailAtomValue,
    isGroupDetailLoadingAtom,
    groupDetailErrorMessageAtom,
} from "@/features/group/application/selectors/groupDetailSelectors";

import GroupRecommendationHistory from "@/features/group/ui/components/GroupRecommendationHistory";
import AuthRequiredGuard from "@/features/routeGuard/ui/components/AuthRequiredGuard";

import { groupRecommendationHistoryPageStyles } from "@/ui/styles/groupRecommendationHistoryPageStyles";

export default function GroupRecommendationHistoryPage() {
    return (
        <AuthRequiredGuard>
            <GroupRecommendationHistoryPageContent />
        </AuthRequiredGuard>
    );
}

function GroupRecommendationHistoryPageContent() {
    const params = useParams<{ groupId: string }>();
    const router = useRouter();

    const groupId = Number(params.groupId);

    const groupDetail = useAtomValue(groupDetailAtomValue);
    const isGroupDetailLoading = useAtomValue(isGroupDetailLoadingAtom);
    const groupDetailErrorMessage = useAtomValue(groupDetailErrorMessageAtom);

    useGroupDetail(groupId);

    const {
        histories,
        isLoading,
        errorMessage,
    } = useGroupRecommendationHistories(groupId);

    const handleClickBack = () => {
        router.push(`/group/${groupId}`);
    };

    const handleClickHistory = (
        history: GroupRecommendationHistoryItem,
    ) => {
        if (!groupDetail?.location.address) {
            alert("그룹 위치 정보를 확인할 수 없습니다.");
            return;
        }

        const searchParams = new URLSearchParams({
            menuName: history.menuName,
            latitude: String(groupDetail.location.latitude),
            longitude: String(groupDetail.location.longitude),
            address: groupDetail.location.address,
            radiusMeters: String(groupDetail.location.radiusMeters),
            level: String(DEFAULT_MAP_LEVEL),
            source: "group",
            groupId: String(groupId),
        });

        router.push(`/recommendation-restaurants?${searchParams.toString()}`);
    };

    if (isGroupDetailLoading || isLoading) {
        return (
            <main className={groupRecommendationHistoryPageStyles.stateContainer}>
                <p className={groupRecommendationHistoryPageStyles.stateText}>
                    그룹 추천 결과 기록을 불러오는 중입니다.
                </p>
            </main>
        );
    }

    if (groupDetailErrorMessage || errorMessage) {
        return (
            <main className={groupRecommendationHistoryPageStyles.stateContainer}>
                <p className={groupRecommendationHistoryPageStyles.errorText}>
                    {groupDetailErrorMessage ?? errorMessage}
                </p>
            </main>
        );
    }

    if (!groupDetail) {
        return null;
    }

    return (
        <main className={groupRecommendationHistoryPageStyles.page}>
            <header className={groupRecommendationHistoryPageStyles.header}>
                <button
                    type="button"
                    onClick={handleClickBack}
                    className={groupRecommendationHistoryPageStyles.backButton}
                    aria-label="그룹 상세로 돌아가기"
                >
                    <ArrowLeft
                        size={22}
                        aria-hidden="true"
                    />
                </button>

                <h1 className={groupRecommendationHistoryPageStyles.title}>
                    그룹 추천 결과 기록
                </h1>

                <div
                    className={groupRecommendationHistoryPageStyles.headerSpacer}
                    aria-hidden="true"
                />
            </header>

            <div className={groupRecommendationHistoryPageStyles.content}>
                <GroupRecommendationHistory
                    histories={histories}
                    isLoading={false}
                    errorMessage={null}
                    showHeader={false}
                    onClickHistory={handleClickHistory}
                />
            </div>
        </main>
    );
}