export {};

declare global {
    interface Window {
        kakao?: typeof kakao;
    }

    namespace kakao.maps {
        function load(callback: () => void): void;

        class LatLng {
            constructor(lat: number, lng: number);
            getLat(): number;
            getLng(): number;
        }

        class Map {
            constructor(container: HTMLElement, options: MapOptions);

            getCenter(): LatLng;
            setCenter(latlng: LatLng): void;

            getBounds(): LatLngBounds;
            getLevel(): number;

            relayout(): void;
        }

        class LatLngBounds {
            getSouthWest(): LatLng;
            getNorthEast(): LatLng;
        }

        interface MapOptions {
            center: LatLng;
            level: number;
        }

        namespace event {
            function addListener(
                target: Map,
                type: string,
                callback: () => void,
            ): void;
        }

        namespace services {
            const Status: {
                readonly OK: string;
                readonly ZERO_RESULT: string;
                readonly ERROR: string;
            };

            class Geocoder {
                coord2Address(
                    x: number,
                    y: number,
                    callback: (
                        result: readonly CoordAddressResult[],
                        status: string,
                    ) => void,
                ): void;
            }

            class Places {
                keywordSearch(
                    keyword: string,
                    callback: (
                        result: readonly PlaceSearchResult[],
                        status: string,
                    ) => void,
                ): void;
            }

            interface CoordAddressResult {
                readonly address?: {
                    readonly address_name: string;
                };
                readonly road_address?: {
                    readonly address_name: string;
                };
            }

            interface PlaceSearchResult {
                readonly place_name: string;
                readonly address_name: string;
                readonly road_address_name: string;
                readonly x: string;
                readonly y: string;
            }
        }
    }
}