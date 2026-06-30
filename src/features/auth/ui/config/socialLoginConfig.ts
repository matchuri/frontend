import { googleButtonStyles } from "@/ui/styles/googleButtonStyles";
import { kakaoButtonStyles } from "@/ui/styles/kakaoButtonStyles";
import { naverButtonStyles } from "@/ui/styles/naverButtonStyles";
import type { AuthProvider } from "../../domain/model/AuthProvider";

export const socialLoginConfig: Record<
    AuthProvider,
    {
        text: string;
        className: string;
        // icon: string; // 일단 이미지 경로 기준
    }
> = {
    GOOGLE: {
        text: "Google 계정으로 계속하기",
        className: `${googleButtonStyles.base} ${googleButtonStyles.default}`,
        // icon: "/icons/google.svg",
    },
    KAKAO: {
        text: "Kakao 계정으로 계속하기",
        className: `${kakaoButtonStyles.base} ${kakaoButtonStyles.default}`,
        // icon: "/icons/kakao.svg",
    },
    NAVER: {
        text: "Naver 계정으로 계속하기",
        className: `${naverButtonStyles.base} ${naverButtonStyles.default}`,
        // icon: "/icons/naver.svg",
    },
};