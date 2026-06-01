import { Users } from "lucide-react";
import { groupManagementPageStyles } from "@/ui/styles/groupManagementPageStyles";

export default function GroupListEmpty() {
    return (
        <div className={groupManagementPageStyles.emptyGroupBox}>
            <div className="flex flex-col items-center gap-4">
                <Users size={40} className="text-zinc-300" />
                <p>
                    친구와 함께 먹으면 더 맛있어요! 첫 번째 그룹을 만들거나
                    <br />
                    초대 코드를 사용하여 기존 그룹에 참여하세요.
                </p>
            </div>
        </div>
    );
}