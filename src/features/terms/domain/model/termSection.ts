export interface TermSection {
  readonly title: string;
  readonly content: string[];
}

export type AgreementType =
  | "TERMS_OF_SERVICE"
  | "PRIVACY_POLICY";

export interface TermGroup {
  readonly type: AgreementType; // 서버 전송용
  readonly version: string; // 서버 전송용
  readonly name: string; // 화면 표시용
  readonly required: boolean;
  readonly sections: TermSection[];
}
