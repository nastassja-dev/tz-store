import { useEffect, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { fetchProducts, setPage } from '../../store/productsSlice';
import { ProductGrid } from '../../components/ProductGrid/ProductGrid';
import { Pagination } from '../../components/Pagination/Pagination';
import styles from './ProductsPage.module.scss';

const ITEMS_PER_PAGE = 8;

export const ProductsPage = () => {
  const dispatch = useAppDispatch();
  const { items, likedIds, filter, search, currentPage, status } = useAppSelector(
    (state) => state.products
  );

  // Загрузить продукты при первом рендере
  useEffect(() => {
    if (items.length === 0) {
      dispatch(fetchProducts());
    }
  }, [dispatch, items.length]);

  // Фильтрация и поиск
  const filteredProducts = useMemo(() => {
    let result = items;

    // Фильтр по избранному
    if (filter === 'liked') {
      result = result.filter((product) => likedIds.includes(Number(product.id)));
    }

    // Поиск по названию и описанию
    if (search.trim()) {
      const query = search.toLowerCase();
      result = result.filter(
        (product) =>
          product.title.toLowerCase().includes(query) ||
          product.description.toLowerCase().includes(query)
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
    const grid = document.querySelector('[data-products-grid]');
    if (grid) {
      grid.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (status === 'loading') {
    return (
      <div className={styles.page}>
        <div className={styles.loading}>Загрузка продуктов...</div>
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div className={styles.page}>
        <div className={styles.error}>Ошибка загрузки продуктов. Попробуйте позже.</div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      {/* Информация о результатах */}
      <div className={styles.info}>
        <p className={styles.resultCount}>
          Найдено: <strong>{filteredProducts.length}</strong> продуктов
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
