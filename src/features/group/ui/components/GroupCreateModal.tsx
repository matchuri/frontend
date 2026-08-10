"use client";

import { useState } from "react";
import { ArrowLeft, Check, Crosshair, Info, MapPin, Search } from "lucide-react";

import KakaoMapView from "@/features/map/ui/components/KakaoMapView";
import { useLocationSearch } from "@/features/locationSetting/application/hooks/useLocationSearch";
import type { LocationSetting } from "@/features/locationSetting/domain/model/LocationSetting";
import type { LocationRadiusMeters } from "@/features/locationSetting/domain/config/locationRadiusPolicy";
import {
    formatLocationRadius,
    isLocationRadiusMeters,
    LOCATION_RADIUS_OPTIONS,
} from "@/features/locationSetting/domain/config/locationRadiusPolicy";
import { defaultLocationSetting } from "@/features/locationSetting/ui/config/defaultLocationSetting";
import { groupCreateModalStyles } from "@/ui/styles/groupCreateModalStyles";

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
    const {
        inputKeyword,
        setInputKeyword,
        searchKeyword,
        searchErrorMessage,
        submitSearch,
        handleSearchFailed,
    } = useLocationSearch();

    const [selectedLocation, setSelectedLocation] =
        useState<LocationSetting>({
            ...defaultLocationSetting,
        });

    const [radiusErrorMessage, setRadiusErrorMessage] =
        useState<string | null>(null);

    if (!isOpen) {
        return null;
    }

    const isRadiusValid = isLocationRadiusMeters(
        selectedLocation.radiusMeters,
    );

    const isDisabled =
        groupName.trim().length === 0 ||
        selectedLocation.address.trim().length === 0 ||
        !isRadiusValid ||
        isCreating;

    const handleChangeRadius = (
        radiusMeters: LocationRadiusMeters,
    ) => {
        if (isCreating) {
            return;
        }

        setRadiusErrorMessage(null);

        setSelectedLocation((prev) => ({
            ...prev,
            radiusMeters,
        }));
    };

    const handleCreate = async () => {
        if (isCreating) {
            return;
        }

        if (!isRadiusValid) {
            setRadiusErrorMessage(
                "검색 반경은 1km, 3km, 5km 중에서 선택해주세요.",
            );
            return;
        }

        if (isDisabled) {
            return;
        }

        setRadiusErrorMessage(null);

        await onCreate(selectedLocation);
    };

    return (
        <div className={groupCreateModalStyles.overlay}>
            <div className={groupCreateModalStyles.modal}>
                <header className={groupCreateModalStyles.header}>
                    <button
                        type="button"
                        onClick={onClose}
                        disabled={isCreating}
                        className={groupCreateModalStyles.backButton}
                    >
                        <ArrowLeft size={24} />
                    </button>

                    <div>
                        <h2 className={groupCreateModalStyles.title}>
                            그룹 생성
                        </h2>

                        <p className={groupCreateModalStyles.description}>
                            그룹명을 입력하고 주변 맛집 추천을 위해 위치와
                            검색 반경을 설정해주세요.
                        </p>
                    </div>
                </header>

                <input
                    type="text"
                    value={groupName}
                    onChange={(event) => onChangeGroupName(event.target.value)}
                    placeholder="그룹명을 입력하세요."
                    disabled={isCreating}
                    className={groupCreateModalStyles.groupNameInput}
                />

                <div className={groupCreateModalStyles.mapSection}>
                    <form
                        onSubmit={submitSearch}
                        className={groupCreateModalStyles.searchBar}
                    >
                        <Search size={20} />

                        <input
                            type="text"
                            value={inputKeyword}
                            onChange={(event) =>
                                setInputKeyword(event.target.value)
                            }
                            placeholder="주소 또는 장소 이름 검색"
                            disabled={isCreating}
                            className={groupCreateModalStyles.searchInput}
                        />

                        <button
                            type="submit"
                            disabled={isCreating}
                            className={groupCreateModalStyles.locationButton}
                        >
                            <Crosshair size={20} />
                        </button>

                        {searchErrorMessage && (
                            <p className={groupCreateModalStyles.searchErrorMessage}>
                                {searchErrorMessage}
                            </p>
                        )}
                    </form>

                    <div className={groupCreateModalStyles.mapContainer}>
                        <KakaoMapView
                            centerLatitude={selectedLocation.latitude}
                            centerLongitude={selectedLocation.longitude}
                            level={selectedLocation.level}
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

                        <div className={groupCreateModalStyles.centerPin}>
                            <MapPin size={54} fill="currentColor" />
                        </div>

                        <div className={groupCreateModalStyles.locationInfo}>
                            <span className={groupCreateModalStyles.locationLabel}>
                                현재 선택된 위치
                            </span>

                            <strong className={groupCreateModalStyles.selectedAddress}>
                                {selectedLocation.address}
                            </strong>
                        </div>
                    </div>
                </div>

                <div className={groupCreateModalStyles.radiusSection}>
                    <div className={groupCreateModalStyles.radiusHeader}>
                        <h3 className={groupCreateModalStyles.radiusTitle}>
                            맛집 검색 반경
                        </h3>

                        <span className={groupCreateModalStyles.radiusValue}>
                            {formatLocationRadius(
                                selectedLocation.radiusMeters,
                            )}
                        </span>
                    </div>

                    <p className={groupCreateModalStyles.radiusDescription}>
                        그룹 위치를 기준으로 맛집을 검색할 기본 범위입니다.
                    </p>

                    <div className={groupCreateModalStyles.radiusOptions}>
                        {LOCATION_RADIUS_OPTIONS.map((radiusMeters) => {
                            const isSelected =
                                selectedLocation.radiusMeters === radiusMeters;

                            return (
                                <button
                                    key={radiusMeters}
                                    type="button"
                                    onClick={() =>
                                        handleChangeRadius(radiusMeters)
                                    }
                                    disabled={isCreating}
                                    aria-pressed={isSelected}
                                    className={
                                        isSelected
                                            ? groupCreateModalStyles.selectedRadiusButton
                                            : groupCreateModalStyles.radiusButton
                                    }
                                >
                                    {formatLocationRadius(radiusMeters)}
                                </button>
                            );
                        })}
                    </div>

                    {radiusErrorMessage && (
                        <p className={groupCreateModalStyles.radiusErrorMessage}>
                            {radiusErrorMessage}
                        </p>
                    )}
                </div>

                <footer className={groupCreateModalStyles.footer}>
                    <div className={groupCreateModalStyles.guideBox}>
                        <Info size={18} />

                        <span>
                            지도를 드래그하거나 주소를 검색해 그룹 위치를
                            설정하세요.
                        </span>
                    </div>

                    <button
                        type="button"
                        disabled={isDisabled}
                        onClick={handleCreate}
                        className={
                            isDisabled
                                ? groupCreateModalStyles.disabledButton
                                : groupCreateModalStyles.submitButton
                        }
                    >
                        {isCreating ? "생성 중..." : "생성"}
                        {!isCreating && <Check size={18} />}
                    </button>
                </footer>
            </div>
        </div>
    );
}