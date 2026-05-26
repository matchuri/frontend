"use client";

import { FormEvent, useState } from "react";
import {
    Check,
    ChevronLeft,
    Crosshair,
    Info,
    MapPin,
    Search,
} from "lucide-react";

import KakaoMapView from "@/features/map/ui/components/KakaoMapView";
import type { LocationSetting } from "@/features/locationSetting/domain/model/LocationSetting";
import { locationModalStyles } from "@/ui/styles/locationModalStyles";

interface LocationModalProps {
    readonly isOpen: boolean;
    readonly onClose: () => void;
    readonly initialLocation: LocationSetting | null;
    readonly onSave: (location: LocationSetting) => void;
}

const DEFAULT_LOCATION: LocationSetting = {
    address: "서울특별시 강남구 강남대로 396",

    latitude: 37.497942,
    longitude: 127.027621,

    level: 4,

    southWestLatitude: 37.4900,
    southWestLongitude: 127.0200,

    northEastLatitude: 37.5050,
    northEastLongitude: 127.0400,
};

export default function LocationModal({
    isOpen,
    onClose,
    initialLocation,
    onSave,
}: LocationModalProps) {
    const baseLocation = initialLocation ?? DEFAULT_LOCATION;

    const [inputKeyword, setInputKeyword] = useState("");
    const [searchKeyword, setSearchKeyword] = useState("");

    const [selectedAddress, setSelectedAddress] = useState(
        baseLocation.address,
    );

    const [selectedLocation, setSelectedLocation] = useState({
        latitude: baseLocation.latitude,
        longitude: baseLocation.longitude,

        level: baseLocation.level,

        southWestLatitude: baseLocation.southWestLatitude,
        southWestLongitude: baseLocation.southWestLongitude,

        northEastLatitude: baseLocation.northEastLatitude,
        northEastLongitude: baseLocation.northEastLongitude,
    });

    const [searchErrorMessage, setSearchErrorMessage] = useState<string | null>(
        null,
    );

    if (!isOpen) return null;

    const handleSubmitSearch = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const keyword = inputKeyword.trim();

        if (!keyword) {
            setSearchErrorMessage("검색어를 입력해 주세요.");
            return;
        }

        setSearchErrorMessage(null);
        setSearchKeyword(keyword);
    };

    const handleSave = () => {
        onSave({
            address: selectedAddress,

            latitude: selectedLocation.latitude,
            longitude: selectedLocation.longitude,

            level: selectedLocation.level,

            southWestLatitude: selectedLocation.southWestLatitude,
            southWestLongitude: selectedLocation.southWestLongitude,

            northEastLatitude: selectedLocation.northEastLatitude,
            northEastLongitude: selectedLocation.northEastLongitude,
        });
    };

    return (
        <div className={locationModalStyles.overlay}>
            <div className={locationModalStyles.modal}>
                <header className={locationModalStyles.header}>
                    <button
                        type="button"
                        onClick={onClose}
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
                        onSubmit={handleSubmitSearch}
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
                                setSelectedLocation({
                                    latitude: center.latitude,
                                    longitude: center.longitude,

                                    level: center.level,

                                    southWestLatitude:
                                        center.southWestLatitude,
                                    southWestLongitude:
                                        center.southWestLongitude,

                                    northEastLatitude:
                                        center.northEastLatitude,
                                    northEastLongitude:
                                        center.northEastLongitude,
                                });
                            }}
                            onAddressChanged={setSelectedAddress}
                            onSearchFailed={() => {
                                setSearchErrorMessage(
                                    "검색 결과를 찾을 수 없습니다.",
                                );
                            }}
                        />

                        <div className={locationModalStyles.centerPin}>
                            <MapPin size={54} fill="currentColor" />
                        </div>

                        <div className={locationModalStyles.locationInfo}>
                            <span className={locationModalStyles.locationLabel}>
                                현재 선택된 위치
                            </span>

                            <strong className={locationModalStyles.selectedAddress}>
                                {selectedAddress}
                            </strong>
                        </div>
                    </div>
                </div>

                <footer className={locationModalStyles.footer}>
                    <div className={locationModalStyles.guideBox}>
                        <Info size={18} />

                        <span>
                            지도를 드래그하거나 확대/축소하여 추천 범위를 조정하세요.
                        </span>
                    </div>

                    <button
                        type="button"
                        onClick={handleSave}
                        className={locationModalStyles.saveButton}
                    >
                        등록
                        <Check size={18} />
                    </button>
                </footer>
            </div>
        </div>
    );
}