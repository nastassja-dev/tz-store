import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Plus, Heart } from "lucide-react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { setFilter, setSearch } from "../../store/productsSlice";
import type { FilterType } from "../../types/product";
import styles from "./Header.module.scss";

const SEARCH_DEBOUNCE_MS = 300;

export const Header = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { filter, search } = useAppSelector((state) => state.products);

  const [searchInput, setSearchInput] = useState(search);

  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const searchWrapperRef = useRef<HTMLDivElement>(null);

  // Debounce поиска
  useEffect(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      dispatch(setSearch(searchInput));
    }, SEARCH_DEBOUNCE_MS);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [searchInput, dispatch]);

  // Клик вне поиска → сброс
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchWrapperRef.current &&
        !searchWrapperRef.current.contains(event.target as Node)
      ) {
        setSearchInput("");
        dispatch(setSearch(""));
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dispatch]);

  const handleFilterChange = (newFilter: FilterType) => {
    dispatch(setFilter(newFilter));
    navigate("/products");
  };

  const handleCreateClick = () => {
    navigate("/create-product");
  };

  const handleLogoClick = () => {
    dispatch(setFilter("all"));
    dispatch(setSearch(""));
    setSearchInput("");
    navigate("/products");
  };

  const handleClearSearch = () => {
    setSearchInput("");
    dispatch(setSearch(""));
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        {/* Логотип */}
        <button
          className={styles.logo}
          onClick={handleLogoClick}
          aria-label="На главную"
          title="На главную"
        >
          TZ Store
        </button>

        {/* Поиск */}
        <div className={styles.searchWrapper} ref={searchWrapperRef}>
          <Search className={styles.searchIcon} size={20} />

          <input
            type="text"
            placeholder="Поиск..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className={styles.searchInput}
            aria-label="Поиск продуктов"
          />

          {searchInput && (
            <button
              type="button"
              className={styles.clearButton}
              onClick={handleClearSearch}
              aria-label="Очистить поиск"
            >
              ×
            </button>
          )}
        </div>

        {/* Фильтры */}
        <div className={styles.filters}>
          <button
            className={`${styles.filterTab} ${
              filter === "all" ? styles.active : ""
            }`}
            onClick={() => handleFilterChange("all")}
            aria-pressed={filter === "all"}
          >
            Все
          </button>

          <button
            className={`${styles.filterTab} ${
              filter === "liked" ? styles.active : ""
            }`}
            onClick={() => handleFilterChange("liked")}
            aria-pressed={filter === "liked"}
          >
            <Heart size={16} />
            Избранное
          </button>
        </div>

        {/* Кнопка создания */}
        <button
          className={styles.createButton}
          onClick={handleCreateClick}
          aria-label="Создать новый продукт"
          title="Создать новый продукт"
        >
          <Plus size={24} />
        </button>
      </div>
    </header>
  );
};