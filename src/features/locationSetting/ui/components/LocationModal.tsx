"use client";

import { useState } from "react";
import {
    Check,
    Crosshair,
    Info,
    MapPin,
    Search,
    X,
} from "lucide-react";

import KakaoMapView from "@/features/map/ui/components/KakaoMapView";
import type { LocationSetting } from "@/features/locationSetting/domain/model/LocationSetting";
import type { LocationRadiusMeters } from "@/features/locationSetting/domain/config/locationRadiusPolicy";
import {
    formatLocationRadius,
    isLocationRadiusMeters,
    LOCATION_RADIUS_OPTIONS,
} from "@/features/locationSetting/domain/config/locationRadiusPolicy";
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

    const [selectedLocation, setSelectedLocation] = useState<LocationSetting>(baseLocation);
    const [radiusErrorMessage, setRadiusErrorMessage] = useState<string | null>(null);

    const handleChangeRadius = (
        radiusMeters: LocationRadiusMeters,
    ) => {
        if (isSaving) {
            return;
        }

        setRadiusErrorMessage(null);

        setSelectedLocation((prev) => ({
            ...prev,
            radiusMeters,
        }));
    };

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
                    <section className={locationModalStyles.locationSection}>
                        <div className={locationModalStyles.sectionHeader}>
                            <div>
                                <h3 className={locationModalStyles.sectionTitle}>
                                    위치 선택
                                </h3>

                                <p className={locationModalStyles.sectionDescription}>
                                    주소를 검색하거나 지도를 움직여 위치를 선택해주세요.
                                </p>
                            </div>
                        </div>

                        <form
                            onSubmit={submitSearch}
                            className={locationModalStyles.searchBar}
                        >
                            <Search
                                size={19}
                                className={locationModalStyles.searchIcon}
                                aria-hidden="true"
                            />

                            <input
                                type="text"
                                value={inputKeyword}
                                onChange={(event) => setInputKeyword(event.target.value)}
                                placeholder="주소 또는 장소 이름 검색"
                                disabled={isSaving}
                                className={locationModalStyles.searchInput}
                            />

                            <button
                                type="submit"
                                disabled={isSaving}
                                className={locationModalStyles.searchButton}
                                aria-label="위치 검색"
                            >
                                <Crosshair
                                    size={19}
                                    aria-hidden="true"
                                />
                            </button>
                        </form>

                        {searchErrorMessage && (
                            <p className={locationModalStyles.searchErrorMessage}>
                                {searchErrorMessage}
                            </p>
                        )}

                        <div className={locationModalStyles.mapContainer}>
                            <KakaoMapView
                                centerLatitude={baseLocation.latitude}
                                centerLongitude={baseLocation.longitude}
                                level={baseLocation.level}
                                radiusMeters={selectedLocation.radiusMeters}
                                searchKeyword={searchKeyword}
                                onCenterChanged={(center) => {
                                    setSelectedLocation((prev) => ({
                                        ...prev,
                                        latitude: center.latitude,
                                        longitude: center.longitude,
                                        level: center.level,
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
                        </div>

                        <div className={locationModalStyles.locationInfo}>
                            <div className={locationModalStyles.locationInfoIcon}>
                                <MapPin
                                    size={18}
                                    strokeWidth={2}
                                    aria-hidden="true"
                                />
                            </div>

                            <div className={locationModalStyles.locationInfoText}>
                                <span className={locationModalStyles.locationLabel}>
                                    현재 선택된 위치
                                </span>

                                <strong className={locationModalStyles.selectedAddress}>
                                    {selectedLocation.address}
                                </strong>
                            </div>
                        </div>
                    </section>

                    <section className={locationModalStyles.radiusSection}>
                        <div className={locationModalStyles.radiusHeader}>
                            <div>
                                <h3 className={locationModalStyles.sectionTitle}>
                                    맛집 검색 반경
                                </h3>

                                <p className={locationModalStyles.sectionDescription}>
                                    선택한 위치를 기준으로 맛집을 검색할 범위예요.
                                </p>
                            </div>

                            <span className={locationModalStyles.radiusValue}>
                                {formatLocationRadius(selectedLocation.radiusMeters)}
                            </span>
                        </div>

                        <div className={locationModalStyles.radiusOptions}>
                            {LOCATION_RADIUS_OPTIONS.map((radiusMeters) => {
                                const isSelected =
                                    selectedLocation.radiusMeters === radiusMeters;

                                return (
                                    <button
                                        key={radiusMeters}
                                        type="button"
                                        onClick={() => handleChangeRadius(radiusMeters)}
                                        disabled={isSaving}
                                        aria-pressed={isSelected}
                                        className={
                                            isSelected
                                                ? locationModalStyles.selectedRadiusButton
                                                : locationModalStyles.radiusButton
                                        }
                                    >
                                        {formatLocationRadius(radiusMeters)}
                                    </button>
                                );
                            })}
                        </div>

                        {radiusErrorMessage && (
                            <p className={locationModalStyles.radiusErrorMessage}>
                                {radiusErrorMessage}
                            </p>
                        )}
                    </section>

                    <div className={locationModalStyles.guideBox}>
                        <Info
                            size={18}
                            className={locationModalStyles.guideIcon}
                            aria-hidden="true"
                        />

                        <span>
                            지도를 드래그하거나 주소를 검색해 원하는 위치를 설정할 수 있어요.
                        </span>
                    </div>
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