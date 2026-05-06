import { atom } from "jotai";
import { findIdAtom } from "@/features/findId/application/atoms/findIdAtom";

export const isEmailInputStepAtom = atom(
    (get) => get(findIdAtom).status === "EMAIL_INPUT",
);

export const isCodeInputStepAtom = atom(
    (get) => get(findIdAtom).status === "CODE_INPUT",
);

export const isFindIdResultStepAtom = atom((get) => {
    const status = get(findIdAtom).status;

    return (
        status === "FOUND" ||
        status === "NOT_FOUND" ||
        status === "ERROR"
    );
});

export const foundIdAtom = atom((get) => {
    const state = get(findIdAtom);

    return state.status === "FOUND" ? state.loginId : null;
});

export const findIdMessageAtom = atom((get) => {
    const state = get(findIdAtom);

    return state.status === "NOT_FOUND" || state.status === "ERROR"
        ? state.message
        : null;
});