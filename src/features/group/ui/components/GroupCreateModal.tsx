"use client";

import { useState } from "react";
import {
    ArrowLeft,
    Check,
    Crosshair,
    Info,
    MapPin,
    Search,
} from "lucide-react";

import KakaoMapView from "@/features/map/ui/components/KakaoMapView";
import { useLocationSearch } from "@/features/locationSetting/application/hooks/useLocationSearch";
import type { LocationSetting } from "@/features/locationSetting/domain/model/LocationSetting";
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

    const [selectedAddress, setSelectedAddress] = useState(
        defaultLocationSetting.address,
    );

    const [selectedLocation, setSelectedLocation] = useState({
        latitude: defaultLocationSetting.latitude,
        longitude: defaultLocationSetting.longitude,

        level: defaultLocationSetting.level,

        southWestLatitude: defaultLocationSetting.southWestLatitude,
        southWestLongitude: defaultLocationSetting.southWestLongitude,

        northEastLatitude: defaultLocationSetting.northEastLatitude,
        northEastLongitude: defaultLocationSetting.northEastLongitude,
    });

    if (!isOpen) return null;

    const selectedGroupLocation: LocationSetting = {
        address: selectedAddress,

        latitude: selectedLocation.latitude,
        longitude: selectedLocation.longitude,

        level: selectedLocation.level,

        southWestLatitude: selectedLocation.southWestLatitude,
        southWestLongitude: selectedLocation.southWestLongitude,

        northEastLatitude: selectedLocation.northEastLatitude,
        northEastLongitude: selectedLocation.northEastLongitude,
    };

    const isDisabled =
        groupName.trim().length === 0 ||
        selectedAddress.trim().length === 0 ||
        isCreating;

    const handleCreate = async () => {
        if (isDisabled) return;

        await onCreate(selectedGroupLocation);
    };

    return (
        <div className={groupCreateModalStyles.overlay}>
            <div className={groupCreateModalStyles.modal}>
                <header className={groupCreateModalStyles.header}>
                    <button
                        type="button"
                        onClick={onClose}
                        className={groupCreateModalStyles.backButton}
                    >
                        <ArrowLeft size={24} />
                    </button>

                    <div>
                        <h2 className={groupCreateModalStyles.title}>
                            그룹 생성
                        </h2>

                        <p className={groupCreateModalStyles.description}>
                            그룹명을 입력하고 주변 맛집 추천을 위해 위치를 등록해주세요.
                        </p>
                    </div>
                </header>

                <input
                    type="text"
                    value={groupName}
                    onChange={(event) => onChangeGroupName(event.target.value)}
                    placeholder="그룹명을 입력하세요."
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
                            className={groupCreateModalStyles.searchInput}
                        />

                        <button
                            type="submit"
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
                            centerLatitude={defaultLocationSetting.latitude}
                            centerLongitude={defaultLocationSetting.longitude}
                            level={defaultLocationSetting.level}
                            searchKeyword={searchKeyword}
                            onCenterChanged={(center) => {
                                setSelectedLocation({
                                    latitude: center.latitude,
                                    longitude: center.longitude,

                                    level: center.level,

                                    southWestLatitude: center.southWestLatitude,
                                    southWestLongitude: center.southWestLongitude,

                                    northEastLatitude: center.northEastLatitude,
                                    northEastLongitude: center.northEastLongitude,
                                });
                            }}
                            onAddressChanged={setSelectedAddress}
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
                                {selectedAddress}
                            </strong>
                        </div>
                    </div>
                </div>

                <footer className={groupCreateModalStyles.footer}>
                    <div className={groupCreateModalStyles.guideBox}>
                        <Info size={18} />
                        <span>
                            지도를 드래그하거나 확대/축소하여 추천 범위를 조정하세요.
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