import type { Product } from '../types/product';

const API_BASE_URL = 'https://fakestoreapi.com';

interface ApiProduct {
  id: number;
  title: string;
  description: string;
  price: number;
  category: string;
  image: string;
  rating?: {
    rate: number;
    count: number;
  };
}

// Маппировать данные с API на наш интерфейс Product
const mapApiProductToProduct = (apiProduct: ApiProduct): Product => ({
  id: apiProduct.id,
  title: apiProduct.title,
  description: apiProduct.description,
  image: apiProduct.image,
});

/**
 * Получить список всех продуктов
 */
export const getProducts = async (): Promise<Product[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/products`);
    if (!response.ok) {
      throw new Error(`Failed to fetch products: ${response.statusText}`);
    }
    const apiProducts: ApiProduct[] = await response.json();
    return apiProducts.map(mapApiProductToProduct);
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

/**
 * Получить один продукт по ID
 */
export const getProductById = async (id: string | number): Promise<Product> => {
  try {
    const response = await fetch(`${API_BASE_URL}/products/${id}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch product: ${response.statusText}`);
    }
    const apiProduct: ApiProduct = await response.json();
    return mapApiProductToProduct(apiProduct);
  } catch (error) {
    console.error(`Error fetching product with id ${id}:`, error);
    throw error;
  }
};

/**
 * Создать новый продукт
 * Примечание: FakeStore API не сохраняет созданные продукты на сервере.
 * Ответ нужно добавить в store вручную.
 */
export const createProduct = async (product: Omit<Product, 'id'>): Promise<Product> => {
  try {
    const response = await fetch(`${API_BASE_URL}/products`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: product.title,
        description: product.description,
        image: product.image,
        price: 0, // FakeStore требует price, но это не используется в нашем интерфейсе
        category: 'default',
      }),
    });

    if (!response.ok) {
      throw new Error(`Failed to create product: ${response.statusText}`);
    }

    const apiProduct: ApiProduct & { id: number } = await response.json();
    return mapApiProductToProduct(apiProduct);
  } catch (error) {
    console.error('Error creating product:', error);
    throw error;
  }
};
