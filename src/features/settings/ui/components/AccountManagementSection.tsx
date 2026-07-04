"use client";

import { useState } from "react";
import { Shield, Save, Eye, EyeOff } from "lucide-react";
import { settingsPageStyles } from "@/ui/styles/settingsPageStyles";
import { useChangePassword } from "@/features/settings/application/hooks/useChangePassword";

interface AccountManagementSectionProps {
    userId?: number;
    email?: string;
    showPasswordFields: boolean;
    isLoading?: boolean;
    onClickDeleteMember: () => void;
}

export default function AccountManagementSection({
    userId,
    email,
    showPasswordFields,
    isLoading = false,
    onClickDeleteMember,
}: AccountManagementSectionProps) {
    const {
        currentPassword,
        newPassword,
        newPasswordConfirm,
        passwordMessage,
        confirmMessage,
        isSaving,
        canChangePassword,
        setCurrentPassword,
        setNewPassword,
        setNewPasswordConfirm,
        submit,
    } = useChangePassword();

    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    return (
        <section className={settingsPageStyles.section}>
            <h2 className={settingsPageStyles.sectionTitle}>
                <Shield size={20} />
                계정 관리
            </h2>

            {isLoading ? (
                <>
                    <div className={settingsPageStyles.formGroup}>
                        <div className={settingsPageStyles.skeletonDisabledInput} />
                        <div className={settingsPageStyles.skeletonDisabledInputWithMargin} />
                        <div className={settingsPageStyles.skeletonInput} />
                        <div className={settingsPageStyles.skeletonInput} />
                    </div>

                    <div className={settingsPageStyles.saveButtonWrapper}>
                        <div className={settingsPageStyles.skeletonSaveButton} />
                    </div>

                    <div className={settingsPageStyles.divider} />
                </>
            ) : (
                showPasswordFields && (
                    <>
                        <div className={settingsPageStyles.formGroup}>
                            <div className={settingsPageStyles.disabledInput}>
                                <p className="mb-2 text-xs font-semibold uppercase">
                                    USER ID
                                </p>
                                <p>{userId}</p>
                            </div>

                            <div className={`${settingsPageStyles.disabledInput} mb-4`}>
                                <p className="mb-2 text-xs font-semibold uppercase">
                                    EMAIL
                                </p>
                                <p>{email}</p>
                            </div>

                            <label className={settingsPageStyles.label}>
                                현재 비밀번호
                            </label>
                            <div className={settingsPageStyles.passwordInputWrapper}>
                                <input
                                    type={showCurrentPassword ? "text" : "password"}
                                    value={currentPassword}
                                    onChange={(event) => setCurrentPassword(event.target.value)}
                                    placeholder="••••••••••••"
                                    className={`${settingsPageStyles.input} ${settingsPageStyles.passwordInput}`}
                                />

                                <button
                                    type="button"
                                    onClick={() => setShowCurrentPassword((prev) => !prev)}
                                    className={settingsPageStyles.passwordToggleButton}
                                    aria-label={
                                        showCurrentPassword
                                            ? "현재 비밀번호 숨기기"
                                            : "현재 비밀번호 보기"
                                    }
                                >
                                    {showCurrentPassword ? <Eye size={22} /> : <EyeOff size={22} />}
                                </button>
                            </div>

                            <label className={settingsPageStyles.label}>
                                새로운 비밀번호
                            </label>
                            <div className={settingsPageStyles.passwordInputWrapper}>
                                <input
                                    type={showNewPassword ? "text" : "password"}
                                    value={newPassword}
                                    onChange={(event) => setNewPassword(event.target.value)}
                                    placeholder="••••••••••••"
                                    className={`${settingsPageStyles.input} ${settingsPageStyles.passwordInput}`}
                                />

                                <button
                                    type="button"
                                    onClick={() => setShowNewPassword((prev) => !prev)}
                                    className={settingsPageStyles.passwordToggleButton}
                                    aria-label={
                                        showNewPassword
                                            ? "새 비밀번호 숨기기"
                                            : "새 비밀번호 보기"
                                    }
                                >
                                    {showNewPassword ? <Eye size={22} /> : <EyeOff size={22} />}
                                </button>
                            </div>

                            {passwordMessage && (
                                <p className="text-sm text-red-500">
                                    {passwordMessage}
                                </p>
                            )}

                            <label className={settingsPageStyles.label}>
                                비밀번호 확인
                            </label>
                            <div className={settingsPageStyles.passwordInputWrapper}>
                                <input
                                    type={showConfirmPassword ? "text" : "password"}
                                    value={newPasswordConfirm}
                                    onChange={(event) => setNewPasswordConfirm(event.target.value)}
                                    placeholder="••••••••••••"
                                    className={`${settingsPageStyles.input} ${settingsPageStyles.passwordInput}`}
                                />

                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword((prev) => !prev)}
                                    className={settingsPageStyles.passwordToggleButton}
                                    aria-label={
                                        showConfirmPassword
                                            ? "비밀번호 확인 숨기기"
                                            : "비밀번호 확인 보기"
                                    }
                                >
                                    {showConfirmPassword ? <Eye size={22} /> : <EyeOff size={22} />}
                                </button>
                            </div>

                            {confirmMessage && (
                                <p className="text-sm text-red-500">
                                    {confirmMessage}
                                </p>
                            )}
                        </div>

                        <div className={settingsPageStyles.saveButtonWrapper}>
                            <button
                                type="button"
                                onClick={submit}
                                disabled={!canChangePassword}
                                className={`${settingsPageStyles.saveButton} disabled:cursor-not-allowed disabled:opacity-50`}
                            >
                                {isSaving ? "저장 중..." : "저장"}
                                <Save size={18} />
                            </button>
                        </div>

                        <div className={settingsPageStyles.divider} />
                    </>
                )
            )}

            <div className={settingsPageStyles.accountRow}>
                <div>
                    <p className={settingsPageStyles.dangerTitle}>회원 탈퇴</p>
                    <p className={settingsPageStyles.dangerDescription}>
                        계정과 및 데이터를 영구적으로 삭제합니다.
                    </p>
                </div>

                <button
                    type="button"
                    disabled={isLoading}
                    onClick={onClickDeleteMember}
                    className={settingsPageStyles.deleteMemberButton}
                >
                    회원 탈퇴
                </button>
            </div>
        </section>
    );
}