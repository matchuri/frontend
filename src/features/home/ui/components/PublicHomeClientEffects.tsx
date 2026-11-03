"use client";

import { useRootRedirectGuard } from "@/features/routeGuard/application/hooks/useRootRedirectGuard";
import { usePublicHomeScrollReveal } from "@/features/home/application/hooks/usePublicHomeScrollReveal";

export default function PublicHomeClientEffects() {
    const { shouldShowPublicHome } = useRootRedirectGuard();

    usePublicHomeScrollReveal(shouldShowPublicHome);

    return null;
}