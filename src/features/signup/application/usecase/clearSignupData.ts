import { preferenceAtom } from "@/features/preference/application/atoms/preferenceAtom";
import { accountStorage } from "@/features/signup/infrastructure/storage/accountStorage";
import { nicknameStorage } from "@/features/signup/infrastructure/storage/nicknameStorage";
import { signupOnboardingModeStorage } from "@/features/signup/infrastructure/storage/signupOnboardingModeStorage";
import { signupTasteProfileStorage } from "@/features/signup/infrastructure/storage/signupTasteProfileStorage";
import { termsStorage } from "@/features/terms/infrastructure/storage/termsStorage";
import { jotaiStore } from "@/shared/lib/jotaiStore";

export function clearSignupData() {
    accountStorage.clear();
    termsStorage.clear();
    nicknameStorage.clear();
    signupTasteProfileStorage.clear();
    signupOnboardingModeStorage.clear();

    jotaiStore.set(preferenceAtom, {
        status: "LOADING",
    });
}