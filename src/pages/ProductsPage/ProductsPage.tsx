import { useEffect, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { usePageTitle } from "../../hooks/usePageTitle";
import { fetchProducts, setPage } from "../../store/productsSlice";
import { ProductGrid } from "../../components/ProductGrid/ProductGrid";
import { Pagination } from "../../components/Pagination/Pagination";
import { useLocation } from "react-router-dom";
import styles from "./ProductsPage.module.scss";

const ITEMS_PER_PAGE = 8;

const getProductsWord = (count: number) => {
  const mod10 = count % 10;
  const mod100 = count % 100;

  if (mod100 >= 11 && mod100 <= 14) return "продуктов";
  if (mod10 === 1) return "продукт";
  if (mod10 >= 2 && mod10 <= 4) return "продукта";
  return "продуктов";
};

export const ProductsPage = () => {
  const dispatch = useAppDispatch();
  const { items, likedIds, filter, search, currentPage, status } =
    useAppSelector((state) => state.products);
  usePageTitle("Products");
  const location = useLocation();
  const successMessage = location.state?.success;
  // Загрузить продукты при первом рендере
  useEffect(() => {
    if (items.length === 0) {
      dispatch(fetchProducts());
    }
  }, [dispatch, items.length]);
  useEffect(() => {
    if (location.state?.success) {
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  // Фильтрация и поиск
  const filteredProducts = useMemo(() => {
    let result = items;

    // Фильтр по избранному
    if (filter === "liked") {
      result = result.filter((product) =>
        likedIds.includes(Number(product.id)),
      );
    }

    // Поиск по названию и описанию
    if (search.trim()) {
      const query = search.toLowerCase();
      result = result.filter(
        (product) =>
          product.title.toLowerCase().includes(query) ||
          product.description.toLowerCase().includes(query),
      );
    }

    return result;
  }, [items, filter, search, likedIds]);

  // Пагинация
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredProducts.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredProducts, currentPage]);

  const handlePageChange = (page: number) => {
    dispatch(setPage(page));
    // Скролл к началу сетки
    const grid = document.querySelector("[data-products-grid]");
    if (grid) {
      grid.scrollIntoView({ behavior: "smooth" });
    }
  };

  if (status === "loading") {
    return (
      <div className={styles.page}>
        <div className={styles.loading}>Загрузка продуктов...</div>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className={styles.page}>
        <div className={styles.error}>
          Ошибка загрузки продуктов. Попробуйте позже.
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      {successMessage && <div className={styles.success}>{successMessage}</div>}
      {/* Информация о результатах */}
      <div className={styles.info}>
        <p className={styles.resultCount}>
          Найдено: <strong>{filteredProducts.length}</strong>{" "}
          {getProductsWord(filteredProducts.length)}
        </p>
      </div>

      {/* Сетка продуктов */}
      <div data-products-grid>
        <ProductGrid products={paginatedProducts} />
      </div>

      {/* Пагинация */}
      {totalPages > 1 && (
        <div className={styles.paginationWrapper}>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      )}
    </div>
  );
};
