import type { DislikedFood } from "@/features/preference/domain/model/UserPreference";
import { dislikedFoodSearchStyles } from "@/ui/styles/dislikedFoodSearchStyles";

type DislikedFoodSearchHeadingLevel = "h3" | "h4";

interface DislikedFoodSearchProps {
    readonly keyword: string;
    readonly headingLevel?: DislikedFoodSearchHeadingLevel;
    readonly results: readonly DislikedFood[];
    readonly selectedFoods: readonly DislikedFood[];
    readonly isSearching: boolean;
    readonly searchErrorMessage: string | null;
    readonly onSearch: (keyword: string) => void;
    readonly onSelect: (food: DislikedFood) => void;
    readonly onRemove: (food: DislikedFood) => void;
}

export default function DislikedFoodSearch({
    keyword,
    headingLevel = "h3",
    results,
    selectedFoods,
    isSearching,
    searchErrorMessage,
    onSearch,
    onSelect,
    onRemove,
}: DislikedFoodSearchProps) {
    const Heading = headingLevel;
    const hasKeyword = keyword.trim().length > 0;
    const showEmptyMessage =
        hasKeyword && !isSearching && !searchErrorMessage && results.length === 0;

    return (
        <section className={dislikedFoodSearchStyles.container}>
            <div className={dislikedFoodSearchStyles.header}>
                <Heading className={dislikedFoodSearchStyles.title}>
                    알레르기 / 비선호 음식
                </Heading>
                <p
                    id="disliked-food-search-description"
                    className={dislikedFoodSearchStyles.description}
                >
                    피하고 싶은 음식을 검색 후 선택해 주세요.
                </p>
            </div>

            <div className={dislikedFoodSearchStyles.searchWrapper}>
                <label
                    htmlFor="disliked-food-search"
                    className="sr-only"
                >
                    알레르기 또는 비선호 음식 검색
                </label>

                <input
                    id="disliked-food-search"
                    type="text"
                    value={keyword}
                    onChange={(e) => onSearch(e.target.value)}
                    placeholder="예: 땅콩, 우유, 돈까스"
                    aria-describedby="disliked-food-search-description"
                    className={dislikedFoodSearchStyles.input}
                />

                {hasKeyword && (
                    <div className={dislikedFoodSearchStyles.resultList}>
                        {isSearching && (
                            <p className={dislikedFoodSearchStyles.resultMessage}>
                                검색 중...
                            </p>
                        )}

                        {searchErrorMessage && (
                            <p className={dislikedFoodSearchStyles.errorMessage}>
                                {searchErrorMessage}
                            </p>
                        )}

                        {showEmptyMessage && (
                            <p className={dislikedFoodSearchStyles.resultMessage}>
                                검색 결과가 없습니다.
                            </p>
                        )}

                        {!isSearching &&
                            !searchErrorMessage &&
                            results.map((food) => (
                                <button
                                    key={`${food.type}-${food.id}`}
                                    type="button"
                                    onClick={() => onSelect(food)}
                                    className={dislikedFoodSearchStyles.resultItem}
                                >
                                    {food.name}
                                </button>
                            ))}
                    </div>
                )}
            </div>

            {selectedFoods.length > 0 && (
                <div className={dislikedFoodSearchStyles.selectedList}>
                    {selectedFoods.map((food) => (
                        <div
                            key={`${food.type}-${food.id}`}
                            className={dislikedFoodSearchStyles.selectedTag}
                        >
                            <span>{food.name}</span>
                            <button
                                type="button"
                                onClick={() => onRemove(food)}
                                className={dislikedFoodSearchStyles.removeButton}
                                aria-label={`${food.name} 제거`}
                            >
                                ×
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </section>
    );
}