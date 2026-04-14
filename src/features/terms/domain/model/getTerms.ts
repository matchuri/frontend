import type { TermGroup } from "@/features/terms/domain/model/termSection";
import { TERMS } from "@/features/terms/domain/model/termsData";

export function getTerms(): TermGroup[] {
  return TERMS;
}

export function getRequiredTerms(): TermGroup[] {
  return TERMS.filter((term) => term.required);
}
