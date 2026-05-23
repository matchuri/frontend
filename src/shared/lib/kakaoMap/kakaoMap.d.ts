// 카카오 지도 SDK를 TypeScript에서 사용할 수 있게 타입 정의
export {};

declare global {
    interface Window {
        kakao?: typeof kakao;
    }

    namespace kakao.maps {
        function load(callback: () => void): void;

        // 위도/경도
        class LatLng {
            constructor(lat: number, lng: number);
            getLat(): number;
            getLng(): number;
        }

        // 실제 카카오 지도 객체
        class Map {
            constructor(container: HTMLElement, options: MapOptions);
            getCenter(): LatLng; // 현재 지도 중심 좌표
            setCenter(latlng: LatLng): void; // 지도 중심을 특정 좌표로 이동
            relayout(): void; // 레이아웃을 계산
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
    }
}