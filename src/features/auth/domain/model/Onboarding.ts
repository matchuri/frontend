// 서버가 내려주는 onboarding 구조를 타입으로 정의
export type OnboardingNextStep =
    | "REQUIRED_AGREEMENTS"
    | "REQUIRED_NICKNAME"
    | "READY";

export interface OnboardingState {
    readonly requiredAgreementsCompleted: boolean;
    readonly nicknameCompleted: boolean;
    readonly completed: boolean;
    readonly nextStep: OnboardingNextStep;
}