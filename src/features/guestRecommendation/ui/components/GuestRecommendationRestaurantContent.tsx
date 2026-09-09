import {
    useRef,
    useState,
} from "react";
import type {
    TouchEvent,
    WheelEvent,
} from "react";

import { ArrowLeft } from "lucide-react";

import type { LocationSetting } from "@/features/locationSetting/domain/model/LocationSetting";
import { formatLocationRadius } from "@/features/locationSetting/domain/config/locationRadiusPolicy";

import type { RecommendationRestaurant } from "@/features/recommendationRestaurant/domain/model/RecommendationRestaurant";
import type { RecommendationRestaurantSearchContext } from "@/features/recommendationRestaurant/domain/model/RecommendationRestaurantSearchContext";

import RecommendationRestaurantMap from "@/features/recommendationRestaurant/ui/components/RecommendationRestaurantMap";
import GuestRecommendationRestaurantCard from "@/features/guestRecommendation/ui/components/GuestRecommendationRestaurantCard";

import { guestRecommendationRestaurantPageStyles } from "@/ui/styles/guestRecommendationRestaurantPageStyles";

type SheetState =
    | "COLLAPSED"
    | "MIDDLE"
    | "EXPANDED";

interface GuestRecommendationRestaurantContentProps {
    readonly menuName: string;
    readonly location: LocationSetting;

    readonly restaurants: readonly RecommendationRestaurant[];
    readonly selectedRestaurant: RecommendationRestaurant | null;
    readonly selectedRestaurantId: string | null;

    readonly searchContext: RecommendationRestaurantSearchContext;

    readonly isLoading: boolean;
    readonly errorMessage: string | null;
    readonly isExpandedSearch: boolean;
    readonly hasNoRestaurants: boolean;
    readonly hasReachedMaximumRadius: boolean;

    readonly selectRestaurant: (restaurantId: string) => void;
    readonly clearRestaurantSelection: () => void;
    readonly onBack: () => void;
}

export default function GuestRecommendationRestaurantContent({
    menuName,
    location,
    restaurants,
    selectedRestaurant,
    selectedRestaurantId,
    searchContext,
    isLoading,
    errorMessage,
    isExpandedSearch,
    hasNoRestaurants,
    hasReachedMaximumRadius,
    selectRestaurant,
    clearRestaurantSelection,
    onBack,
}: GuestRecommendationRestaurantContentProps) {
    const visibleRestaurants =
        selectedRestaurant ? [selectedRestaurant] : restaurants;

    const [sheetState, setSheetState] =
        useState<SheetState>("COLLAPSED");

    const touchStartYRef = useRef<number | null>(null);
    const restaurantListRef = useRef<HTMLDivElement | null>(null);
    const sheetTransitionLockedRef = useRef(false);

    const lockSheetTransition = () => {
        sheetTransitionLockedRef.current = true;

        window.setTimeout(() => {
            sheetTransitionLockedRef.current = false;
        }, 320);
    };

    const moveSheetUp = () => {
        if (sheetTransitionLockedRef.current) {
            return;
        }

        setSheetState((prev) => {
            if (prev === "COLLAPSED") {
                return "MIDDLE";
            }

            if (prev === "MIDDLE") {
                return "EXPANDED";
            }

            return prev;
        });

        lockSheetTransition();
    };

    const moveSheetDown = () => {
        if (sheetTransitionLockedRef.current) {
            return;
        }

        setSheetState((prev) => {
            if (prev === "EXPANDED") {
                return "MIDDLE";
            }

            if (prev === "MIDDLE") {
                return "COLLAPSED";
            }

            return prev;
        });

        lockSheetTransition();
    };

    const handleSheetWheel = (
        event: WheelEvent<HTMLElement>,
    ) => {
        const restaurantList = restaurantListRef.current;

        if (event.deltaY > 0) {
            if (sheetState !== "EXPANDED") {
                moveSheetUp();
            }

            return;
        }

        if (event.deltaY < 0) {
            if (restaurantList && restaurantList.scrollTop > 0) {
                return;
            }

            if (sheetState !== "COLLAPSED") {
                moveSheetDown();
            }
        }
    };

    const handleTouchStart = (
        event: TouchEvent<HTMLElement>,
    ) => {
        touchStartYRef.current =
            event.touches[0]?.clientY ?? null;
    };

    const handleTouchMove = (
        event: TouchEvent<HTMLElement>,
    ) => {
        if (touchStartYRef.current === null) {
            return;
        }

        const currentY = event.touches[0]?.clientY;

        if (currentY === undefined) {
            return;
        }

        const movedDistance = touchStartYRef.current - currentY;

        if (movedDistance > 20) {
            if (sheetState !== "EXPANDED") {
                moveSheetUp();
                touchStartYRef.current = null;
            }

            return;
        }

        if (movedDistance < -20) {
            const restaurantList =
                restaurantListRef.current;

            if (
                restaurantList &&
                restaurantList.scrollTop > 0
            ) {
                return;
            }

            if (sheetState !== "COLLAPSED") {
                moveSheetDown();
                touchStartYRef.current = null;
            }
        }
    };

    const handleTouchEnd = () => {
        touchStartYRef.current = null;
    };

    const handleSheetHandleClick = () => {
        if (sheetState === "EXPANDED") {
            moveSheetDown();
            return;
        }

        moveSheetUp();
    };

    return (
        <main className={guestRecommendationRestaurantPageStyles.page}>
            <header className={guestRecommendationRestaurantPageStyles.header}>
                <button
                    type="button"
                    onClick={onBack}
                    className={guestRecommendationRestaurantPageStyles.backButton}
                    aria-label="메뉴 추천 결과로 돌아가기"
                >
                    <ArrowLeft
                        size={22}
                        aria-hidden="true"
                    />
                </button>

                <h1 className={guestRecommendationRestaurantPageStyles.headerTitle}>
                    주변 맛집
                </h1>

                <div className={guestRecommendationRestaurantPageStyles.headerSpacer}/>
            </header>

            <RecommendationRestaurantMap
                latitude={location.latitude}
                longitude={location.longitude}
                level={location.level}
                restaurants={restaurants}
                selectedRestaurant={selectedRestaurant}
                onSelectRestaurant={selectRestaurant}
                onClearSelection={clearRestaurantSelection}
                sectionClassName={guestRecommendationRestaurantPageStyles.mapArea}
                mapClassName={guestRecommendationRestaurantPageStyles.map}
                showRecenterButton
                recenterButtonClassName={guestRecommendationRestaurantPageStyles.recenterButton}
            />

            <section
                onClick={clearRestaurantSelection}
                onWheel={handleSheetWheel}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
                className={
                    sheetState === "EXPANDED"
                        ? guestRecommendationRestaurantPageStyles.expandedContent
                        : sheetState === "MIDDLE"
                            ? guestRecommendationRestaurantPageStyles.middleContent
                            : guestRecommendationRestaurantPageStyles.content
                }
            >
                <button
                    type="button"
                    onClick={(event) => {
                        event.stopPropagation();
                        handleSheetHandleClick();
                    }}
                    className={guestRecommendationRestaurantPageStyles.sheetHandleButton}
                    aria-label={
                        sheetState === "EXPANDED"
                            ? "바텀 시트 한 단계 내리기"
                            : "바텀 시트 한 단계 올리기"
                    }
                >
                    <span
                        className={guestRecommendationRestaurantPageStyles.sheetHandle}
                        aria-hidden="true"
                    />
                </button>

                <div className={guestRecommendationRestaurantPageStyles.searchSummary}>
                    <div>
                        <span className={guestRecommendationRestaurantPageStyles.eyebrow}>
                            {menuName}
                        </span>

                        <h2 className={guestRecommendationRestaurantPageStyles.title}>
                            주변 맛집을 찾았어요
                        </h2>

                        <p className={guestRecommendationRestaurantPageStyles.address}>
                            {location.address}
                        </p>
                    </div>

                    <span className={guestRecommendationRestaurantPageStyles.radiusBadge}>
                        {formatLocationRadius(
                            searchContext.effectiveRadiusMeters,
                        )}
                    </span>
                </div>

                {isExpandedSearch && (
                    <p className={guestRecommendationRestaurantPageStyles.expandedText}>
                        기본 검색 반경에서 맛집을 찾지 못해 검색 범위를 넓혔어요.
                    </p>
                )}

                {isLoading && (
                    <div className={guestRecommendationRestaurantPageStyles.stateBox}>
                        주변 맛집을 찾고 있어요.
                    </div>
                )}

                {errorMessage && (
                    <div className={guestRecommendationRestaurantPageStyles.errorBox}>
                        {errorMessage}
                    </div>
                )}

                {hasNoRestaurants &&
                    hasReachedMaximumRadius && (
                        <div className={guestRecommendationRestaurantPageStyles.stateBox}>
                            설정한 최대 반경 내에서 맛집을 찾지 못했어요.
                        </div>
                    )}

                {!isLoading &&
                    !errorMessage && visibleRestaurants.length > 0 && (
                        <div
                            ref={restaurantListRef}
                            className={guestRecommendationRestaurantPageStyles.restaurantList}
                        >
                            {visibleRestaurants.map(
                                (restaurant) => (
                                    <GuestRecommendationRestaurantCard
                                        key={restaurant.id}
                                        restaurant={restaurant}
                                        selected={restaurant.id === selectedRestaurantId}
                                        onSelect={() => selectRestaurant(restaurant.id)}
                                    />
                                ),
                            )}
                        </div>
                    )}
            </section>
        </main>
    );
}