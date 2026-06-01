import { MailCheck } from "lucide-react";
import { groupManagementPageStyles } from "@/ui/styles/groupManagementPageStyles";

export default function GroupInviteEmpty() {
    return (
        <div className={groupManagementPageStyles.emptyInviteBox}>
            <div className="flex flex-col items-center gap-2">
                <MailCheck size={28} className="text-zinc-300" />
                <p>받은 초대가 없습니다.</p>
            </div>
        </div>
    );
}