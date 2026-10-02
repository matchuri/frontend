import { atom } from "jotai";
import type { FindIdState } from "@/features/findId/domain/state/FindIdState";

export const initialFindIdState: FindIdState = {
    status: "EMAIL_INPUT",
};

export const findIdAtom = atom<FindIdState>(initialFindIdState);