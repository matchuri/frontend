import { ChevronRight } from "lucide-react";

import { settingsPageStyles } from "@/ui/styles/settingsPageStyles";

interface MyPageMenuListProps {
    readonly showPasswordChange: boolean;
    readonly isLoading: boolean;
}

interface MyPageMenuItemProps {
    readonly label: string;
    readonly disabled: boolean;
}

function MyPageMenuItem({
    label,
    disabled,
}: MyPageMenuItemProps) {
    return (
        <button
            type="button"
            disabled={disabled}
            className={settingsPageStyles.menuItem}
        >
            <span>{label}</span>

            <ChevronRight
                size={22}
                strokeWidth={1.8}
                aria-hidden="true"
                className={settingsPageStyles.menuChevron}
            />
        </button>
    );
}

export default function MyPageMenuList({
    showPasswordChange,
    isLoading,
}: MyPageMenuListProps) {
    return (
        <section className={settingsPageStyles.menuSection}>
            <MyPageMenuItem
                label="내 취향 프로필 설정"
                disabled={isLoading}
            />

            {showPasswordChange && (
                <MyPageMenuItem
                    label="비밀번호 변경"
                    disabled={isLoading}
                />
            )}

            <MyPageMenuItem
                label="로그아웃"
                disabled={isLoading}
            />

            <MyPageMenuItem
                label="회원 탈퇴"
                disabled={isLoading}
            />
        </section>
    );
}