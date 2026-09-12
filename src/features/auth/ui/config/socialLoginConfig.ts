import type { AuthProvider } from "@/features/auth/domain/model/AuthProvider";
import { googleButtonStyles } from "@/ui/styles/googleButtonStyles";
import { kakaoButtonStyles } from "@/ui/styles/kakaoButtonStyles";
import { naverButtonStyles } from "@/ui/styles/naverButtonStyles";

export const socialLoginConfig: Record<
    AuthProvider,
    {
        text: string;
        ariaLabel: string;
        icon: string;
        className: string;
    }
> = {
    GOOGLE: {
        text: "Google 계정으로 계속하기",
        ariaLabel: "Google 계정으로 로그인",
        icon: "/images/social/google.png",
        className: `${googleButtonStyles.base} ${googleButtonStyles.default}`,
    },
    KAKAO: {
        text: "Kakao 계정으로 계속하기",
        ariaLabel: "Kakao 계정으로 로그인",
        icon: "/images/social/kakao.png",
        className: `${kakaoButtonStyles.base} ${kakaoButtonStyles.default}`,
    },
    NAVER: {
        text: "Naver 계정으로 계속하기",
        ariaLabel: "Naver 계정으로 로그인",
        icon: "/images/social/naver.png",
        className: `${naverButtonStyles.base} ${naverButtonStyles.default}`,
    },
};