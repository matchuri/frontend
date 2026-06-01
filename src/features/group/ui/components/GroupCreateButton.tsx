import { UserPlus } from "lucide-react";
import { groupManagementPageStyles } from "@/ui/styles/groupManagementPageStyles";

export default function GroupCreateButton() {
    return (
        <button type="button" className={groupManagementPageStyles.createButton}>
            <UserPlus size={22} />
            그룹 생성
        </button>
    );
}