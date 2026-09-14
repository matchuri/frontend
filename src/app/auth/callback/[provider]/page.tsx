"use client";

import { useOAuthCallback } from "@/features/auth/application/hooks/useOAuthCallback";

import OAuthCallbackLoadingView from "@/features/auth/ui/components/OAuthCallbackLoadingView";

export default function OAuthCallbackPage() {
    useOAuthCallback();

    return <OAuthCallbackLoadingView />;
}