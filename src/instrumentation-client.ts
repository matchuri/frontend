import * as Sentry from "@sentry/nextjs";

import { clientEnv } from "@/infrastructure/config/env";

Sentry.init({
    dsn: clientEnv.sentryDsn,

    tracesSampleRate: 1,

    dataCollection: {
        userInfo: false,
        httpBodies: [],
    },
});

export const onRouterTransitionStart =
    Sentry.captureRouterTransitionStart;