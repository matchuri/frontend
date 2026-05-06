import { atom } from "jotai";
import type { FindIdState } from "@/features/findId/domain/state/FindIdState";

export const findIdAtom = atom<FindIdState>({
    status: "EMAIL_INPUT",
});