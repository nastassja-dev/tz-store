import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { fetchProducts, addProduct, updateProduct } from '../../store/productsSlice';
import { createProduct } from '../../api/productsApi';
import { ImageUpload } from '../../components/ImageUpload/ImageUpload';
import type { Product } from '../../types/product';
import styles from './CreateProductPage.module.scss';
import { usePageTitle } from '../../hooks/usePageTitle';

type FormData = Omit<Product, 'id'>;

export const CreateProductPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { items } = useAppSelector((state) => state.products);
  usePageTitle('Create Product')
  const isEditMode = !!id;
  const product = isEditMode ? items.find((item) => String(item.id) === id) : undefined;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch,
  } = useForm<FormData>({
    mode: 'onBlur',
    defaultValues: product ? {
      title: product.title,
      description: product.description,
      image: product.image,
    } : {
      title: '',
      description: '',
      image: '',
    },
  });

  const imageValue = watch('image');

  // Загрузить продукты если нужно
  useEffect(() => {
    if (items.length === 0) {
      dispatch(fetchProducts());
    }
  }, [dispatch, items.length]);

  const handleBackClick = () => {
    navigate('/products');
  };

  const onSubmit = async (data: FormData) => {
    try {
      // Валидация изображения
      if (!data.image || data.image.trim() === '') {
        console.error('Изображение обязательно');
        return;
      }

      if (isEditMode && product) {
        // Редактирование
        dispatch(updateProduct({ ...data, id: product.id }));
        navigate(`/products/${product.id}`);
      } else {
        // Создание
        const newProduct = await createProduct(data);
        // Убеждаемся что продукт имеет ID
        const productToAdd = {
          ...newProduct,
          id: newProduct.id || Math.floor(Math.random() * 10000),
        };
        dispatch(addProduct(productToAdd));
        navigate('/products', {state: {success : 'Продукт успешно добавлен!'}});
      }
    } catch (error) {
      console.error('Ошибка при сохранении продукта:', error);
    }
  };

  if (isEditMode && !product) {
    return (
      <div className={styles.page}>
        <div className={styles.error}>Продукт не найден</div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        {/* Двухколоночный layout */}
        <div className={styles.container}>
          {/* Левая колонка: загрузка изображения */}
          <div className={styles.imageColumn}>
            <ImageUpload value={imageValue} setValue={setValue} />
          </div>

          {/* Правая колонка: форма */}
          <div className={styles.formColumn}>
            <h1 className={styles.title}>
              {isEditMode ? "Редактировать продукт" : "Создать продукт"}
            </h1>

            {/* Название */}
            <div className={styles.formGroup}>
              <label htmlFor="title" className={styles.label}>
                Название
              </label>
              <input
                id="title"
                type="text"
                placeholder="Введите название продукта"
                className={`${styles.input} ${errors.title ? styles.error : ""}`}
                {...register("title", {
                  required: "Название обязательно",
                  minLength: { value: 3, message: "Минимум 3 символа" },
                })}
              />
              {errors.title && (
                <p className={styles.errorMessage}>{errors.title.message}</p>
              )}
            </div>

            {/* Описание */}
            <div className={styles.formGroup}>
              <label htmlFor="description" className={styles.label}>
                Описание
              </label>
              <textarea
                id="description"
                placeholder="Введите описание продукта"
                className={`${styles.textarea} ${errors.description ? styles.error : ""}`}
                {...register("description", {
                  required: "Описание обязательно",
                  minLength: { value: 10, message: "Минимум 10 символов" },
                })}
              />
              {errors.description && (
                <p className={styles.errorMessage}>
                  {errors.description.message}
                </p>
              )}
            </div>

            {/* Скрытое поле для регистрации image */}
            <input
              type="hidden"
              {...register('image', {
                required: 'Изображение обязательно',
                validate: (value) => {
                  if (!value || value.trim() === '') {
                    return 'Изображение обязательно';
                  }
                  return true;
                },
              })}
            />

            {/* Валидация изображения */}
            {errors.image && (
              <p className={styles.errorMessage}>{errors.image.message}</p>
            )}
            {/* Кнопка отправки */}
            <button type="submit" className={styles.submitButton} disabled={isSubmitting}>
              {isSubmitting
                ? 'Сохранение...'
                : isEditMode
                  ? 'Сохранить изменения'
                  : 'Создать продукт'}
            </button>
          </div>
        </div>

        {/* Кнопка назад */}
        <div className={styles.footer}>
          <button
            type="button"
            className={styles.secondaryButton}
            onClick={handleBackClick}
          >
            ← Назад в каталог
          </button>
        </div>
      </form>
    </div>
  );
};
