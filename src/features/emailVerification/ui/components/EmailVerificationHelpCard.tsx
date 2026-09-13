import { Info } from "lucide-react";

import { authPageStyles } from "@/ui/styles/authPageStyles";

export default function EmailVerificationHelpCard() {
    return (
        <div className={authPageStyles.verificationHelpCard}>
            <div className={authPageStyles.verificationHelpCardTitle}>
                <Info size={18} aria-hidden="true" />

                <strong>확인해 주세요</strong>
            </div>

            <ul className={authPageStyles.verificationHelpCardList}>
                <li>입력한 이메일 주소가 정확한지 확인해 주세요.</li>
                <li>스팸 메일함도 함께 확인해 주세요.</li>
                <li>
                    해당 이메일로 가입된 계정이 없는 경우에는 인증번호가
                    발송되지 않습니다.
                </li>
            </ul>
        </div>
    );
}