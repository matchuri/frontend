"use client";

import { useState } from "react";
import { ArrowLeft, Check, Crosshair, Info, MapPin, Search, } from "lucide-react";

import KakaoMapView from "@/features/map/ui/components/KakaoMapView";
import { useLocationSearch } from "@/features/locationSetting/application/hooks/useLocationSearch";
import type { LocationSetting } from "@/features/locationSetting/domain/model/LocationSetting";

import { groupLocationEditModalStyles } from "@/ui/styles/groupLocationEditModalStyles";

interface GroupLocationEditModalProps {
    readonly location: LocationSetting;
    readonly isUpdating: boolean;
    readonly onClose: () => void;
    readonly onChangeLocation: (location: LocationSetting) => void;
    readonly onSubmit: (location: LocationSetting) => void;
}

export default function GroupLocationEditModal({
    location,
    isUpdating,
    onClose,
    onChangeLocation,
    onSubmit,
}: GroupLocationEditModalProps) {
    const {
        inputKeyword,
        setInputKeyword,
        searchKeyword,
        searchErrorMessage,
        submitSearch,
        handleSearchFailed,
    } = useLocationSearch();

    // address와 좌표 state를 하나로 통합
    // 모달이 열릴 때 전달받은 기존 그룹 위치가 초기값으로 들어감
    const [selectedLocation, setSelectedLocation] =
        useState<LocationSetting | null>(location);

    // KakaoMapView 재생성을 막기 위해 지도 초기 중심값을 고정
    const [initialLocation] = useState<LocationSetting>(location);

    if (!selectedLocation) {
        return null;
    }

    const isDisabled =
        selectedLocation.address.trim().length === 0 ||
        isUpdating;

    const handleChangeLocation = (
        nextLocation: LocationSetting,
    ) => {
        setSelectedLocation(nextLocation);
        onChangeLocation(nextLocation);
    };

    const handleUpdate = () => {
        if (isDisabled) {
            return;
        }

        onSubmit(selectedLocation);
    };

    return (
        <div className={groupLocationEditModalStyles.overlay}>
            <div className={groupLocationEditModalStyles.modal}>
                <header className={groupLocationEditModalStyles.header}>
                    <button
                        type="button"
                        onClick={onClose}
                        className={groupLocationEditModalStyles.backButton}
                    >
                        <ArrowLeft size={24} />
                    </button>

                    <div>
                        <h2 className={groupLocationEditModalStyles.title}>
                            그룹 위치 수정
                        </h2>

                        <p className={groupLocationEditModalStyles.description}>
                            그룹 추천 기준이 되는 위치를 수정하세요.
                        </p>
                    </div>
                </header>

                <div className={groupLocationEditModalStyles.mapSection}>
                    <form
                        onSubmit={submitSearch}
                        className={groupLocationEditModalStyles.searchBar}
                    >
                        <Search size={20} />

                        <input
                            type="text"
                            value={inputKeyword}
                            onChange={(event) =>
                                setInputKeyword(event.target.value)
                            }
                            placeholder="주소 또는 장소 이름 검색"
                            className={groupLocationEditModalStyles.searchInput}
                        />

                        <button
                            type="submit"
                            className={groupLocationEditModalStyles.locationButton}
                        >
                            <Crosshair size={20} />
                        </button>

                        {searchErrorMessage && (
                            <p className={groupLocationEditModalStyles.searchErrorMessage}>
                                {searchErrorMessage}
                            </p>
                        )}
                    </form>

                    <div className={groupLocationEditModalStyles.mapContainer}>
                        <KakaoMapView
                            centerLatitude={initialLocation.latitude}
                            centerLongitude={initialLocation.longitude}
                            level={initialLocation.level}
                            searchKeyword={searchKeyword}
                            onCenterChanged={(center) => {
                                handleChangeLocation({
                                    address: selectedLocation.address,
                                    latitude: center.latitude,
                                    longitude: center.longitude,
                                    level: center.level,
                                });
                            }}
                            onAddressChanged={(address) => {
                                handleChangeLocation({
                                    ...selectedLocation,
                                    address,
                                });
                            }}
                            onSearchFailed={handleSearchFailed}
                        />

                        <div className={groupLocationEditModalStyles.centerPin}>
                            <MapPin size={54} fill="currentColor" />
                        </div>

                        <div className={groupLocationEditModalStyles.locationInfo}>
                            <span className={groupLocationEditModalStyles.locationLabel}>
                                현재 선택된 위치
                            </span>

                            <strong className={groupLocationEditModalStyles.selectedAddress}>
                                {selectedLocation.address}
                            </strong>
                        </div>
                    </div>
                </div>

                <footer className={groupLocationEditModalStyles.footer}>
                    <div className={groupLocationEditModalStyles.guideBox}>
                        <Info size={18} />

                        <span>
                            지도를 드래그하거나 확대/축소하여 추천 범위를 조정하세요.
                        </span>
                    </div>

                    <button
                        type="button"
                        disabled={isDisabled}
                        onClick={handleUpdate}
                        className={
                            isDisabled
                                ? groupLocationEditModalStyles.disabledButton
                                : groupLocationEditModalStyles.submitButton
                        }
                    >
                        {isUpdating ? "수정 중..." : "수정"}
                        {!isUpdating && <Check size={18} />}
                    </button>
                </footer>
            </div>
        </div>
    );
}