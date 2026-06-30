"use client";

import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { useAtomValue } from "jotai";

import { memberAtom } from "@/features/auth/application/selectors/authSelectors";
import { useHomeGuard } from "@/features/routeGuard/application/hooks/useHomeGuard";

import { homeMemberPageStyles } from "@/ui/styles/homeMemberPageStyles";

export default function HomePage() {
    const router = useRouter();

    const { canAccess } = useHomeGuard();
    const member = useAtomValue(memberAtom);

    if (!canAccess) {
        return null;
    }

    const nickname = member?.nickname ?? "사용자";

    return (
        <main className={homeMemberPageStyles.container}>
            <div className={homeMemberPageStyles.content}>
                <section className={homeMemberPageStyles.titleSection}>
                    <h1 className={homeMemberPageStyles.title}>
                        환영합니다, {nickname}님
                    </h1>

                    <p className={homeMemberPageStyles.description}>
                        오늘은 어떤 맛있는 이야기를 만들어볼까요?
                    </p>
                </section>

                <section className={homeMemberPageStyles.cardList}>
                    <article className={homeMemberPageStyles.card}>
                        <div className={homeMemberPageStyles.cardTextBox}>
                            <h2 className={homeMemberPageStyles.cardTitle}>
                                당신의 완벽한 한 끼를 찾아보세요.
                            </h2>

                            <p className={homeMemberPageStyles.cardDescription}>
                                설정한 취향과 현재 위치를 기반으로 최적화된 미식 경험을 제안합니다.
                                <br />
                                Matchuri의 고도화된 알고리즘이 당신의 입맛을 정확히 저격합니다.
                            </p>
                        </div>

                        <button
                            type="button"
                            onClick={() => router.push("/personal-recommendation")}
                            className={homeMemberPageStyles.actionButton}
                        >
                            개인 메뉴 추천 시작하기
                            <ArrowRight size={20} />
                        </button>
                    </article>

                    <article className={homeMemberPageStyles.card}>
                        <div className={homeMemberPageStyles.cardTextBox}>
                            <h2 className={homeMemberPageStyles.cardTitle}>
                                그룹 메뉴 추천
                            </h2>

                            <p className={homeMemberPageStyles.cardDescription}>
                                모두가 만족할 수 있는 최적의 합의점을 찾아드립니다. 모임원들의 취향을
                                <br />
                                실시간으로 취합하고 조율하여 실패 없는 모임을 만들어보세요.
                            </p>
                        </div>

                        <button
                            type="button"
                            onClick={() => router.push("/group")}
                            className={homeMemberPageStyles.actionButton}
                        >
                            그룹 관리 페이지 이동
                            <ArrowRight size={20} />
                        </button>
                    </article>
                </section>
            </div>
        </main>
    );
}