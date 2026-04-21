import type { TermsAgreement } from "@/features/terms/domain/model/termsAgreement";

const TERMS_AGREEMENT_KEY = "terms_agreement";

export const termsStorage = {
    save: (agreements: TermsAgreement[]) => {
        sessionStorage.setItem(TERMS_AGREEMENT_KEY, JSON.stringify(agreements));
    },

    load: (): TermsAgreement[] | null => {
        const data = sessionStorage.getItem(TERMS_AGREEMENT_KEY);
        return data ? JSON.parse(data) as TermsAgreement[]: null;
    },

    clear: () => {
        sessionStorage.removeItem(TERMS_AGREEMENT_KEY);
    },
};