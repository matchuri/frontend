import {
    useEffect,
    useRef,
    useState,
} from "react";
import type {
    PointerEvent,
    WheelEvent,
} from "react";

import { ArrowLeft } from "lucide-react";

import type { LocationSetting } from "@/features/locationSetting/domain/model/LocationSetting";
import { formatLocationRadius } from "@/features/locationSetting/domain/config/locationRadiusPolicy";

import type { RecommendationRestaurant } from "@/features/recommendationRestaurant/domain/model/RecommendationRestaurant";
import type { RecommendationRestaurantSearchContext } from "@/features/recommendationRestaurant/domain/model/RecommendationRestaurantSearchContext";

import RecommendationRestaurantMap from "@/features/recommendationRestaurant/ui/components/RecommendationRestaurantMap";
import GuestRecommendationRestaurantCard from "@/features/guestRecommendation/ui/components/GuestRecommendationRestaurantCard";
import {
    clampSheetHeight,
    getInitialSheetHeight,
    getMaximumSheetHeight,
    getMinimumSheetHeight,
    SHEET_WHEEL_MULTIPLIER,
} from "@/features/guestRecommendation/ui/config/guestRecommendationBottomSheetConfig";

import { guestRecommendationRestaurantPageStyles } from "@/ui/styles/guestRecommendationRestaurantPageStyles";

const MAP_BOUNDS_HORIZONTAL_PADDING = 32;
const MAP_BOUNDS_TOP_PADDING = 48;

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
    const [sheetHeight, setSheetHeight] =
        useState<number | null>(null);

    const dragStartYRef = useRef<number | null>(null);
    const dragStartHeightRef = useRef<number | null>(null);
    const restaurantListRef = useRef<HTMLDivElement | null>(null);
    const restaurantCardRefs = useRef<Map<string, HTMLElement>>(new Map());

    const getViewportHeight = () => {
        if (typeof window === "undefined") {
            return 800;
        }

        return window.innerHeight;
    };

    const currentSheetHeight =
        sheetHeight ??
        getInitialSheetHeight(
            getViewportHeight(),
        );

    const updateSheetHeight = (
        height: number,
    ) => {
        setSheetHeight(
            clampSheetHeight(
                height,
                getViewportHeight(),
            ),
        );
    };

    const mapBoundsBottomPadding =
        Math.round(currentSheetHeight) + 24;

    const handleDragStart = (
        event: PointerEvent<HTMLButtonElement>,
    ) => {
        event.stopPropagation();

        event.currentTarget.setPointerCapture(event.pointerId);

        dragStartYRef.current = event.clientY;
        dragStartHeightRef.current = currentSheetHeight;
    };

    const handleDragMove = (
        event: PointerEvent<HTMLButtonElement>,
    ) => {
        if (dragStartYRef.current === null ||
            dragStartHeightRef.current === null
        ) {
            return;
        }

        const movedDistance = dragStartYRef.current - event.clientY;

        updateSheetHeight(
            dragStartHeightRef.current + movedDistance,
        );
    };

    const handleDragEnd = (
        event: PointerEvent<HTMLButtonElement>,
    ) => {
        if (dragStartYRef.current === null ||
            dragStartHeightRef.current === null
        ) {
            return;
        }

        if (event.currentTarget.hasPointerCapture(event.pointerId)) {
            event.currentTarget.releasePointerCapture(
                event.pointerId,
            );
        }

        dragStartYRef.current = null;
        dragStartHeightRef.current = null;
    };

    const handleSheetWheel = (
        event: WheelEvent<HTMLElement>,
    ) => {
        const viewportHeight = getViewportHeight();
        const minimumSheetHeight = getMinimumSheetHeight(viewportHeight);
        const maximumSheetHeight = getMaximumSheetHeight(viewportHeight);
        const restaurantList = restaurantListRef.current;
        const isAtMaximumHeight = currentSheetHeight >= maximumSheetHeight - 1;

        if (event.deltaY < 0) {
            if (isAtMaximumHeight &&
                restaurantList &&
                restaurantList.scrollTop > 0
            ) {
                return;
            }

            if (currentSheetHeight > minimumSheetHeight) {
                event.preventDefault();

                updateSheetHeight(
                    currentSheetHeight + event.deltaY * SHEET_WHEEL_MULTIPLIER,
                );
            }

            return;
        }

        if (event.deltaY > 0) {
            if (isAtMaximumHeight && restaurantList) {
                const maximumScrollTop =
                    restaurantList.scrollHeight -
                    restaurantList.clientHeight;

                if (restaurantList.scrollTop <
                    maximumScrollTop - 1
                ) {
                    return;
                }
            }

            if (currentSheetHeight < maximumSheetHeight) {
                event.preventDefault();

                updateSheetHeight(
                    currentSheetHeight + event.deltaY * SHEET_WHEEL_MULTIPLIER,
                );
            }
        }
    };

    useEffect(() => {
        if (!selectedRestaurantId) {
            return;
        }

        const restaurantList = restaurantListRef.current;
        const selectedRestaurantCard =
            restaurantCardRefs.current.get(selectedRestaurantId);

        if (!restaurantList || !selectedRestaurantCard) {
            return;
        }

        const listRect =
            restaurantList.getBoundingClientRect();

        const cardRect =
            selectedRestaurantCard.getBoundingClientRect();

        const isCardOutsideViewport =
            cardRect.top < listRect.top ||
            cardRect.bottom > listRect.bottom;

        if (!isCardOutsideViewport) {
            return;
        }

        selectedRestaurantCard.scrollIntoView({
            behavior: "smooth",
            block: "nearest",
        });
    }, [selectedRestaurantId]);

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
                boundsPaddingTop={MAP_BOUNDS_TOP_PADDING}
                boundsPaddingRight={MAP_BOUNDS_HORIZONTAL_PADDING}
                boundsPaddingBottom={mapBoundsBottomPadding}
                boundsPaddingLeft={MAP_BOUNDS_HORIZONTAL_PADDING}
            />

            <section
                onClick={clearRestaurantSelection}
                onWheel={handleSheetWheel}
                style={{height: `${currentSheetHeight}px`}}
                className={guestRecommendationRestaurantPageStyles.content}
            >
                <button
                    type="button"
                    onClick={(event) => {event.stopPropagation();}}
                    onPointerDown={handleDragStart}
                    onPointerMove={handleDragMove}
                    onPointerUp={handleDragEnd}
                    onPointerCancel={handleDragEnd}
                    className={guestRecommendationRestaurantPageStyles.sheetHandleButton}
                    aria-label="바텀 시트 높이 조절"
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
                    !errorMessage && restaurants.length > 0 && (
                        <div
                            ref={restaurantListRef}
                            className={guestRecommendationRestaurantPageStyles.restaurantList}
                        >
                            {restaurants.map(
                                (restaurant) => (
                                    <GuestRecommendationRestaurantCard
                                        key={restaurant.id}
                                        restaurant={restaurant}
                                        selected={restaurant.id === selectedRestaurantId}
                                        onSelect={() => selectRestaurant(restaurant.id)}
                                        cardRef={(element) => {
                                            if (element) {
                                                restaurantCardRefs.current.set(
                                                    restaurant.id,
                                                    element,
                                                );
                                                return;
                                            }

                                            restaurantCardRefs.current.delete(
                                                restaurant.id,
                                            );
                                        }}
                                    />
                                ),
                            )}
                        </div>
                    )}
            </section>
        </main>
    );
}