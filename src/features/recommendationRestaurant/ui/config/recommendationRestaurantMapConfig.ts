export const NORMAL_MARKER_SIZE = 34;
export const SELECTED_MARKER_SIZE = 44;
export const LOCATION_MARKER_SIZE = 38;

export const DEFAULT_MAP_BOUNDS_PADDING = 32;
export const RESTAURANT_MARKER_COLLISION_DISTANCE_PX = 28;

const GROUP_BADGE_HEIGHT = 18;

export interface RestaurantMarkerGroupItem {
    readonly restaurantId: string;
    readonly restaurantName: string;
}

function createMarkerImage(
    svg: string,
    width: number,
    height: number,
    offsetX: number,
    offsetY: number,
) {
    return new window.kakao.maps.MarkerImage(
        `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`,
        new window.kakao.maps.Size(width, height),
        {
            offset: new window.kakao.maps.Point(offsetX, offsetY),
        },
    );
}

export function createRestaurantMarkerImage(
    selected: boolean,
    count = 1,
) {
    const markerSize = selected ? SELECTED_MARKER_SIZE : NORMAL_MARKER_SIZE;
    const fillColor = selected ? "#FB6F00" : "#2563EB";
    const hasGroupBadge = count > 1;

    const imageHeight =
        markerSize + (hasGroupBadge ? GROUP_BADGE_HEIGHT : 0);

    const markerTop =
        hasGroupBadge ? GROUP_BADGE_HEIGHT : 0;

    const badge = hasGroupBadge
        ? `
            <circle
                cx="${markerSize / 2}"
                cy="10"
                r="9"
                fill="${fillColor}"
                stroke="white"
                stroke-width="2"
            />
            <text
                x="${markerSize / 2}"
                y="10.5"
                fill="white"
                font-size="11"
                font-family="Arial, sans-serif"
                font-weight="700"
                text-anchor="middle"
                dominant-baseline="middle"
            >
                ${count}
            </text>
        `
        : "";

    const svg = `
        <svg
            width="${markerSize}"
            height="${imageHeight}"
            viewBox="0 0 ${markerSize} ${imageHeight}"
            xmlns="http://www.w3.org/2000/svg"
        >
            ${badge}

            <svg
                x="0"
                y="${markerTop}"
                width="${markerSize}"
                height="${markerSize}"
                viewBox="0 0 48 48"
            >
                <path
                    d="M24 3C15.7 3 9 9.7 9 18c0 11 15 27 15 27s15-16 15-27C39 9.7 32.3 3 24 3Z"
                    fill="${fillColor}"
                    stroke="white"
                    stroke-width="3"
                />

                <circle
                    cx="24"
                    cy="18"
                    r="6"
                    fill="white"
                />
            </svg>
        </svg>
    `;

    return createMarkerImage(
        svg,
        markerSize,
        imageHeight,
        markerSize / 2,
        imageHeight,
    );
}

export function createLocationMarkerImage() {
    const svg = `
        <svg
            width="${LOCATION_MARKER_SIZE}"
            height="${LOCATION_MARKER_SIZE}"
            viewBox="0 0 48 48"
            xmlns="http://www.w3.org/2000/svg"
        >
            <circle
                cx="24"
                cy="24"
                r="14"
                fill="#FB6F00"
                stroke="white"
                stroke-width="4"
            />

            <circle
                cx="24"
                cy="24"
                r="5"
                fill="white"
            />
        </svg>
    `;

    return createMarkerImage(
        svg,
        LOCATION_MARKER_SIZE,
        LOCATION_MARKER_SIZE,
        LOCATION_MARKER_SIZE / 2,
        LOCATION_MARKER_SIZE / 2,
    );
}

export function createRestaurantNameOverlayContent(
    restaurantName: string,
) {
    const element = document.createElement("div");

    element.textContent = restaurantName;

    Object.assign(element.style, {
        maxWidth: "160px",
        padding: "7px 10px",
        border: "1px solid #E5E7EB",
        borderRadius: "8px",
        backgroundColor: "#FFFFFF",
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.12)",
        color: "#111827",
        fontSize: "12px",
        fontWeight: "600",
        lineHeight: "16px",
        textAlign: "center",
        whiteSpace: "normal",
        wordBreak: "keep-all",
        pointerEvents: "none",
    });

    return element;
}

export function createRestaurantSelectionOverlayContent(
    restaurants: readonly RestaurantMarkerGroupItem[],
    onSelectRestaurant: (restaurantId: string) => void,
) {
    const container = document.createElement("div");

    Object.assign(container.style, {
        display: "flex",
        flexDirection: "column",
        minWidth: "160px",
        maxWidth: "220px",
        overflow: "hidden",
        border: "1px solid #E5E7EB",
        borderRadius: "10px",
        backgroundColor: "#FFFFFF",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.16)",
    });

    const stopPropagation = (event: Event) => {
        event.stopPropagation();
    };

    container.addEventListener("mousedown", stopPropagation);
    container.addEventListener("pointerdown", stopPropagation);
    container.addEventListener("touchstart", stopPropagation);
    container.addEventListener("click", stopPropagation);

    restaurants.forEach(
        (restaurant, index) => {
            const button = document.createElement("button");

            button.type = "button";
            button.textContent = restaurant.restaurantName;

            Object.assign(button.style, {
                width: "100%",
                padding: "10px 12px",
                border: "0",
                borderTop:
                    index === 0 ? "0" : "1px solid #F3F4F6",
                backgroundColor: "#FFFFFF",
                color: "#111827",
                cursor: "pointer",
                fontSize: "12px",
                fontWeight: "600",
                lineHeight: "17px",
                textAlign: "left",
                whiteSpace: "normal",
                wordBreak: "keep-all",
            });

            button.addEventListener("mouseenter",
                () => {
                    button.style.backgroundColor = "#F9FAFB";
                },
            );

            button.addEventListener("mouseleave",
                () => {
                    button.style.backgroundColor = "#FFFFFF";
                },
            );

            button.addEventListener("click",
                (event) => {
                    event.preventDefault();
                    event.stopPropagation();

                    window.kakao.maps.event.preventMap();

                    onSelectRestaurant(
                        restaurant.restaurantId,
                    );
                },
            );

            container.appendChild(button);
        },
    );

    return container;
}