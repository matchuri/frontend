"use client";

import { useRef, useState } from "react";
import {
    Crosshair,
    Info,
    MapPin,
    Search,
} from "lucide-react";

import KakaoMapView from "@/features/map/ui/components/KakaoMapView";
import type { LocationSetting } from "@/features/locationSetting/domain/model/LocationSetting";
import type { LocationRadiusMeters } from "@/features/locationSetting/domain/config/locationRadiusPolicy";
import {
    formatLocationRadius,
    LOCATION_RADIUS_OPTIONS,
} from "@/features/locationSetting/domain/config/locationRadiusPolicy";
import { useLocationSearch } from "@/features/locationSetting/application/hooks/useLocationSearch";

import { locationModalStyles } from "@/ui/styles/locationModalStyles";

interface LocationSettingFormProps {
    readonly initialLocation: LocationSetting;
    readonly disabled?: boolean;
    readonly onChange: (location: LocationSetting) => void;
}

export default function LocationSettingForm({
    initialLocation,
    disabled = false,
    onChange,
}: LocationSettingFormProps) {
    const {
        inputKeyword,
        setInputKeyword,
        searchKeyword,
        searchErrorMessage,
        submitSearch,
        handleSearchFailed,
    } = useLocationSearch();

    const [selectedLocation, setSelectedLocation] =
        useState<LocationSetting>(initialLocation);

    const selectedLocationRef = useRef<LocationSetting>(initialLocation);

    const handleLocationChange = (
        location: LocationSetting,
    ) => {
        selectedLocationRef.current = location;
        setSelectedLocation(location);
        onChange(location);
    };

    const handleChangeRadius = (
        radiusMeters: LocationRadiusMeters,
    ) => {
        if (disabled) {
            return;
        }

        handleLocationChange({
            ...selectedLocationRef.current,
            radiusMeters,
        });
    };

    return (
        <>
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
                        disabled={disabled}
                        className={locationModalStyles.searchInput}
                    />

                    <button
                        type="submit"
                        disabled={disabled}
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
                        centerLatitude={initialLocation.latitude}
                        centerLongitude={initialLocation.longitude}
                        level={initialLocation.level}
                        radiusMeters={selectedLocation.radiusMeters}
                        searchKeyword={searchKeyword}
                        onCenterChanged={(center) => {
                            handleLocationChange({
                                ...selectedLocationRef.current,
                                latitude: center.latitude,
                                longitude: center.longitude,
                                level: center.level,
                            });
                        }}
                        onAddressChanged={(address) => {
                            handleLocationChange({
                                ...selectedLocationRef.current,
                                address,
                            });
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
                    {LOCATION_RADIUS_OPTIONS.map((option) => {
                        const isSelected =
                            selectedLocation.radiusMeters === option;

                        return (
                            <button
                                key={option}
                                type="button"
                                onClick={() => handleChangeRadius(option)}
                                disabled={disabled}
                                className={
                                    isSelected
                                        ? locationModalStyles.selectedRadiusButton
                                        : locationModalStyles.radiusButton
                                }
                            >
                                {formatLocationRadius(option)}
                            </button>
                        );
                    })}
                </div>
            </section>

            <div className={locationModalStyles.guideBox}>
                <Info
                    size={17}
                    className={locationModalStyles.guideIcon}
                    aria-hidden="true"
                />

                <p>
                    지도를 드래그하거나 주소를 검색해 원하는 위치를 설정할 수 있어요.
                </p>
            </div>
        </>
    );
}