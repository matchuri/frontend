import type { AgreementType } from "@/features/terms/domain/model/termSection";

export interface TermsAgreement {
  readonly agreementType: AgreementType;
  readonly agreementVersion: string;
  readonly agreed: boolean;
}
