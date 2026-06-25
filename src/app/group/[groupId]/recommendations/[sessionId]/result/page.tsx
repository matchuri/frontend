"use client";

import { useState } from "react";
import { useAtomValue } from "jotai";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import { useGroupRecommendationSessionDetail } from "@/features/groupRecommendation/application/hooks/useGroupRecommendationSessionDetail";
import { useVoteGroupRecommendationCandidate } from "@/features/groupRecommendation/application/hooks/useVoteGroupRecommendationCandidate";
import {
    groupRecommendationSessionDetailAtomValue,
    isGroupRecommendationSessionDetailLoadingAtom,
    groupRecommendationSessionDetailErrorMessageAtom,
} from "@/features/groupRecommendation/application/selectors/groupRecommendationSessionDetailSelectors";

import GroupRecommendationResultVoteStatusCard from "@/features/groupRecommendation/ui/components/GroupRecommendationResultVoteStatusCard";
import GroupRecommendationResultMemberList from "@/features/groupRecommendation/ui/components/GroupRecommendationResultMemberList";
import GroupRecommendationResultCandidateCard from "@/features/groupRecommendation/ui/components/GroupRecommendationResultCandidateCard";

import { mockGroupRecommendationResult } from "@/features/groupRecommendation/ui/mock/mockGroupRecommendationResult";

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

    // refetchSessionDetail을 받아 투표 성공 후 최신 결과를 다시 조회
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

    // 투표하기 버튼 클릭 시 투표 API 호출
    const handleClickVote = async (candidateId: number) => {
        if (isVoteClosed || sessionDetail?.status === "FINALIZED") {
            return;
        }

        try {
            await vote(groupId, sessionId, candidateId);

            // 투표 성공 후 선택된 후보 UI 표시
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

    const selectedCandidate = sessionDetail.candidates.find(
        (candidate) => candidate.candidateId === selectedCandidateId,
    );

    const votedMemberCount = sessionDetail.voteProgress?.votedMemberCount ?? 0;

    const totalMemberCount =
        sessionDetail.voteProgress?.totalMemberCount ?? 0;

    const candidates = sessionDetail.candidates.map((candidate) => ({
        ...candidate,
        selected: candidate.candidateId === selectedCandidateId,
    }));

    const members = mockGroupRecommendationResult.members.map((member) =>
        member.isMe && selectedCandidate
            ? {
                  ...member,
                  voted: true,
              }
            : member,
    );

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
                        isOwner={mockGroupRecommendationResult.isOwner}
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

                            // 투표 요청 중이면 버튼 비활성화 및 문구 변경
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