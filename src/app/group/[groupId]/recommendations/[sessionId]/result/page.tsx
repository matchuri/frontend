"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

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

    const [selectedCandidateId, setSelectedCandidateId] =
        useState<number | null>(null);

    const [isVoteClosed, setIsVoteClosed] = useState(
        mockGroupRecommendationResult.status === "FINALIZED",
    );

    const selectedCandidate = mockGroupRecommendationResult.candidates.find(
        (candidate) => candidate.candidateId === selectedCandidateId,
    );

    const votedMemberCount = selectedCandidate
        ? mockGroupRecommendationResult.voteProgress.votedMemberCount + 1
        : mockGroupRecommendationResult.voteProgress.votedMemberCount;

    const candidates = mockGroupRecommendationResult.candidates.map(
        (candidate) => ({
            ...candidate,
            selected: candidate.candidateId === selectedCandidateId,
        }),
    );

    const members = mockGroupRecommendationResult.members.map((member) =>
        member.isMe && selectedCandidate
            ? {
                  ...member,
                  voted: true,
              }
            : member,
    );

    const handleClickBack = () => {
        router.push(`/group?selectedGroupId=${groupId}`);
    };

    const handleClickVote = (candidateId: number) => {
        if (isVoteClosed) return;

        setSelectedCandidateId(candidateId);
    };

    const handleClickCloseVote = () => {
        setIsVoteClosed(true);
    };

    const handleClickMoveVoteResult = () => {
        alert("투표 결과 화면 구현 예정");
    };

    return (
        <main className={groupRecommendationResultPageStyles.container}>
            <div className={groupRecommendationResultPageStyles.content}>
                <button
                    type="button"
                    onClick={handleClickBack}
                    className={groupRecommendationResultPageStyles.backButton}
                >
                    <ArrowLeft size={28} />
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
                        totalMemberCount={
                            mockGroupRecommendationResult.voteProgress
                                .totalMemberCount
                        }
                        votedMemberCount={votedMemberCount}
                        isOwner={mockGroupRecommendationResult.isOwner}
                        isVoteClosed={isVoteClosed}
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
                            isVoteClosed={isVoteClosed}
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