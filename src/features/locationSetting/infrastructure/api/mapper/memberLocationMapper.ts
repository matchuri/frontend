import type { LocationSetting } from "@/features/locationSetting/domain/model/LocationSetting";
import type { MemberLocationData } from "@/features/locationSetting/infrastructure/api/dto/MemberLocationResponse";

const DEFAULT_MAP_LEVEL = 4;

export function mapMemberLocation(
    data: MemberLocationData,
    level = DEFAULT_MAP_LEVEL,
): LocationSetting {
    return {
        address: data.address,
        latitude: data.latitude,
        longitude: data.longitude,
        radiusMeters: data.radiusMeters,
        level,
    };
}