import type { FormEvent } from "react";

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

import { guestRecommendationPageStyles } from "@/ui/styles/guestRecommendationPageStyles";

interface GuestLocationCenter {
    readonly latitude: number;
    readonly longitude: number;
    readonly level: number;
}

interface GuestLocationSettingSectionProps {
    readonly location: LocationSetting;
    readonly inputKeyword: string;
    readonly searchKeyword: string;
    readonly searchErrorMessage: string | null;

    readonly onInputKeywordChange: (keyword: string) => void;
    readonly onSubmitSearch: (event: FormEvent<HTMLFormElement>) => void;
    readonly onSearchFailed: () => void;

    readonly onCenterChange: (center: GuestLocationCenter) => void;
    readonly onAddressChange: (address: string) => void;
    readonly onRadiusChange: (radiusMeters: LocationRadiusMeters) => void;
}

export default function GuestLocationSettingSection({
    location,
    inputKeyword,
    searchKeyword,
    searchErrorMessage,
    onInputKeywordChange,
    onSubmitSearch,
    onSearchFailed,
    onCenterChange,
    onAddressChange,
    onRadiusChange,
}: GuestLocationSettingSectionProps) {
    return (
        <section className={guestRecommendationPageStyles.settingSection}>
            <div className={guestRecommendationPageStyles.settingSectionHeader}>
                <div className={guestRecommendationPageStyles.settingSectionIcon}>
                    <MapPin size={20} strokeWidth={2} aria-hidden="true" />
                </div>

                <div>
                    <h2 className={guestRecommendationPageStyles.settingSectionTitle}>
                        위치 설정
                    </h2>

                    <p className={guestRecommendationPageStyles.settingSectionDescription}>
                        맛집을 찾을 위치와 검색 반경을 설정해주세요.
                    </p>
                </div>
            </div>

            <div className={guestRecommendationPageStyles.locationCard}>
                <form
                    onSubmit={onSubmitSearch}
                    className={guestRecommendationPageStyles.searchBar}
                >
                    <Search
                        size={18}
                        className={guestRecommendationPageStyles.searchIcon}
                        aria-hidden="true"
                    />

                    <input
                        type="text"
                        value={inputKeyword}
                        onChange={(event) => onInputKeywordChange(event.target.value)}
                        placeholder="주소 또는 장소 이름 검색"
                        className={guestRecommendationPageStyles.searchInput}
                    />

                    <button
                        type="submit"
                        className={guestRecommendationPageStyles.searchButton}
                        aria-label="위치 검색"
                    >
                        <Crosshair size={18} aria-hidden="true" />
                    </button>
                </form>

                {searchErrorMessage && (
                    <p className={guestRecommendationPageStyles.searchError}>
                        {searchErrorMessage}
                    </p>
                )}

                <div className={guestRecommendationPageStyles.mapContainer}>
                    <KakaoMapView
                        centerLatitude={location.latitude}
                        centerLongitude={location.longitude}
                        level={location.level}
                        radiusMeters={location.radiusMeters}
                        searchKeyword={searchKeyword}
                        onCenterChanged={onCenterChange}
                        onAddressChanged={onAddressChange}
                        onSearchFailed={onSearchFailed}
                    />

                    <div
                        className={guestRecommendationPageStyles.centerPin}
                        aria-hidden="true"
                    >
                        <MapPin size={34} fill="currentColor" />
                    </div>
                </div>

                <div className={guestRecommendationPageStyles.selectedLocation}>
                    <div className={guestRecommendationPageStyles.selectedLocationIcon}>
                        <MapPin size={17} aria-hidden="true" />
                    </div>

                    <div className={guestRecommendationPageStyles.selectedLocationText}>
                        <span className={guestRecommendationPageStyles.selectedLocationLabel}>
                            현재 선택된 위치
                        </span>

                        <strong className={guestRecommendationPageStyles.selectedAddress}>
                            {location.address}
                        </strong>
                    </div>
                </div>

                <div className={guestRecommendationPageStyles.radiusArea}>
                    <div className={guestRecommendationPageStyles.radiusHeader}>
                        <div>
                            <h3 className={guestRecommendationPageStyles.radiusTitle}>
                                맛집 검색 반경
                            </h3>

                            <p className={guestRecommendationPageStyles.radiusDescription}>
                                선택한 위치를 기준으로 맛집을 검색할 범위예요.
                            </p>
                        </div>

                        <span className={guestRecommendationPageStyles.radiusValue}>
                            {formatLocationRadius(location.radiusMeters)}
                        </span>
                    </div>

                    <div className={guestRecommendationPageStyles.radiusOptions}>
                        {LOCATION_RADIUS_OPTIONS.map((radiusMeters) => {
                            const isSelected =
                                location.radiusMeters === radiusMeters;

                            return (
                                <button
                                    key={radiusMeters}
                                    type="button"
                                    onClick={() => onRadiusChange(radiusMeters)}
                                    aria-pressed={isSelected}
                                    className={
                                        isSelected
                                            ? guestRecommendationPageStyles.selectedRadiusButton
                                            : guestRecommendationPageStyles.radiusButton
                                    }
                                >
                                    {formatLocationRadius(radiusMeters)}
                                </button>
                            );
                        })}
                    </div>
                </div>

                <div className={guestRecommendationPageStyles.locationGuide}>
                    <Info
                        size={17}
                        className={guestRecommendationPageStyles.guideIcon}
                        aria-hidden="true"
                    />

                    <span>
                        주소를 검색하거나 지도를 움직여 원하는 위치를 설정할 수 있어요.
                    </span>
                </div>
            </div>
        </section>
    );
}