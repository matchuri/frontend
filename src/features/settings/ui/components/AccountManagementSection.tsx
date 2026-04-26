"use client";

import { Shield, Save } from "lucide-react";
import { settingsPageStyles } from "@/ui/styles/settingsPageStyles";

interface AccountManagementSectionProps {
    userId?: string;
    showPasswordFields: boolean;
}

export default function AccountManagementSection({
    userId,
    showPasswordFields,
}: AccountManagementSectionProps) {
    return (
        <section className={settingsPageStyles.section}>
            <h2 className={settingsPageStyles.sectionTitle}>
                <Shield size={20} />
                계정 관리
            </h2>

            {showPasswordFields && (
                <>
                    <div className={settingsPageStyles.formGroup}>
                        <div className={settingsPageStyles.disabledInput}>
                            <p className="mb-2 text-xs font-semibold uppercase">
                                USER ID
                            </p>
                            <p>{userId}</p>
                        </div>

                        <label className={settingsPageStyles.label}>
                            새로운 비밀번호
                        </label>
                        <input
                            type="password"
                            placeholder="••••••••••••"
                            className={settingsPageStyles.input}
                        />

                        <label className={settingsPageStyles.label}>
                            비밀번호 확인
                        </label>
                        <input
                            type="password"
                            placeholder="••••••••••••"
                            className={settingsPageStyles.input}
                        />
                    </div>

                    <div className={settingsPageStyles.saveButtonWrapper}>
                        <button type="button" className={settingsPageStyles.saveButton}>
                            저장
                            <Save size={18} />
                        </button>
                    </div>

                    <div className={settingsPageStyles.divider} />
                </>
            )}

            <div className={settingsPageStyles.accountRow}>
                <div>
                    <p className={settingsPageStyles.dangerTitle}>회원 탈퇴</p>
                    <p className={settingsPageStyles.dangerDescription}>
                        계정과 및 데이터를 영구적으로 삭제합니다.
                    </p>
                </div>

                <button type="button" className={settingsPageStyles.dangerButton}>
                    회원 탈퇴
                </button>
            </div>
        </section>
    );
}