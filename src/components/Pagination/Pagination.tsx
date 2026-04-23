import { ChevronLeft, ChevronRight } from 'lucide-react';
import styles from './Pagination.module.scss';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const Pagination = ({ currentPage, totalPages, onPageChange }: PaginationProps) => {
  // Генерируем массив номеров страниц для отображения
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Первая страница
      pages.push(1);

      // Стрелка многоточие слева
      if (currentPage > 3) {
        pages.push('...');
      }

      // Страницы вокруг текущей
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) {
        if (!pages.includes(i)) {
          pages.push(i);
        }
      }

      // Стрелка многоточие справа
      if (currentPage < totalPages - 2) {
        pages.push('...');
      }

      // Последняя страница
      if (!pages.includes(totalPages)) {
        pages.push(totalPages);
      }
    }

    return pages;
  };

  const pages = getPageNumbers();

  const handlePrevPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <nav className={styles.pagination} aria-label="Пагинация">
      {/* Кнопка предыдущей страницы */}
      <button
        className={styles.button}
        onClick={handlePrevPage}
        disabled={currentPage === 1}
        aria-label="Предыдущая страница"
        title="Предыдущая страница"
      >
        <ChevronLeft size={20} />
      </button>

      {/* Номера страниц */}
      <div className={styles.pages}>
        {pages.map((page, index) => (
          <div key={index}>
            {typeof page === 'number' ? (
              <button
                className={`${styles.pageButton} ${
                  page === currentPage ? styles.active : ''
                }`}
                onClick={() => onPageChange(page)}
                aria-current={page === currentPage ? 'page' : undefined}
                aria-label={`Страница ${page}`}
              >
                {page}
              </button>
            ) : (
              <span className={styles.ellipsis}>{page}</span>
            )}
          </div>
        ))}
      </div>

      {/* Кнопка следующей страницы */}
      <button
        className={styles.button}
        onClick={handleNextPage}
        disabled={currentPage === totalPages}
        aria-label="Следующая страница"
        title="Следующая страница"
      >
        <ChevronRight size={20} />
      </button>
    </nav>
  );
};
