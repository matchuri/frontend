export interface TermSection {
  readonly title: string;
  readonly content: string[];
}

export interface TermGroup {
  readonly name: string;
  readonly required: boolean;
  readonly sections: TermSection[];
}
