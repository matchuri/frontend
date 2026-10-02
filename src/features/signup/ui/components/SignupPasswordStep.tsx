"use client";

import {
    useEffect,
    useRef,
    useState,
} from "react";
import { Eye, EyeOff } from "lucide-react";

import { authPageStyles } from "@/ui/styles/authPageStyles";

interface SignupPasswordStepProps {
    readonly password: string;
    readonly isPasswordValid: boolean;
    readonly passwordMessage: string;
    readonly onPasswordChange: (password: string) => void;
    readonly onSubmit: () => void;
}

export default function SignupPasswordStep({
    password,
    isPasswordValid,
    passwordMessage,
    onPasswordChange,
    onSubmit,
}: SignupPasswordStepProps) {
    const inputRef = useRef<HTMLInputElement>(null);
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    useEffect(() => {
        const input = inputRef.current;

        if (!input) {
            return;
        }

        if (password && !isPasswordValid) {
            input.setCustomValidity(passwordMessage);
            return;
        }

        input.setCustomValidity("");
    }, [isPasswordValid, password, passwordMessage]);

    return (
        <>
            <div className={authPageStyles.intro}>
                <h1 className={authPageStyles.title}>
                    비밀번호를 설정해 주세요
                </h1>

                <p className={authPageStyles.description}>
                    문자, 숫자, 특수문자를 포함해 8자 이상 100자 이하로 입력해 주세요.
                </p>
            </div>

            <form
                className={authPageStyles.form}
                onSubmit={(event) => {
                    event.preventDefault();

                    if (!isPasswordValid) {
                        return;
                    }

                    onSubmit();
                }}
            >
                <div className={authPageStyles.inputGroup}>
                    <label
                        htmlFor="signup-password"
                        className={authPageStyles.label}
                    >
                        비밀번호
                    </label>

                    <div className={authPageStyles.passwordInputWrapper}>
                        <input
                            ref={inputRef}
                            id="signup-password"
                            type={isPasswordVisible ? "text" : "password"}
                            value={password}
                            onChange={(event) => onPasswordChange(event.target.value)}
                            className={`${authPageStyles.input} ${authPageStyles.passwordInput}`}
                            placeholder="비밀번호를 입력하세요"
                            autoComplete="new-password"
                            minLength={8}
                            maxLength={100}
                            required
                            autoFocus
                        />

                        <button
                            type="button"
                            onClick={() => setIsPasswordVisible((prev) => !prev)}
                            className={authPageStyles.passwordToggle}
                            aria-label={isPasswordVisible ? "비밀번호 숨기기" : "비밀번호 보기"}
                        >
                            {isPasswordVisible ? (
                                <EyeOff size={20} />
                            ) : (
                                <Eye size={20} />
                            )}
                        </button>
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={!password}
                    className={authPageStyles.primaryButton}
                >
                    계속
                </button>
            </form>
        </>
    );
}