export interface Product {
  id: string | number;
  title: string;
  description: string;
  image: string;
}

export type FilterType = 'all' | 'liked';
