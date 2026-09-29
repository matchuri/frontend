"use client";

import { useCallback, useRef, useState } from "react";
import { useAtomValue, useSetAtom } from "jotai";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import { accessTokenAtom } from "@/features/auth/application/selectors/authSelectors";
import {
    groupDetailAtomValue,
    isGroupDetailLoadingAtom,
    groupDetailErrorMessageAtom,
} from "@/features/group/application/selectors/groupDetailSelectors";

import { useMyRealtimeEvents } from "@/features/group/application/hooks/useMyRealtimeEvents";
import { useGroupRealtimeEvents } from "@/features/group/application/hooks/useGroupRealtimeEvents";

import type { GroupRecommendationVoteUpdatedEvent } from "@/features/group/infrastructure/sse/dto/GroupRecommendationVoteUpdatedEvent";
import type { GroupRecommendationVoteCompletedEvent } from "@/features/group/infrastructure/sse/dto/GroupRecommendationVoteCompletedEvent";
import type { GroupRecommendationFinalizedEvent } from "@/features/group/infrastructure/sse/dto/GroupRecommendationFinalizedEvent";

import { groupRecommendationSessionDetailAtom } from "@/features/groupRecommendation/application/atoms/groupRecommendationSessionDetailAtom";

import { useGroupDetail } from "@/features/group/application/hooks/useGroupDetail";
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
import GroupRecommendationResultTasteSummary from "@/features/groupRecommendation/ui/components/GroupRecommendationResultTasteSummary";
import AuthRequiredGuard from "@/features/routeGuard/ui/components/AuthRequiredGuard";

import { groupRecommendationResultPageStyles } from "@/ui/styles/groupRecommendationResultPageStyles";

export default function GroupRecommendationResultPage() {
    return (
        <AuthRequiredGuard>
            <GroupRecommendationResultPageContent />
        </AuthRequiredGuard>
    );
}

function GroupRecommendationResultPageContent() {
    const params = useParams<{ groupId: string; sessionId: string }>();
    const router = useRouter();

    const groupId = Number(params.groupId);
    const sessionId = Number(params.sessionId);
    const accessToken = useAtomValue(accessTokenAtom);
    const groupDetail = useAtomValue(groupDetailAtomValue);
    const isGroupDetailLoading = useAtomValue(isGroupDetailLoadingAtom);
    const groupDetailErrorMessage = useAtomValue(groupDetailErrorMessageAtom);
    const [selectedVote, setSelectedVote] = useState<{ sessionId: number; candidateId: number | null } | null>(null);

    // 중복 VOTE_UPDATED 이벤트 처리 방지용 ref
    const handledVoteUpdatedEventIds = useRef<Set<string>>(new Set());
    // 전원 투표 완료 이벤트 중복 처리 방지
    const handledVoteCompletedEventIds = useRef<Set<string>>(new Set());
    const handledFinalizedEventIds = useRef<Set<string>>(new Set());

    const setSessionDetailState = useSetAtom(groupRecommendationSessionDetailAtom);

    const { refetchGroupDetail } = useGroupDetail(groupId);

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

    // GROUP_RECOMMENDATION_VOTE_UPDATED 이벤트 수신 시 투표 진행률 갱신
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

            // VOTE_UPDATED 이벤트에는 누가 투표했는지 정보가 없기 때문에
            // 멤버별 투표 완료 표시를 갱신하려면 세션 상세를 다시 조회해야 함
            await refetchSessionDetail({
                showLoading: false,
            });

            await refetchGroupDetail({ showLoading: false });
        },
        [
            groupId,
            refetchGroupDetail,
            refetchSessionDetail,
            sessionId,
            setSessionDetailState,
        ],
    );

    const handleRecommendationVoteCompleted = useCallback(
        async (event: GroupRecommendationVoteCompletedEvent) => {
            if (handledVoteCompletedEventIds.current.has(event.eventId)) {
                return;
            }

            handledVoteCompletedEventIds.current.add(event.eventId);

            if (event.groupId !== groupId || event.sessionId !== sessionId) {
                return;
            }

            await refetchSessionDetail({
                showLoading: false,
            });
        },
        [groupId, refetchSessionDetail, sessionId],
    );

    const handleRecommendationFinalized = useCallback(
        async (event: GroupRecommendationFinalizedEvent) => {
            if (handledFinalizedEventIds.current.has(event.eventId)) {
                return;
            }

            handledFinalizedEventIds.current.add(event.eventId);

            if (event.groupId !== groupId || event.sessionId !== sessionId) {
                return;
            }

            setSessionDetailState((prev) => {
                if (prev.status !== "SUCCESS") {
                    return prev;
                }

                const finalCandidate = prev.data.candidates.find(
                    (candidate) =>
                        candidate.candidateId ===
                        event.payload.finalCandidate.candidateId,
                );

                return {
                    status: "SUCCESS",
                    data: {
                        ...prev.data,
                        status: event.payload.status,
                        finalCandidate:
                            finalCandidate ??
                            {
                                candidateId:
                                    event.payload.finalCandidate.candidateId,
                                menuId:
                                    event.payload.finalCandidate.menuItemId,
                                menuName:
                                    event.payload.finalCandidate.menuName,
                                rankNo: 1,
                                score: 0,
                                voteCount: 0,
                                thumbnailUrl:
                                    event.payload.finalCandidate.thumbnailUrl ?? null,
                            },
                    },
                };
            });

            await refetchGroupDetail({ showLoading: false });
        },
        [
            groupId,
            refetchGroupDetail,
            sessionId,
            setSessionDetailState,
        ],
    );

    const handleGroupMembersChanged = useCallback(() => {
        void refetchGroupDetail({ showLoading: false });
        void refetchSessionDetail({ showLoading: false });
    }, [refetchGroupDetail, refetchSessionDetail]);

    useGroupRealtimeEvents({
        accessToken,
        groupId,
        onMemberJoined: handleGroupMembersChanged,
        onMemberLeft: handleGroupMembersChanged,
        onRecommendationVoteUpdated: handleRecommendationVoteUpdated,
        onRecommendationFinalized: handleRecommendationFinalized,
    });

    useMyRealtimeEvents({
        accessToken,
        onRecommendationVoteCompleted:
            handleRecommendationVoteCompleted,
    });

    const handleClickBack = () => {
        router.push(`/group/${groupId}`);
    };

    const handleClickCloseVote = async () => {
        if (!groupDetail) {
            alert("그룹 위치 정보를 불러오는 중입니다.");
            return;
        }

        try {
            await finalize(
                groupId,
                sessionId,
                groupDetail.location,
            );
            router.push(`/group/${groupId}/recommendations/${sessionId}/vote-result`);
        } catch {
            alert("투표 종료에 실패했습니다.");
        }
    };

    const handleClickMoveVoteResult = () => {
        router.push(`/group/${groupId}/recommendations/${sessionId}/vote-result`);
    };

    if (sessionDetailErrorMessage || groupDetailErrorMessage) {
        return (
            <main className={groupRecommendationResultPageStyles.stateContainer}>
                <p className={groupRecommendationResultPageStyles.errorText}>
                    {sessionDetailErrorMessage ?? groupDetailErrorMessage}
                </p>
                <button
                    type="button"
                    onClick={() => {
                        void refetchSessionDetail();
                        void refetchGroupDetail();
                    }}
                    className={groupRecommendationResultPageStyles.retryButton}
                >
                    다시 시도
                </button>
            </main>
        );
    }

    if (isSessionDetailLoading || isGroupDetailLoading || sessionDetail?.sessionId !== sessionId) {
        return (
            <main className={groupRecommendationResultPageStyles.stateContainer}>
                <p className={groupRecommendationResultPageStyles.stateText}>
                    그룹 추천 결과를 불러오는 중...
                </p>
            </main>
        );
    }

    if (!sessionDetail) return null;

    const myVote = sessionDetail.memberVotes.find((memberVote) => memberVote.isMe);
    const selectedCandidateId = selectedVote?.sessionId === sessionId
        ? selectedVote.candidateId
        : myVote?.candidateId ?? null;
    const hasVoted = myVote?.voted ?? false;
    const isVoteUnchanged = hasVoted && selectedCandidateId === myVote?.candidateId;
    const isVoteDisabled = selectedCandidateId === null || isVoting || isVoteUnchanged;

    const handleClickSelectCandidate = (candidateId: number) => {
        setSelectedVote({
            sessionId,
            candidateId: selectedCandidateId === candidateId ? null : candidateId,
        });
    };

    const handleClickVote = async () => {
        if (sessionDetail.status !== "OPEN" || isVoteDisabled) return;

        try {
            await vote(groupId, sessionId, selectedCandidateId);
        } catch {
            alert("투표에 실패했습니다.");
        }
    };

    if (sessionDetail.status === "PREPARING") {
        return (
            <main className={groupRecommendationResultPageStyles.container}>
                <header className={groupRecommendationResultPageStyles.header}>
                    <button
                        type="button" onClick={handleClickBack}
                        className={groupRecommendationResultPageStyles.backButton}
                        aria-label="그룹 상세 페이지로 돌아가기"
                    >
                        <ArrowLeft size={22} aria-hidden="true" />
                    </button>
                    <h1 className={groupRecommendationResultPageStyles.headerTitle}>
                        그룹 메뉴 추천 결과
                    </h1>
                    <div className={groupRecommendationResultPageStyles.headerSpacer} aria-hidden="true" />
                </header>
                <div className={groupRecommendationResultPageStyles.stateContainer}>
                    <p className={groupRecommendationResultPageStyles.stateText}>
                        아직 추천 후보를 생성하는 중입니다.
                    </p>
                </div>
            </main>
        );
    }

    const isFinalized = sessionDetail.status === "FINALIZED";

    const votedMemberCount = sessionDetail.voteProgress?.votedMemberCount ?? 0;
    const totalMemberCount = sessionDetail.voteProgress?.totalMemberCount ?? 0;

    const candidates = sessionDetail.candidates.map((candidate) => ({
        ...candidate,
        selected: candidate.candidateId === selectedCandidateId,
    }));

    const groupMembersById = new Map(
        (groupDetail?.id === groupId ? groupDetail.members : [])
            .filter((groupMember) => groupMember.status === "ACTIVE")
            .map((groupMember) => [groupMember.memberId, groupMember] as const),
    );

    const members = sessionDetail.memberVotes.map((memberVote) => ({
        memberId: memberVote.memberId,
        nickname: groupMembersById.get(memberVote.memberId)?.nickname ?? memberVote.nickname,
        profileImageUrl: groupMembersById.get(memberVote.memberId)?.memberProfileImageUrl ?? null,
        isMe: memberVote.isMe,
        voted: memberVote.voted,
    })).sort((a, b) => {
        if (a.isMe !== b.isMe) return a.isMe ? -1 : 1;
        if (a.voted !== b.voted) return a.voted ? 1 : -1;
        return 0;
    });

    const isOwner = sessionDetail.memberVotes.some(
        (memberVote) => memberVote.isMe && memberVote.role === "OWNER",
    );

    return (
        <main className={groupRecommendationResultPageStyles.container}>
            <header className={groupRecommendationResultPageStyles.header}>
                <button
                    type="button" onClick={handleClickBack}
                    className={groupRecommendationResultPageStyles.backButton}
                    aria-label="그룹 상세 페이지로 돌아가기"
                >
                    <ArrowLeft size={22} aria-hidden="true" />
                </button>
                <h1 className={groupRecommendationResultPageStyles.headerTitle}>
                    그룹 메뉴 추천 결과
                </h1>
                <div className={groupRecommendationResultPageStyles.headerSpacer} aria-hidden="true" />
            </header>

            <div className={`${groupRecommendationResultPageStyles.content} ${!isFinalized ? groupRecommendationResultPageStyles.contentWithVoteAction : ""}`}>
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

                <GroupRecommendationResultTasteSummary
                    categories={sessionDetail.recommendationCategories}
                />

                <section className={groupRecommendationResultPageStyles.resultSection}>
                    <div className={groupRecommendationResultPageStyles.resultHeader}>
                        <div>
                            <span className={groupRecommendationResultPageStyles.resultEyebrow}>
                                MATCHURI PICK
                            </span>
                            <h2 className={groupRecommendationResultPageStyles.resultTitle}>
                                추천 메뉴
                            </h2>
                        </div>
                        <span className={groupRecommendationResultPageStyles.selectionGuide}>
                            {hasVoted ? "변경할 메뉴를 선택해 주세요" : "마음에 드는 메뉴를 선택해 주세요"}
                        </span>
                    </div>

                    <div className={groupRecommendationResultPageStyles.candidateGrid}>
                        {candidates.map((candidate) => (
                            <GroupRecommendationResultCandidateCard
                                key={candidate.candidateId}
                                menuName={candidate.menuName}
                                matchPercent={Math.round(candidate.score)}
                                thumbnailUrl={candidate.thumbnailUrl}
                                selected={candidate.selected}
                                isVoteClosed={isFinalized}
                                onSelect={() => handleClickSelectCandidate(candidate.candidateId)}
                            />
                        ))}
                    </div>
                </section>
            </div>

            {!isFinalized && (
                <div className={groupRecommendationResultPageStyles.bottomAction}>
                    <button
                        type="button"
                        onClick={handleClickVote}
                        disabled={isVoteDisabled}
                        className={groupRecommendationResultPageStyles.voteButton}
                    >
                        {isVoting ? (hasVoted ? "투표 변경 중..." : "투표 중...") : hasVoted ? "투표 변경하기" : "투표하기"}
                    </button>
                </div>
            )}
        </main>
    );
}