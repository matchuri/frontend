import type { LocationSetting } from "@/features/locationSetting/domain/model/LocationSetting";

export const defaultLocationSetting: LocationSetting = {
    address: "서울특별시 강남구 강남대로 396",

    latitude: 37.497942,
    longitude: 127.027621,

    level: 4,

    southWestLatitude: 37.49,
    southWestLongitude: 127.02,

    northEastLatitude: 37.505,
    northEastLongitude: 127.04,
};