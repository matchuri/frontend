import { dislikedFoodSearchStyles } from "@/ui/styles/dislikedFoodSearchStyles";

interface DislikedFoodSearchProps {
    readonly keyword: string;
    readonly results: readonly string[];
    readonly selectedFoods: readonly string[];
    readonly onSearch: (keyword: string) => void;
    readonly onSelect: (food: string) => void;
    readonly onRemove: (food: string) => void;
}

export default function DislikedFoodSearch({
    keyword,
    results,
    selectedFoods,
    onSearch,
    onSelect,
    onRemove,
}: DislikedFoodSearchProps) {
    return (
        <section className={dislikedFoodSearchStyles.container}>
          <div className={dislikedFoodSearchStyles.header}>
            <h3 className={dislikedFoodSearchStyles.title}>
              알레르기 / 비선호 음식
            </h3>
            <p className={dislikedFoodSearchStyles.description}>
              피하고 싶은 음식을 검색 후 선택해 주세요.
            </p>
          </div>

          <div className={dislikedFoodSearchStyles.searchWrapper}>
            <input
              type="text"
              value={keyword}
              onChange={(e) => onSearch(e.target.value)}
              placeholder="예: 땅콩, 우유, 새우"
              className={dislikedFoodSearchStyles.input}
            />

            {keyword && results.length > 0 && (
              <div className={dislikedFoodSearchStyles.resultList}>
                {results.map((food) => (
                  <button
                    key={food}
                    type="button"
                    onClick={() => onSelect(food)}
                    className={dislikedFoodSearchStyles.resultItem}
                  >
                    {food}
                  </button>
                ))}
              </div>
            )}
          </div>

          {selectedFoods.length > 0 && (
            <div className={dislikedFoodSearchStyles.selectedList}>
              {selectedFoods.map((food) => (
                <div key={food} className={dislikedFoodSearchStyles.selectedTag}>
                  <span>{food}</span>
                  <button
                    type="button"
                    onClick={() => onRemove(food)}
                    className={dislikedFoodSearchStyles.removeButton}
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