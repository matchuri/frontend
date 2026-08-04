export const LOCATION_RADIUS_OPTIONS = [
    1000,
    3000,
    5000,
] as const;

export type LocationRadiusMeters =
    (typeof LOCATION_RADIUS_OPTIONS)[number];

export const DEFAULT_LOCATION_RADIUS_METERS: LocationRadiusMeters = 1000;

export const MAX_RESTAURANT_SEARCH_RADIUS_METERS: LocationRadiusMeters =
    LOCATION_RADIUS_OPTIONS[LOCATION_RADIUS_OPTIONS.length - 1];

export function isLocationRadiusMeters(
    value: number,
): value is LocationRadiusMeters {
    return LOCATION_RADIUS_OPTIONS.some(
        (radiusMeters) => radiusMeters === value,
    );
}

export function createRestaurantSearchRadiusSteps(
    baseRadiusMeters: number,
): readonly LocationRadiusMeters[] {
    if (!isLocationRadiusMeters(baseRadiusMeters)) {
        return [DEFAULT_LOCATION_RADIUS_METERS];
    }

    return LOCATION_RADIUS_OPTIONS.filter(
        (radiusMeters) => radiusMeters >= baseRadiusMeters,
    );
}