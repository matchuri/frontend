export function parsePersonalRecommendationRequestId(
    requestIdParam: string,
): number | null {
    const requestId = Number(requestIdParam);

    if (!Number.isInteger(requestId) || requestId <= 0) {
        return null;
    }

    return requestId;
}