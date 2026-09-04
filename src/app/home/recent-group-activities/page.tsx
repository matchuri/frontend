"use client";

import { ArrowLeft } from "lucide-react";
import { useAtomValue } from "jotai";
import { useRouter } from "next/navigation";

import { useHomeGuard } from "@/features/routeGuard/application/hooks/useHomeGuard";
import { useHomeData } from "@/features/home/application/hooks/useHomeData";

import {
    homeDataAtom,
    homeErrorMessageAtom,
    isHomeLoadingAtom,
} from "@/features/home/application/selectors/homeSelectors";

import HomeRecentGroupActivity from "@/features/home/ui/components/HomeRecentGroupActivity";

import { homeMemberPageStyles } from "@/ui/styles/homeMemberPageStyles";

export default function RecentGroupActivitiesPage() {
    const router = useRouter();

    const { canAccess } = useHomeGuard();
    const { refetchHome } = useHomeData(canAccess);

    const homeData = useAtomValue(homeDataAtom);
    const isHomeLoading = useAtomValue(isHomeLoadingAtom);
    const homeErrorMessage = useAtomValue(homeErrorMessageAtom);

    if (!canAccess) {
        return null;
    }

    if (isHomeLoading && !homeData) {
        return (
            <main className={homeMemberPageStyles.stateContainer}>
                <p className={homeMemberPageStyles.stateText}>
                    최근 그룹 활동을 불러오는 중입니다.
                </p>
            </main>
        );
    }

    if (homeErrorMessage && !homeData) {
        return (
            <main className={homeMemberPageStyles.stateContainer}>
                <p className={homeMemberPageStyles.errorText}>
                    {homeErrorMessage}
                </p>

                <button
                    type="button"
                    onClick={() => void refetchHome()}
                    className={homeMemberPageStyles.retryButton}
                >
                    다시 시도
                </button>
            </main>
        );
    }

    if (!homeData) {
        return null;
    }

    const handleClickBack = () => {
        router.push("/home");
    };

    const handleClickGroup = (groupId: number) => {
        router.push(`/group?selectedGroupId=${groupId}`);
    };

    return (
        <main className={homeMemberPageStyles.activityAllPage}>
            <header className={homeMemberPageStyles.activityAllHeader}>
                <button
                    type="button"
                    onClick={handleClickBack}
                    className={homeMemberPageStyles.activityAllBackButton}
                    aria-label="홈으로 돌아가기"
                >
                    <ArrowLeft
                        size={22}
                        aria-hidden="true"
                    />
                </button>

                <h1 className={homeMemberPageStyles.activityAllTitle}>
                    최근 그룹 활동
                </h1>
            </header>

            <div className={homeMemberPageStyles.activityAllContent}>
                <HomeRecentGroupActivity
                    items={homeData.recentGroupActivities}
                    onClickGroup={handleClickGroup}
                    displayMode="ALL"
                    showTitle={false}
                />
            </div>
        </main>
    );
}