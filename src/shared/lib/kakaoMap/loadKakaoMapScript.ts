import { captureExternalSdkError } from "@/infrastructure/monitoring/sentryMonitoring";

// 카카오 지도 SDK script를 동적으로 불러옴
const KAKAO_MAP_SCRIPT_ID = "kakao-map-sdk";

export class KakaoMapSdkLoadError extends Error {
    constructor() {
        super("카카오 지도 SDK 로드에 실패했습니다.");

        this.name = "KakaoMapSdkLoadError";
    }
}

export function loadKakaoMapScript(appKey: string): Promise<void> {
    return new Promise((resolve, reject) => {
        if (window.kakao?.maps) {
            window.kakao.maps.load(resolve);
            return;
        }

        const existingScript = document.getElementById(KAKAO_MAP_SCRIPT_ID);

        if (existingScript) {
            existingScript.addEventListener("load", () => {
                window.kakao?.maps.load(resolve);
            });

            return;
        }

        const script = document.createElement("script");

        script.id = KAKAO_MAP_SCRIPT_ID;
        script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${appKey}&libraries=services&autoload=false`;
        script.async = true;

        script.onload = () => {
            window.kakao?.maps.load(resolve);
        };

        script.onerror = () => {
            const error = new KakaoMapSdkLoadError();

            captureExternalSdkError({
                error,
                sdk: "kakao_map",
                operation: "sdk_load",
            });

            reject(error);
        };

        document.head.appendChild(script);
    });
}