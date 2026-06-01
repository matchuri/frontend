"use client";

import { ArrowLeft, Info, MapPin, Search } from "lucide-react";
import { groupCreateModalStyles } from "@/ui/styles/groupCreateModalStyles";

interface GroupCreateModalProps {
    readonly isOpen: boolean;
    readonly groupName: string;
    readonly address: string | null;
    readonly onClose: () => void;
    readonly onChangeGroupName: (value: string) => void;
}

export default function GroupCreateModal({
    isOpen,
    groupName,
    address,
    onClose,
    onChangeGroupName,
}: GroupCreateModalProps) {
    if (!isOpen) return null;

    const isDisabled = groupName.trim().length === 0 || !address;

    return (
        <div className={groupCreateModalStyles.overlay}>
            <div className={groupCreateModalStyles.modal}>
                <button
                    type="button"
                    onClick={onClose}
                    className={groupCreateModalStyles.backButton}
                >
                    <ArrowLeft size={26} />
                </button>

                <header>
                    <h2 className={groupCreateModalStyles.title}>그룹 생성</h2>
                    <p className={groupCreateModalStyles.description}>
                        그룹명을 입력하고 주변 맛집 추천을 위해 위치를 등록해주세요.
                    </p>
                </header>

                <input
                    type="text"
                    value={groupName}
                    onChange={(event) => onChangeGroupName(event.target.value)}
                    placeholder="그룹명을 입력하세요."
                    className={groupCreateModalStyles.groupNameInput}
                />

                <div className={groupCreateModalStyles.mapSection}>
                    <div className={groupCreateModalStyles.mapSearchBar}>
                        <div className="flex items-center gap-3">
                            <Search size={22} className="text-slate-500" />
                            <span className="text-slate-500">
                                주소 또는 장소 이름 검색
                            </span>
                        </div>

                        <MapPin size={22} className="text-slate-500" />
                    </div>

                    <div className={groupCreateModalStyles.selectedLocationCard}>
                        <div className="flex items-center gap-3">
                            <div className="rounded-full bg-slate-200 p-2">
                                <MapPin size={14} className="text-slate-600" />
                            </div>

                            <div>
                                <p className="text-xs text-slate-500">
                                    현재 선택된 위치
                                </p>
                                <p className="text-sm font-semibold text-zinc-900">
                                    {address ?? "위치를 선택해 주세요."}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className={groupCreateModalStyles.mapPlaceholder}>
                        지도 영역
                    </div>
                </div>

                <footer className={groupCreateModalStyles.footer}>
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                        <Info size={18} />
                        지도를 드래그하여 정확한 위치를 지정하세요.
                    </div>

                    <button
                        type="button"
                        disabled={isDisabled}
                        className={
                            isDisabled
                                ? groupCreateModalStyles.disabledButton
                                : groupCreateModalStyles.submitButton
                        }
                    >
                        생성
                    </button>
                </footer>
            </div>
        </div>
    );
}