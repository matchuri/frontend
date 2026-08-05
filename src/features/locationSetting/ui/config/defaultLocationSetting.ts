import type { LocationSetting } from "@/features/locationSetting/domain/model/LocationSetting";

import { DEFAULT_LOCATION_RADIUS_METERS } from "@/features/locationSetting/domain/config/locationRadiusPolicy";
import { DEFAULT_MAP_LEVEL } from "@/features/map/domain/config/mapPolicy";

export const defaultLocationSetting: LocationSetting = {
    address: "서울특별시 강남구 강남대로 396",

    latitude: 37.497942,
    longitude: 127.027621,

    radiusMeters:
        DEFAULT_LOCATION_RADIUS_METERS,
    level: DEFAULT_MAP_LEVEL,
};