"use client";

import { useAuthInit } from "@/features/auth/application/hooks/useAuthInit";

export default function AuthInitializer() {
    useAuthInit();
    return null;
}