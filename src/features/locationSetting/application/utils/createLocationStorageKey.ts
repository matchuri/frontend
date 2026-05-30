export function createLocationStorageKey(
    prefix: string, // 저장할 위치 데이터의 종류를 구분하는 key 값(개인 메뉴 추천인지 그룹 메뉴 추천인지)
    scopeId: number | string, //저장 데이터의 소유/적용 대상 id
): string {
    return `${prefix}:${scopeId}`;
}