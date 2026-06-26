"use client";

import { useGroupRealtimeEvents } from "@/features/group/application/hooks/useGroupRealtimeEvents";

interface UseGroupRecommendationRealtimeEventsProps {
    readonly accessToken: string | null;
    readonly groupId: number;
    readonly sessionId: number;
}

export function useGroupRecommendationRealtimeEvents({
    accessToken,
    groupId,
}: UseGroupRecommendationRealtimeEventsProps) {
    // TODO: 아직그룹 추천 화면에서도 동일한 그룹 SSE를 연결하는 역할만 수행
    // GROUP_RECOMMENDATION_STARTED
    // GROUP_RECOMMENDATION_OPENED
    // GROUP_RECOMMENDATION_VOTE_UPDATED
    // GROUP_RECOMMENDATION_FINALIZED
    // 이벤트를 여기서 atom 업데이트 및 화면 이동으로 처리

    useGroupRealtimeEvents({
        accessToken,
        groupId,
    });
}