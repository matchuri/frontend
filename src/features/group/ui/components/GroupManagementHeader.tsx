import GroupCreateButton from "@/features/group/ui/components/GroupCreateButton";
import { groupManagementPageStyles } from "@/ui/styles/groupManagementPageStyles";

export default function GroupManagementHeader() {
    return (
        <header className={groupManagementPageStyles.header}>
            <div>
                <h1 className={groupManagementPageStyles.title}>그룹 관리</h1>
                <p className={groupManagementPageStyles.description}>
                    그룹원과 함께 메뉴를 조율하고, 투표하고, 탐색해 보세요.
                </p>
            </div>

            <GroupCreateButton />
        </header>
    );
}