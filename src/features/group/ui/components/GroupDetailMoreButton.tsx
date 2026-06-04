"use client";

import { useState } from "react";
import { Ellipsis, LogOut, MapPin, Pencil, Trash2 } from "lucide-react";
import { useAtomValue } from "jotai";

import { isGroupOwnerAtom } from "@/features/group/application/selectors/groupDetailSelectors";

import { groupDetailMoreButtonStyles } from "@/ui/styles/groupDetailMoreButtonStyles";

interface GroupDetailMoreButtonProps {
    readonly onClickEditName: () => void;
}

export default function GroupDetailMoreButton({
    onClickEditName,
}: GroupDetailMoreButtonProps) {
    const [isOpen, setIsOpen] = useState(false);

    const isOwner = useAtomValue(isGroupOwnerAtom);

    return (
        <div className={groupDetailMoreButtonStyles.wrapper}>
            <button
                type="button"
                onClick={() => setIsOpen((prev) => !prev)}
                className={groupDetailMoreButtonStyles.button}
            >
                <Ellipsis size={22} />
            </button>

            {isOpen && (
                <div className={groupDetailMoreButtonStyles.menu}>
                    {isOwner ? (
                        <>
                            <button
                                type="button"
                                onClick={onClickEditName}
                                className={groupDetailMoreButtonStyles.menuItem}
                            >
                                <Pencil size={18} />
                                그룹명 편집하기
                            </button>

                            <button
                                type="button"
                                className={groupDetailMoreButtonStyles.menuItem}
                            >
                                <MapPin size={18} />
                                위치 수정하기
                            </button>

                            <button
                                type="button"
                                className={
                                    groupDetailMoreButtonStyles.deleteMenuItem
                                }
                            >
                                <Trash2 size={18} />
                                그룹 삭제하기
                            </button>
                        </>
                    ) : (
                        <button
                            type="button"
                            className={groupDetailMoreButtonStyles.leaveMenuItem}
                        >
                            <LogOut size={18} />
                            그룹 나가기
                        </button>
                    )}
                </div>
            )}
        </div>
    );
}