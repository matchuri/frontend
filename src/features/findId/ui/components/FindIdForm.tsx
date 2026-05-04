"use client";

import { findIdPageStyles } from "@/ui/styles/findIdPageStyles";

export default function FindIdForm() {
    return (
        <div className={findIdPageStyles.form}>
            <label className={findIdPageStyles.label}>이메일</label>
            <input
                type="email"
                className={findIdPageStyles.input}
            />

            <button
                type="button"
                className={findIdPageStyles.button}
            >
                아이디 찾기
            </button>
        </div>
    );
}