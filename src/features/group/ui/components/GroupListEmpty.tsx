import { UsersRound } from "lucide-react";

import { groupManagementPageStyles } from "@/ui/styles/groupManagementPageStyles";

export default function GroupListEmpty() {
    return (
        <div className={groupManagementPageStyles.emptyGroupBox}>
            <div className={groupManagementPageStyles.emptyIcon}>
                <UsersRound size={28} strokeWidth={1.8} aria-hidden="true" />
            </div>

            <h3 className={groupManagementPageStyles.emptyTitle}>
                아직 참여 중인 그룹이 없어요
            </h3>

            <p className={groupManagementPageStyles.emptyDescription}>
                그룹을 만들고 그룹원들과 함께 오늘의 메뉴를 골라보세요.
            </p>
        </div>
    );
}