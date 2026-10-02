"use client";

import { useEffect, useRef, useState } from "react";
import { Ellipsis, LogOut, MapPin, Trash2 } from "lucide-react";
import { useAtomValue } from "jotai";

import { isGroupOwnerAtom } from "@/features/group/application/selectors/groupDetailSelectors";

import { groupDetailMoreButtonStyles } from "@/ui/styles/groupDetailMoreButtonStyles";

interface GroupDetailMoreButtonProps {
    readonly onClickEditLocation: () => void;
    readonly onClickDeleteGroup: () => void;
    readonly onClickLeaveGroup: () => void;
}

export default function GroupDetailMoreButton({
    onClickEditLocation,
    onClickDeleteGroup,
    onClickLeaveGroup,
}: GroupDetailMoreButtonProps) {
    const [isOpen, setIsOpen] = useState(false);

    const wrapperRef = useRef<HTMLDivElement>(null);

    const isOwner = useAtomValue(isGroupOwnerAtom);

    useEffect(() => {
        if (!isOpen) {
            return;
        }

        const handlePointerDown = (event: PointerEvent) => {
            if (
                wrapperRef.current &&
                !wrapperRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false);
            }
        };

        document.addEventListener("pointerdown", handlePointerDown);

        return () => {
            document.removeEventListener("pointerdown", handlePointerDown);
        };
    }, [isOpen]);

    const handleClickEditLocation = () => {
        setIsOpen(false);
        onClickEditLocation();
    };

    const handleClickDeleteGroup = () => {
        setIsOpen(false);
        onClickDeleteGroup();
    };

    const handleClickLeaveGroup = () => {
        setIsOpen(false);
        onClickLeaveGroup();
    };

    return (
        <div
            ref={wrapperRef}
            className={groupDetailMoreButtonStyles.wrapper}
        >
            <button
                type="button"
                onClick={() => setIsOpen((prev) => !prev)}
                className={groupDetailMoreButtonStyles.button}
                aria-label="그룹 관리 메뉴"
                aria-expanded={isOpen}
            >
                <Ellipsis size={22} />
            </button>

            {isOpen && (
                <div className={groupDetailMoreButtonStyles.menu}>
                    {isOwner ? (
                        <>
                            <button
                                type="button"
                                onClick={handleClickEditLocation}
                                className={groupDetailMoreButtonStyles.menuItem}
                            >
                                <span className={groupDetailMoreButtonStyles.menuIcon}>
                                    <MapPin size={17} />
                                </span>
                                위치 수정하기
                            </button>

                            <div className={groupDetailMoreButtonStyles.divider} />

                            <button
                                type="button"
                                onClick={handleClickDeleteGroup}
                                className={groupDetailMoreButtonStyles.deleteMenuItem}
                            >
                                <span className={groupDetailMoreButtonStyles.deleteMenuIcon}>
                                    <Trash2 size={17} />
                                </span>
                                그룹 삭제하기
                            </button>
                        </>
                    ) : (
                        <button
                            type="button"
                            onClick={handleClickLeaveGroup}
                            className={groupDetailMoreButtonStyles.leaveMenuItem}
                        >
                            <span className={groupDetailMoreButtonStyles.deleteMenuIcon}>
                                <LogOut size={17} />
                            </span>
                            그룹 나가기
                        </button>
                    )}
                </div>
            )}
        </div>
    );
}