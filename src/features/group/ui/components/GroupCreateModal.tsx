"use client";

import { useState } from "react";
import {
    Check,
    X,
} from "lucide-react";

import LocationSettingForm from "@/features/locationSetting/ui/components/LocationSettingForm";
import type { LocationSetting } from "@/features/locationSetting/domain/model/LocationSetting";
import { isLocationRadiusMeters } from "@/features/locationSetting/domain/config/locationRadiusPolicy";
import { defaultLocationSetting } from "@/features/locationSetting/ui/config/defaultLocationSetting";

import { locationModalStyles } from "@/ui/styles/locationModalStyles";

interface GroupCreateModalProps {
    readonly isOpen: boolean;
    readonly groupName: string;
    readonly isCreating: boolean;

    readonly onClose: () => void;
    readonly onChangeGroupName: (value: string) => void;
    readonly onCreate: (location: LocationSetting) => Promise<void>;
}

export default function GroupCreateModal({
    isOpen,
    groupName,
    isCreating,
    onClose,
    onChangeGroupName,
    onCreate,
}: GroupCreateModalProps) {
    if (!isOpen) {
        return null;
    }

    return (
        <GroupCreateModalContent
            groupName={groupName}
            isCreating={isCreating}
            onClose={onClose}
            onChangeGroupName={onChangeGroupName}
            onCreate={onCreate}
        />
    );
}

interface GroupCreateModalContentProps {
    readonly groupName: string;
    readonly isCreating: boolean;

    readonly onClose: () => void;
    readonly onChangeGroupName: (value: string) => void;
    readonly onCreate: (location: LocationSetting) => Promise<void>;
}

function GroupCreateModalContent({
    groupName,
    isCreating,
    onClose,
    onChangeGroupName,
    onCreate,
}: GroupCreateModalContentProps) {
    const [selectedLocation, setSelectedLocation] =
        useState<LocationSetting>(defaultLocationSetting);

    const isDisabled =
        groupName.trim().length === 0 ||
        selectedLocation.address.trim().length === 0 ||
        !isLocationRadiusMeters(selectedLocation.radiusMeters) ||
        isCreating;

    const handleCreate = async () => {
        if (isDisabled) {
            return;
        }

        await onCreate(selectedLocation);
    };

    return (
        <div className={locationModalStyles.overlay}>
            <section
                className={locationModalStyles.modal}
                role="dialog"
                aria-modal="true"
                aria-labelledby="group-create-modal-title"
            >
                <header className={locationModalStyles.header}>
                    <div>
                        <h2
                            id="group-create-modal-title"
                            className={locationModalStyles.title}
                        >
                            그룹 생성
                        </h2>

                        <p className={locationModalStyles.description}>
                            그룹명과 그룹에서 사용할 위치를 설정해주세요.
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        disabled={isCreating}
                        className={locationModalStyles.closeButton}
                        aria-label="그룹 생성 닫기"
                    >
                        <X
                            size={26}
                            strokeWidth={2}
                            aria-hidden="true"
                        />
                    </button>
                </header>

                <div className={locationModalStyles.content}>
                    <section className={locationModalStyles.groupNameSection}>
                        <div className={locationModalStyles.sectionHeader}>
                            <div>
                                <h3 className={locationModalStyles.sectionTitle}>
                                    그룹명
                                </h3>

                                <p className={locationModalStyles.sectionDescription}>
                                    함께 메뉴를 추천받을 그룹의 이름을 입력해주세요.
                                </p>
                            </div>
                        </div>

                        <input
                            type="text"
                            value={groupName}
                            onChange={(event) => onChangeGroupName(event.target.value)}
                            placeholder="그룹명을 입력하세요."
                            disabled={isCreating}
                            className={locationModalStyles.groupNameInput}
                        />
                    </section>

                    <LocationSettingForm
                        initialLocation={defaultLocationSetting}
                        disabled={isCreating}
                        onChange={setSelectedLocation}
                    />
                </div>

                <footer className={locationModalStyles.footer}>
                    <button
                        type="button"
                        onClick={() => {void handleCreate();}}
                        disabled={isDisabled}
                        className={locationModalStyles.saveButton}
                    >
                        {isCreating ? "생성 중..." : "그룹 생성하기"}

                        {!isCreating && (
                            <Check
                                size={18}
                                aria-hidden="true"
                            />
                        )}
                    </button>
                </footer>
            </section>
        </div>
    );
}