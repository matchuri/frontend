"use client";

import { useState } from "react";
import {Check, ChevronLeft, Crosshair, Info, MapPin, Search } from "lucide-react";

import KakaoMapView from "@/features/map/ui/components/KakaoMapView";
import type { LocationSetting } from "@/features/locationSetting/domain/model/LocationSetting";
import { defaultLocationSetting } from "@/features/locationSetting/ui/config/defaultLocationSetting";
import { useLocationSearch } from "@/features/locationSetting/application/hooks/useLocationSearch";
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

    const {
        inputKeyword,
        setInputKeyword,
        searchKeyword,
        searchErrorMessage,
        submitSearch,
        handleSearchFailed,
    } = useLocationSearch();

    const [selectedLocation, setSelectedLocation] =
        useState<LocationSetting>(baseLocation);

    const handleSave = async () => {
        if (isSaving) {
            return;
        }

        await onSave({
            ...selectedLocation,
            radiusMeters: 1000,
        });
    };

    return (
        <div className={locationModalStyles.overlay}>
            <div className={locationModalStyles.modal}>
                <header className={locationModalStyles.header}>
                    <button
                        type="button"
                        onClick={onClose}
                        disabled={isSaving}
                        className={locationModalStyles.backButton}
                    >
                        <ChevronLeft size={24} />
                    </button>

                    <div>
                        <h2 className={locationModalStyles.title}>위치 등록</h2>

                        <p className={locationModalStyles.description}>
                            주변 맛집 추천을 위해 위치를 등록해주세요.
                        </p>
                    </div>
                </header>

                <div className={locationModalStyles.mapSection}>
                    <form
                        onSubmit={submitSearch}
                        className={locationModalStyles.searchBar}
                    >
                        <Search size={20} />

                        <input
                            type="text"
                            value={inputKeyword}
                            onChange={(event) =>
                                setInputKeyword(event.target.value)
                            }
                            placeholder="주소 또는 장소 이름 검색"
                            className={locationModalStyles.searchInput}
                        />

                        <button
                            type="submit"
                            disabled={isSaving}
                            className={locationModalStyles.locationButton}
                        >
                            <Crosshair size={20} />
                        </button>

                        {searchErrorMessage && (
                            <p className={locationModalStyles.searchErrorMessage}>
                                {searchErrorMessage}
                            </p>
                        )}
                    </form>

                    <div className={locationModalStyles.mapContainer}>
                        <KakaoMapView
                            centerLatitude={baseLocation.latitude}
                            centerLongitude={baseLocation.longitude}
                            level={baseLocation.level}
                            searchKeyword={searchKeyword}
                            onCenterChanged={(center) => {
                                setSelectedLocation((prev) => ({
                                    ...prev,
                                    latitude: center.latitude,
                                    longitude: center.longitude,
                                    level: 4,
                                }));
                            }}
                            onAddressChanged={(address) => {
                                setSelectedLocation((prev) => ({
                                    ...prev,
                                    address,
                                }));
                            }}
                            onSearchFailed={handleSearchFailed}
                        />

                        <div className={locationModalStyles.centerPin}>
                            <MapPin size={54} fill="currentColor" />
                        </div>

                        <div className={locationModalStyles.locationInfo}>
                            <span className={locationModalStyles.locationLabel}>
                                현재 선택된 위치
                            </span>

                            <strong className={locationModalStyles.selectedAddress}>
                                {selectedLocation.address}
                            </strong>
                        </div>
                    </div>
                </div>

                <footer className={locationModalStyles.footer}>
                    <div className={locationModalStyles.guideBox}>
                        <Info size={18} />

                        <span>
                            지도를 드래그하거나 검색하여 원하는 위치를 설정하세요.
                        </span>
                    </div>

                    <button
                        type="button"
                        onClick={() => {
                            void handleSave();
                        }}
                        disabled={isSaving}
                        className={locationModalStyles.saveButton}
                    >
                        {isSaving ? "저장 중..." : "등록"}
                        <Check size={18} />
                    </button>
                </footer>
            </div>
        </div>
    );
}