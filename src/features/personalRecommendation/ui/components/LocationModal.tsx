"use client";

import {
    Check,
    ChevronLeft,
    Crosshair,
    Info,
    MapPin,
    Search,
} from "lucide-react";

import { locationModalStyles } from "@/ui/styles/locationModalStyles";
import KakaoMapView from "@/features/map/ui/components/KakaoMapView";

interface LocationModalProps {
    readonly isOpen: boolean;
    readonly onClose: () => void;
    readonly address: string;
}

export default function LocationModal({
    isOpen,
    onClose,
    address,
}: LocationModalProps) {
    if (!isOpen) return null;

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
                        <h2 className={locationModalStyles.title}>
                            위치 등록
                        </h2>

                        <p className={locationModalStyles.description}>
                            주변 맛집 추천을 위해 위치를 등록해주세요.
                        </p>
                    </div>
                </header>

                <div className={locationModalStyles.mapSection}>
                    <div className={locationModalStyles.searchBar}>
                        <Search size={20} />

                        <input
                            type="text"
                            placeholder="주소 또는 장소 이름 검색"
                            className={locationModalStyles.searchInput}
                        />

                        <button
                            type="button"
                            className={locationModalStyles.locationButton}
                        >
                            <Crosshair size={20} />
                        </button>
                    </div>

                    <div className={locationModalStyles.mapContainer}>
                        <KakaoMapView
                            centerLatitude={37.497942}
                            centerLongitude={127.027621}
                            level={4}
                            onCenterChanged={(center) => {
                                console.log("지도 중심 좌표:", center);
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
                                {address}
                            </strong>
                        </div>
                    </div>
                </div>

                <footer className={locationModalStyles.footer}>
                    <div className={locationModalStyles.guideBox}>
                        <Info size={18} />

                        <p>지도를 드래그하여 정확한 위치를 지정하세요.</p>
                    </div>

                    <button
                        type="button"
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