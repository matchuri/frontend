"use client";

import { useCallback, useRef } from "react";
import { useAtomValue, useSetAtom } from "jotai";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import { useGroupDetail } from "@/features/group/application/hooks/useGroupDetail";
import { useGroupRealtimeEvents } from "@/features/group/application/hooks/useGroupRealtimeEvents";
import { isGroupOwnerAtom } from "@/features/group/application/selectors/groupDetailSelectors";

import { accessTokenAtom } from "@/features/auth/application/selectors/authSelectors";

import type { GroupRecommendationVoteUpdatedEvent } from "@/features/group/infrastructure/sse/dto/GroupRecommendationVoteUpdatedEvent";

import { groupRecommendationSessionDetailAtom } from "@/features/groupRecommendation/application/atoms/groupRecommendationSessionDetailAtom";
import { useGroupRecommendationSessionDetail } from "@/features/groupRecommendation/application/hooks/useGroupRecommendationSessionDetail";
import { useVoteGroupRecommendationCandidate } from "@/features/groupRecommendation/application/hooks/useVoteGroupRecommendationCandidate";
import { useFinalizeGroupRecommendation } from "@/features/groupRecommendation/application/hooks/useFinalizeGroupRecommendation";

import {
    groupRecommendationSessionDetailAtomValue,
    isGroupRecommendationSessionDetailLoadingAtom,
    groupRecommendationSessionDetailErrorMessageAtom,
} from "@/features/groupRecommendation/application/selectors/groupRecommendationSessionDetailSelectors";

import GroupRecommendationResultVoteStatusCard from "@/features/groupRecommendation/ui/components/GroupRecommendationResultVoteStatusCard";
import GroupRecommendationResultMemberList from "@/features/groupRecommendation/ui/components/GroupRecommendationResultMemberList";
import GroupRecommendationResultCandidateCard from "@/features/groupRecommendation/ui/components/GroupRecommendationResultCandidateCard";

import { groupRecommendationResultPageStyles } from "@/ui/styles/groupRecommendationResultPageStyles";

export default function GroupRecommendationResultPage() {
    const params = useParams<{ groupId: string; sessionId: string }>();
    const router = useRouter();

    const groupId = Number(params.groupId);
    const sessionId = Number(params.sessionId);
    const accessToken = useAtomValue(accessTokenAtom);

    // 중복 VOTE_UPDATED 이벤트 처리 방지용 ref
    const handledVoteUpdatedEventIds = useRef<Set<string>>(new Set());

    const setSessionDetailState = useSetAtom(groupRecommendationSessionDetailAtom);

    const { refetchGroupDetail } = useGroupDetail(groupId);

    const isOwner = useAtomValue(isGroupOwnerAtom);

    const { refetchSessionDetail } = useGroupRecommendationSessionDetail(groupId, sessionId);

    const { isVoting, vote } = useVoteGroupRecommendationCandidate({
        onSuccess: async () => {
            await refetchSessionDetail({ showLoading: false });
        },
    });

    const { isFinalizing, finalize } = useFinalizeGroupRecommendation({
        onSuccess: async () => {
            await refetchSessionDetail({ showLoading: false });
        },
    });

    const sessionDetail = useAtomValue(groupRecommendationSessionDetailAtomValue);
    const isSessionDetailLoading = useAtomValue(isGroupRecommendationSessionDetailLoadingAtom);
    const sessionDetailErrorMessage = useAtomValue(groupRecommendationSessionDetailErrorMessageAtom);

    // OUP_RECOMMENDATION_VOTE_UPDATED 이벤트 수신 시 투표 진행률 갱신
    const handleRecommendationVoteUpdated = useCallback(
        async (event: GroupRecommendationVoteUpdatedEvent) => {
            if (handledVoteUpdatedEventIds.current.has(event.eventId)) {
                return;
            }

            handledVoteUpdatedEventIds.current.add(event.eventId);

            if (event.groupId !== groupId || event.sessionId !== sessionId) {
                return;
            }

            setSessionDetailState((prev) => {
                if (prev.status !== "SUCCESS") {
                    return prev;
                }

                return {
                    status: "SUCCESS",
                    data: {
                        ...prev.data,
                        voteProgress: {
                            totalMemberCount:
                                event.payload.voteProgress.totalMemberCount,
                            votedMemberCount:
                                event.payload.voteProgress.votedMemberCount,
                            allReady: undefined,
                        },
                    },
                };
            });

            //  VOTE_UPDATED 이벤트에는 누가 투표했는지 정보가 없기 때문에
            // 멤버별 투표 완료 표시를 갱신하려면 세션 상세를 다시 조회해야 함
            await refetchSessionDetail({
                showLoading: false,
            });

            await refetchGroupDetail();
        },
        [
            groupId,
            refetchGroupDetail,
            refetchSessionDetail,
            sessionId,
            setSessionDetailState,
        ],
    );

    useGroupRealtimeEvents({
        accessToken,
        groupId,
        onRecommendationVoteUpdated: handleRecommendationVoteUpdated,
    });

    const handleClickBack = () => {
        router.push(`/group?selectedGroupId=${groupId}`);
    };

    const handleClickVote = async (candidateId: number) => {
        if (sessionDetail?.status === "FINALIZED") return;

        try {
            await vote(groupId, sessionId, candidateId);
        } catch {
            alert("투표에 실패했습니다.");
        }
    };

    const handleClickCloseVote = async () => {
        try {
            await finalize(groupId, sessionId);
        } catch {
            alert("투표 종료에 실패했습니다.");
        }
    };

    const handleClickMoveVoteResult = () => {
        alert("투표 결과 상세 화면 구현 예정");
    };

    if (isSessionDetailLoading) {
        return (
            <main className={groupRecommendationResultPageStyles.container}>
                <div className={groupRecommendationResultPageStyles.content}>
                    그룹 추천 결과를 불러오는 중...
                </div>
            </main>
        );
    }

    if (sessionDetailErrorMessage) {
        return (
            <main className={groupRecommendationResultPageStyles.container}>
                <div className={groupRecommendationResultPageStyles.content}>
                    {sessionDetailErrorMessage}
                </div>
            </main>
        );
    }

    if (!sessionDetail) return null;

    if (sessionDetail.status === "PREPARING") {
        return (
            <main className={groupRecommendationResultPageStyles.container}>
                <div className={groupRecommendationResultPageStyles.content}>
                    <button type="button" onClick={handleClickBack} className={groupRecommendationResultPageStyles.backButton}>
                        <ArrowLeft size={30} strokeWidth={2.5} />
                    </button>

                    <h1 className={groupRecommendationResultPageStyles.title}>
                        아직 추천 후보를 생성하는 중입니다.
                    </h1>
                </div>
            </main>
        );
    }

    const isFinalized = sessionDetail.status === "FINALIZED";
    const myVote = sessionDetail.memberVotes.find((memberVote) => memberVote.isMe);
    const selectedCandidateId = myVote?.candidateId ?? null;

    const votedMemberCount = sessionDetail.voteProgress?.votedMemberCount ?? 0;
    const totalMemberCount = sessionDetail.voteProgress?.totalMemberCount ?? 0;

    const candidates = sessionDetail.candidates.map((candidate) => ({
        ...candidate,
        selected: candidate.candidateId === selectedCandidateId,
    }));

    const members = sessionDetail.memberVotes.map((memberVote) => ({
        memberId: memberVote.memberId,
        nickname: memberVote.nickname,
        isMe: memberVote.isMe,
        voted: memberVote.voted,
    }));

    return (
        <main className={groupRecommendationResultPageStyles.container}>
            <div className={groupRecommendationResultPageStyles.content}>
                <button type="button" onClick={handleClickBack} className={groupRecommendationResultPageStyles.backButton}>
                    <ArrowLeft size={30} strokeWidth={2.5} />
                </button>

                <header className={groupRecommendationResultPageStyles.titleSection}>
                    <h1 className={groupRecommendationResultPageStyles.title}>
                        그룹 메뉴 추천 결과
                    </h1>

                    <p className={groupRecommendationResultPageStyles.description}>
                        먹고 싶은 메뉴에 투표하세요.
                    </p>
                </header>

                <div className={groupRecommendationResultPageStyles.topSection}>
                    <GroupRecommendationResultVoteStatusCard
                        totalMemberCount={totalMemberCount}
                        votedMemberCount={votedMemberCount}
                        isOwner={isOwner}
                        isVoteClosed={isFinalized}
                        isFinalizing={isFinalizing}
                        onClickCloseVote={handleClickCloseVote}
                        onClickMoveVoteResult={handleClickMoveVoteResult}
                    />

                    <GroupRecommendationResultMemberList members={members} />
                </div>

                <section className={groupRecommendationResultPageStyles.candidateGrid}>
                    {candidates.map((candidate) => (
                        <GroupRecommendationResultCandidateCard
                            key={candidate.candidateId}
                            menuName={candidate.menuName}
                            matchPercent={Math.round(candidate.score)}
                            selected={candidate.selected}
                            isVoteClosed={isFinalized}
                            isVoting={isVoting}
                            onClickVote={() => handleClickVote(candidate.candidateId)}
                        />
                    ))}
                </section>
            </div>
        </main>
    );
}