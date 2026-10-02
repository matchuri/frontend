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

interface LocationModalProps {
    readonly isOpen: boolean;
    readonly onClose: () => void;
    readonly initialLocation: LocationSetting | null;
    readonly onSave: (location: LocationSetting) => Promise<boolean>;
    readonly isSaving?: boolean;
}

interface LocationModalContentProps {
    readonly onClose: () => void;
    readonly initialLocation: LocationSetting | null;
    readonly onSave: (location: LocationSetting) => Promise<boolean>;
    readonly isSaving: boolean;
}

export default function LocationModal({
    isOpen,
    onClose,
    initialLocation,
    onSave,
    isSaving = false,
}: LocationModalProps) {
    if (!isOpen) {
        return null;
    }

    return (
        <LocationModalContent
            onClose={onClose}
            initialLocation={initialLocation}
            onSave={onSave}
            isSaving={isSaving}
        />
    );
}

function LocationModalContent({
    onClose,
    initialLocation,
    onSave,
    isSaving,
}: LocationModalContentProps) {
    const baseLocation = initialLocation ?? defaultLocationSetting;

    const [selectedLocation, setSelectedLocation] = useState<LocationSetting>(baseLocation);
    const [radiusErrorMessage, setRadiusErrorMessage] = useState<string | null>(null);

    const handleSave = async () => {
        if (isSaving) {
            return;
        }

        if (!isLocationRadiusMeters(selectedLocation.radiusMeters)) {
            setRadiusErrorMessage(
                "검색 반경은 1km, 3km, 5km 중에서 선택해주세요.",
            );
            return;
        }

        setRadiusErrorMessage(null);

        await onSave(selectedLocation);
    };

    return (
        <div className={locationModalStyles.overlay}>
            <section
                className={locationModalStyles.modal}
                role="dialog"
                aria-modal="true"
                aria-labelledby="location-modal-title"
            >
                <header className={locationModalStyles.header}>
                    <div>
                        <h2
                            id="location-modal-title"
                            className={locationModalStyles.title}
                        >
                            위치 설정
                        </h2>

                        <p className={locationModalStyles.description}>
                            주변 맛집 추천을 위해 위치와 검색 반경을 설정해주세요.
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        disabled={isSaving}
                        className={locationModalStyles.closeButton}
                        aria-label="위치 설정 닫기"
                    >
                        <X
                            size={26}
                            strokeWidth={2}
                            aria-hidden="true"
                        />
                    </button>
                </header>

                <div className={locationModalStyles.content}>
                    <LocationSettingForm
                        initialLocation={baseLocation}
                        disabled={isSaving}
                        onChange={(location) => {
                            setSelectedLocation(location);
                            setRadiusErrorMessage(null);
                        }}
                    />

                    {radiusErrorMessage && (
                        <p className={locationModalStyles.radiusErrorMessage}>
                            {radiusErrorMessage}
                        </p>
                    )}
                </div>

                <footer className={locationModalStyles.footer}>
                    <button
                        type="button"
                        onClick={() => {void handleSave();}}
                        disabled={
                            isSaving ||
                            !isLocationRadiusMeters(selectedLocation.radiusMeters)
                        }
                        className={locationModalStyles.saveButton}
                    >
                        {isSaving ? "저장 중..." : "위치 저장하기"}

                        {!isSaving && (
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