const MIN_SHEET_VIEWPORT_RATIO = 0.18;
const INITIAL_SHEET_VIEWPORT_RATIO = 0.42;
const MAX_SHEET_VIEWPORT_RATIO = 0.94;

export const SHEET_WHEEL_MULTIPLIER = 0.6;

export function getMinimumSheetHeight(
    viewportHeight: number,
) {
    return viewportHeight * MIN_SHEET_VIEWPORT_RATIO;
}

export function getInitialSheetHeight(
    viewportHeight: number,
) {
    return viewportHeight * INITIAL_SHEET_VIEWPORT_RATIO;
}

export function getMaximumSheetHeight(
    viewportHeight: number,
) {
    return viewportHeight * MAX_SHEET_VIEWPORT_RATIO;
}

export function clampSheetHeight(
    height: number,
    viewportHeight: number,
) {
    return Math.min(
        getMaximumSheetHeight(viewportHeight),
        Math.max(
            getMinimumSheetHeight(viewportHeight),
            height,
        ),
    );
}