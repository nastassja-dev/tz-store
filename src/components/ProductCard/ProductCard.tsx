import { Heart, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { toggleLike, deleteProduct } from '../../store/productsSlice';
import type { Product } from '../../types/product';
import styles from './ProductCard.module.scss';

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { likedIds } = useAppSelector((state) => state.products);

  const isLiked = likedIds.includes(Number(product.id));

  const handleCardClick = () => {
    navigate(`/products/${product.id}`);
  };

  const handleLikeClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(toggleLike(Number(product.id)));
  };

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(deleteProduct(product.id));
  };

  return (
    <div className={styles.card} onClick={handleCardClick} role="button" tabIndex={0}>
      {/* Изображение */}
      <div className={styles.imageWrapper}>
        <img
          src={product.image}
          alt={product.title}
          className={styles.image}
          onError={(e) => {
            (e.target as HTMLImageElement).src = 'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22100%22 height=%22100%22%3E%3Crect fill=%22%23eee%22 width=%22100%22 height=%22100%22/%3E%3C/svg%3E';
          }}
        />
      </div>

      {/* Название */}
      <h3 className={styles.title}>{product.title}</h3>

      {/* Описание */}
      <p className={styles.description}>{product.description}</p>

      {/* Действия */}
      <div className={styles.actions}>
        <button
          className={`${styles.iconButton} ${isLiked ? styles.liked : ''}`}
          onClick={handleLikeClick}
          aria-label={isLiked ? 'Убрать из избранного' : 'Добавить в избранное'}
          title={isLiked ? 'Убрать из избранного' : 'Добавить в избранное'}
        >
          <Heart size={20} fill={isLiked ? 'currentColor' : 'none'} />
        </button>
        <button
          className={styles.iconButton}
          onClick={handleDeleteClick}
          aria-label="Удалить продукт"
          title="Удалить продукт"
        >
          <Trash2 size={20} />
        </button>
      </div>
    </div>
  );
};
