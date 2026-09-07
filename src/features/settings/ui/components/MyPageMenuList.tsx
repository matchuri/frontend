import { ChevronRight } from "lucide-react";

import { settingsPageStyles } from "@/ui/styles/settingsPageStyles";

interface MyPageMenuListProps {
    readonly showPasswordChange: boolean;
    readonly isLoading: boolean;
    readonly isLoggingOut: boolean;
    readonly onClickPreference: () => void;
    readonly onClickPasswordChange: () => void;
    readonly onClickLogout: () => void;
    readonly onClickDeleteMember: () => void;
}

interface MyPageMenuItemProps {
    readonly label: string;
    readonly disabled: boolean;
    readonly onClick?: () => void;
}

function MyPageMenuItem({
    label,
    disabled,
    onClick,
}: MyPageMenuItemProps) {
    return (
        <button
            type="button"
            disabled={disabled}
            onClick={onClick}
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
    isLoggingOut,
    onClickPreference,
    onClickPasswordChange,
    onClickLogout,
    onClickDeleteMember,
}: MyPageMenuListProps) {
    const isDisabled = isLoading || isLoggingOut;

    return (
        <section className={settingsPageStyles.menuSection}>
            <MyPageMenuItem
                label="내 취향 프로필 설정"
                disabled={isDisabled}
                onClick={onClickPreference}
            />

            {showPasswordChange && (
                <MyPageMenuItem
                    label="비밀번호 변경"
                    disabled={isDisabled}
                    onClick={onClickPasswordChange}
                />
            )}

            <MyPageMenuItem
                label={isLoggingOut ? "로그아웃 중..." : "로그아웃"}
                disabled={isDisabled}
                onClick={onClickLogout}
            />

            <MyPageMenuItem
                label="회원 탈퇴"
                disabled={isDisabled}
                onClick={onClickDeleteMember}
            />
        </section>
    );
}