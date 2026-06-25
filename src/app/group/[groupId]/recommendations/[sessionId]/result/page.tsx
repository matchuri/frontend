"use client";

import { useState } from "react";
import { useAtomValue } from "jotai";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import { useGroupDetail } from "@/features/group/application/hooks/useGroupDetail";
import { isGroupOwnerAtom } from "@/features/group/application/selectors/groupDetailSelectors";

import { useGroupRecommendationSessionDetail } from "@/features/groupRecommendation/application/hooks/useGroupRecommendationSessionDetail";
import { useGroupRecommendationReadiness } from "@/features/groupRecommendation/application/hooks/useGroupRecommendationReadiness";
import { useVoteGroupRecommendationCandidate } from "@/features/groupRecommendation/application/hooks/useVoteGroupRecommendationCandidate";
import {
    groupRecommendationSessionDetailAtomValue,
    isGroupRecommendationSessionDetailLoadingAtom,
    groupRecommendationSessionDetailErrorMessageAtom,
} from "@/features/groupRecommendation/application/selectors/groupRecommendationSessionDetailSelectors";
import { groupRecommendationReadinessAtomValue } from "@/features/groupRecommendation/application/selectors/groupRecommendationReadinessSelectors";
import { memberAtom } from "@/features/auth/application/selectors/authSelectors";

import GroupRecommendationResultVoteStatusCard from "@/features/groupRecommendation/ui/components/GroupRecommendationResultVoteStatusCard";
import GroupRecommendationResultMemberList from "@/features/groupRecommendation/ui/components/GroupRecommendationResultMemberList";
import GroupRecommendationResultCandidateCard from "@/features/groupRecommendation/ui/components/GroupRecommendationResultCandidateCard";

import { groupRecommendationResultPageStyles } from "@/ui/styles/groupRecommendationResultPageStyles";

export default function GroupRecommendationResultPage() {
    const params = useParams<{
        groupId: string;
        sessionId: string;
    }>();

    const router = useRouter();

    const groupId = Number(params.groupId);
    const sessionId = Number(params.sessionId);

    const [selectedCandidateId, setSelectedCandidateId] =
        useState<number | null>(null);

    const [isVoteClosed, setIsVoteClosed] = useState(false);

    const member = useAtomValue(memberAtom);

    // 새로고침/직접 진입 시에도 방장 여부를 알 수 있도록 그룹 상세 조회
    useGroupDetail(groupId);

    // 그룹 상세 조회 결과를 기반으로 방장 여부 판단
    const isOwner = useAtomValue(isGroupOwnerAtom);

    // TODO: 나중에 확인 필요
    // 결과 화면에서도 멤버 목록 확보를 위해 준비 상태 조회 (다른 api에서는 멤버 정보를 주는 게 없기 때문)
    useGroupRecommendationReadiness(groupId, sessionId);

    const readiness = useAtomValue(groupRecommendationReadinessAtomValue);

    const { refetchSessionDetail } = useGroupRecommendationSessionDetail(
        groupId,
        sessionId,
    );

    const { isVoting, vote } = useVoteGroupRecommendationCandidate({
        onSuccess: async () => {
            await refetchSessionDetail({
                showLoading: false,
            });
        },
    });

    const sessionDetail = useAtomValue(
        groupRecommendationSessionDetailAtomValue,
    );
    const isSessionDetailLoading = useAtomValue(
        isGroupRecommendationSessionDetailLoadingAtom,
    );
    const sessionDetailErrorMessage = useAtomValue(
        groupRecommendationSessionDetailErrorMessageAtom,
    );

    const handleClickBack = () => {
        router.push(`/group?selectedGroupId=${groupId}`);
    };

    const handleClickVote = async (candidateId: number) => {
        if (isVoteClosed || sessionDetail?.status === "FINALIZED") {
            return;
        }

        try {
            await vote(groupId, sessionId, candidateId);
            setSelectedCandidateId(candidateId);
        } catch {
            alert("투표에 실패했습니다.");
        }
    };

    const handleClickCloseVote = () => {
        setIsVoteClosed(true);
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

    if (!sessionDetail) {
        return null;
    }

    if (sessionDetail.status === "PREPARING") {
        return (
            <main className={groupRecommendationResultPageStyles.container}>
                <div className={groupRecommendationResultPageStyles.content}>
                    <button
                        type="button"
                        onClick={handleClickBack}
                        className={groupRecommendationResultPageStyles.backButton}
                    >
                        <ArrowLeft size={30} strokeWidth={2.5} />
                    </button>

                    <h1 className={groupRecommendationResultPageStyles.title}>
                        아직 추천 후보를 생성하는 중입니다.
                    </h1>
                </div>
            </main>
        );
    }

    const isFinalized =
        sessionDetail.status === "FINALIZED" || isVoteClosed;

    const votedMemberCount = sessionDetail.voteProgress?.votedMemberCount ?? 0;

    const totalMemberCount =
        sessionDetail.voteProgress?.totalMemberCount ?? 0;

    const candidates = sessionDetail.candidates.map((candidate) => ({
        ...candidate,
        selected: candidate.candidateId === selectedCandidateId,
    }));

    const members =
        readiness?.members.map((readinessMember) => {
            const isMe = member?.id === readinessMember.memberId;

            return {
                memberId: readinessMember.memberId,
                nickname: readinessMember.nickname,
                isMe,
                voted: isMe && selectedCandidateId !== null,
            };
        }) ?? [];

    return (
        <main className={groupRecommendationResultPageStyles.container}>
            <div className={groupRecommendationResultPageStyles.content}>
                <button
                    type="button"
                    onClick={handleClickBack}
                    className={groupRecommendationResultPageStyles.backButton}
                >
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
                            onClickVote={() =>
                                handleClickVote(candidate.candidateId)
                            }
                        />
                    ))}
                </section>
            </div>
        </main>
    );
}