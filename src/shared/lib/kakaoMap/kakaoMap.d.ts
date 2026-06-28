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
            panTo(latlng: LatLng): void;

            getBounds(): LatLngBounds;
            getLevel(): number;
            setLevel(level: number): void;

            relayout(): void;
        }

        class Marker {
            constructor(options: MarkerOptions);
            setMap(map: Map | null): void;
        }

        class InfoWindow {
            constructor(options: InfoWindowOptions);
            open(map: Map, marker: Marker): void;
            close(): void;
        }

        class LatLngBounds {
            getSouthWest(): LatLng;
            getNorthEast(): LatLng;
        }

        interface MapOptions {
            center: LatLng;
            level: number;
        }

        interface MarkerOptions {
            map?: Map;
            position: LatLng;
        }

        interface InfoWindowOptions {
            content: string;
        }

        namespace event {
            function addListener(
                target: Map | Marker,
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

            const SortBy: {
                readonly DISTANCE: string;
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
                    options?: KeywordSearchOptions,
                ): void;
            }

            interface KeywordSearchOptions {
                readonly location?: LatLng;
                readonly radius?: number;
                readonly sort?: string;
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
                readonly id: string;
                readonly place_name: string;
                readonly address_name: string;
                readonly road_address_name: string;
                readonly phone: string;
                readonly place_url: string;
                readonly distance?: string;
                readonly x: string;
                readonly y: string;
            }
        }
    }
}