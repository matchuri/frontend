export function getAddressFromCenter(
    map: kakao.maps.Map,
    geocoder: kakao.maps.services.Geocoder,
    onAddressChanged?: (address: string) => void,
) {
    const center = map.getCenter();

    geocoder.coord2Address(
        center.getLng(),
        center.getLat(),
        (result, status) => {
            if (status !== window.kakao?.maps.services.Status.OK) return;

            const address =
                result[0]?.road_address?.address_name ??
                result[0]?.address?.address_name;

            if (address) {
                onAddressChanged?.(address);
            }
        },
    );
}