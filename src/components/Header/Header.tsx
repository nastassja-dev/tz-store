import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
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

  const handleFilterChange = (newFilter: FilterType) => {
    dispatch(setFilter(newFilter));
  };

  const handleCreateClick = () => {
    navigate("/create-product");
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        {/* Логотип */}
        <Link to="/products" className={styles.logo}>
          TZ Store
        </Link>

        {/* Поиск */}
        <div className={styles.searchWrapper}>
          <Search className={styles.searchIcon} size={20} />
          <input
            type="text"
            placeholder="Поиск..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className={styles.searchInput}
            aria-label="Поиск продуктов"
          />
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
