import { Info } from "lucide-react";

import { authPageStyles } from "@/ui/styles/authPageStyles";

interface EmailVerificationHelpCardProps {
    readonly variant?: "ACCOUNT_FIND" | "SIGNUP";
}

export default function EmailVerificationHelpCard({
    variant = "ACCOUNT_FIND",
}: EmailVerificationHelpCardProps) {
    return (
        <div className={authPageStyles.verificationHelpCard}>
            <div className={authPageStyles.verificationHelpCardTitle}>
                <Info size={18} aria-hidden="true" />

                <strong>확인해 주세요</strong>
            </div>

            <ul className={authPageStyles.verificationHelpCardList}>
                <li>입력한 이메일 주소가 정확한지 확인해 주세요.</li>
                <li>스팸 메일함도 함께 확인해 주세요.</li>
                {variant === "ACCOUNT_FIND" && (
                    <li>
                        해당 이메일로 가입된 계정이 없는 경우에는 인증번호가
                        발송되지 않습니다.
                    </li>
                )}
                {variant === "SIGNUP" && (
                    <li>
                        이미 가입된 이메일은 회원가입에 사용할 수 없습니다.
                    </li>
                )}
            </ul>
        </div>
    );
}