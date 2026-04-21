"use client";

import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { getTerms } from "@/features/terms/domain/model/getTerms";
import TermGroupItem from "@/features/terms/ui/components/TermGroupItem";
import { termsPageStyles } from "@/ui/styles/termsPageStyles";
import { termsStorage } from "@/features/terms/infrastructure/storage/termsStorage";
import { accountStorage } from "@/features/auth/infrastructure/storage/accountStorage";

export default function TermsPage() {
  const router = useRouter();
  const terms = getTerms();
//   const [ready, setReady] = useState(false);

  const [checkedMap, setCheckedMap] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(terms.map((t) => [t.name, false])),
  );

  const allChecked = terms.every((t) => checkedMap[t.name]);
  const requiredAllChecked = useMemo(
    () => terms.filter((t) => t.required).every((t) => checkedMap[t.name]),
    [terms, checkedMap],
  );

  const handleToggle = (name: string) => {
    setCheckedMap((prev) => ({ ...prev, [name]: !prev[name] }));
  };

  const handleToggleAll = () => {
    const next = !allChecked;
    setCheckedMap(Object.fromEntries(terms.map((t) => [t.name, next])));
  };

  const handleSubmit = () => {
    const agreements = terms.map((t) => ({
      agreementType: t.type,
      agreementVersion: t.version,
      agreed: checkedMap[t.name],
    }));

    termsStorage.save(agreements);
    router.push("/signup/nickname/");
  };

  useEffect(() => {
    const profile = accountStorage.load();

    if (!profile) {
      router.replace("/signup");
      return;
    }

  }, [router]);

  return (
    <div className={termsPageStyles.container}>
      <div className={termsPageStyles.card}>
        <div className="flex flex-col items-center gap-2">
          <h1 className={termsPageStyles.title}>약관 동의</h1>
          <p className={termsPageStyles.description}>
            서비스 이용을 위해 약관에 동의해주세요
          </p>
        </div>

        <div className={termsPageStyles.termList}>
          <label className={termsPageStyles.allAgreeRow}>
            <input
              type="checkbox"
              checked={allChecked}
              onChange={handleToggleAll}
              className={termsPageStyles.allAgreeCheckbox}
            />
            <span className={termsPageStyles.allAgreeLabel}>전체 동의</span>
          </label>

          {terms.map((termGroup) => (
            <TermGroupItem
              key={termGroup.name}
              termGroup={termGroup}
              checked={checkedMap[termGroup.name]}
              onToggle={() => handleToggle(termGroup.name)}
            />
          ))}
        </div>

        <button
          type="button"
          disabled={!requiredAllChecked}
          onClick={handleSubmit}
          className={
            requiredAllChecked
              ? termsPageStyles.submitButton
              : termsPageStyles.submitButtonDisabled
          }
        >
          동의하고 계속하기
        </button>
      </div>
    </div>
  );
}
