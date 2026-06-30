"use client";

import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { useAtomValue } from "jotai";

import { getTerms } from "@/features/terms/domain/model/getTerms";
import TermGroupItem from "@/features/terms/ui/components/TermGroupItem";
import { termsPageStyles } from "@/ui/styles/termsPageStyles";
import { termsStorage } from "@/features/terms/infrastructure/storage/termsStorage";

import { onboardingAtom } from "@/features/auth/application/selectors/authSelectors";
import { useSubmitRequiredAgreements } from "@/features/auth/application/hooks/useSubmitRequiredAgreements";
import { getOnboardingRoute } from "@/features/auth/application/onboarding/getOnboardingRoute";

export default function TermsPage() {
  const router = useRouter();
  const terms = getTerms();

  const onboarding = useAtomValue(onboardingAtom);
  const { submit, isSubmitting } = useSubmitRequiredAgreements();

  const shouldSubmitAgreementsToServer = onboarding?.nextStep === "REQUIRED_AGREEMENTS";

  const [checkedMap, setCheckedMap] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(terms.map((t) => [t.name, false])),
  );

  // 소셜 온보딩인데 이미 약관 단계가 아니면 맞는 페이지로 이동
  useEffect(() => {
    if (!onboarding) return;

    if (onboarding.nextStep !== "REQUIRED_AGREEMENTS") {
      router.replace(getOnboardingRoute(onboarding.nextStep));
    }
  }, [onboarding, router]);

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

  const handleSubmit = async () => {
    const agreements = terms.map((term) => ({
      agreementType: term.type,
      agreementVersion: term.version,
      agreed: checkedMap[term.name],
    }));

    // 일반 회원가입: 서버 호출 없이 로컬에 저장
    if (!shouldSubmitAgreementsToServer) {
      termsStorage.save(agreements);
      router.push("/signup/nickname");
      return;
    }

    // 소셜 온보딩: 약관 동의 정보를 서버로 제출
    await submit(
      agreements
        .filter((agreement) => agreement.agreed)
        .map((agreement) => ({
          agreementType: agreement.agreementType,
          agreementVersion: agreement.agreementVersion,
        })),
    );
  };

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
          disabled={!requiredAllChecked || isSubmitting}
          onClick={handleSubmit}
          className={
            requiredAllChecked && !isSubmitting
              ? termsPageStyles.submitButton
              : termsPageStyles.submitButtonDisabled
          }
        >
          {isSubmitting ? "처리 중..." : "동의하고 계속하기"}
        </button>
      </div>
    </div>
  );
}
