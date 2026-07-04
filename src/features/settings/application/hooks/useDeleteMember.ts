"use client";

import { useCallback, useState } from "react";
import { deleteMemberAccount } from "@/features/settings/application/usecase/deleteMemberAccount";

export function useDeleteMember() {
    const [isDeleting, setIsDeleting] = useState(false);

    const deleteAccount = useCallback(async () => {
        if (isDeleting) return;

        setIsDeleting(true);

        try {
            await deleteMemberAccount();

            window.location.replace("/");
        } catch {
            alert("회원 탈퇴를 진행할 수 없습니다. 다시 시도해보세요");
            setIsDeleting(false);
        }
    }, [isDeleting]);

    return {
        isDeleting,
        deleteAccount,
    };
}