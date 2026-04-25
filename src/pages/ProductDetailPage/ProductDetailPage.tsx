import { useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { usePageTitle } from '../../hooks/usePageTitle';
import { Heart, Trash2, Edit } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { fetchProducts, toggleLike, deleteProduct } from '../../store/productsSlice';
import styles from './ProductDetailPage.module.scss';

export const ProductDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { items, likedIds, status } = useAppSelector((state) => state.products);
  const product = items.find((item) => String(item.id) === id);
  const isLiked = product && likedIds.includes(Number(product.id));
  usePageTitle('Product Details')

  // Загрузить продукты если нужно
  useEffect(() => {
    if (items.length === 0) {
      dispatch(fetchProducts());
    }
  }, [dispatch, items.length]);

  const handleLikeClick = () => {
    if (product) {
      dispatch(toggleLike(Number(product.id)));
    }
  };

  const handleDeleteClick = () => {
    if (product) {
      dispatch(deleteProduct(product.id));
      navigate('/products');
    }
  };

  const handleBackClick = () => {
    navigate('/products');
  };

  const handleEditClick = () => {
    navigate(`/products/${id}/edit`);
  };

  if (status === 'loading') {
    return (
      <div className={styles.page}>
        <div className={styles.loading}>Загрузка продукта...</div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className={styles.page}>
        <div className={styles.error}>Продукт не найден</div>
        <Link to="/products" className={styles.backLink}>
          ← Вернуться в каталог
        </Link>
      </div>
    );
  }

  return (
    <div className={styles.page}>

      {/* Двухколоночный layout */}
      <div className={styles.container}>
        {/* Левая колонка: изображение */}
        <div className={styles.imageColumn}>
          <div className={styles.imageWrapper}>
            <img
              src={product.image}
              alt={product.title}
              className={styles.image}
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22100%22 height=%22100%22%3E%3Crect fill=%22%23eee%22 width=%22100%22 height=%22100%22/%3E%3C/svg%3E';
              }}
            />
          </div>
        </div>

        {/* Правая колонка: информация */}
        <div className={styles.contentColumn}>
          {/* Заголовок с кнопкой редактирования */}
          <div className={styles.header}>
            <h1 className={styles.title}>{product.title}</h1>
            <button
              className={styles.editButton}
              onClick={handleEditClick}
              aria-label="Редактировать продукт"
              title="Редактировать продукт"
            >
              <Edit size={20} />
            </button>
          </div>

          {/* Описание */}
          <p className={styles.description}>{product.description}</p>

          {/* Действия */}
          <div className={styles.actions}>
            <button
              className={`${styles.actionButton} ${isLiked ? styles.liked : ''}`}
              onClick={handleLikeClick}
              aria-label={isLiked ? 'Убрать из избранного' : 'Добавить в избранное'}
              title={isLiked ? 'Убрать из избранного' : 'Добавить в избранное'}
            >
              <Heart size={20} fill={isLiked ? 'currentColor' : 'none'} />
              {isLiked ? 'В избранном' : 'Добавить в избранное'}
            </button>
            <button
              className={styles.actionButton}
              onClick={handleDeleteClick}
              aria-label="Удалить продукт"
              title="Удалить продукт"
            >
              <Trash2 size={20} />
              Удалить
            </button>
          </div>
        </div>
      </div>

      {/* Кнопки в footer */}
      <div className={styles.footer}>
        <button className={styles.secondaryButton} onClick={handleBackClick}>
          ← Назад в каталог
        </button>
      </div>
    </div>
  );
};
