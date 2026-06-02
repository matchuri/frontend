import GroupCreateButton from "@/features/group/ui/components/GroupCreateButton";
import { groupManagementPageStyles } from "@/ui/styles/groupManagementPageStyles";

interface GroupManagementHeaderProps {
    readonly onClickCreate: () => void;
}

export default function GroupManagementHeader({
    onClickCreate,
}: GroupManagementHeaderProps) {
    return (
        <header className={groupManagementPageStyles.header}>
            <div>
                <h1 className={groupManagementPageStyles.title}>
                    그룹 관리
                </h1>

                <p className={groupManagementPageStyles.description}>
                    그룹원과 함께 메뉴를 조율하고, 투표하고, 맛집을 탐색해 보세요.
                </p>
            </div>

            <GroupCreateButton onClick={onClickCreate} />
        </header>
    );
}