import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from '@reduxjs/toolkit';
import type { Product, FilterType } from '../types/product';

interface ProductsState {
  items: Product[];
  likedIds: number[];
  filter: FilterType;
  search: string;
  currentPage: number;
  status: 'idle' | 'loading' | 'error';
}

const initialState: ProductsState = {
  items: [],
  likedIds: [],
  filter: 'all',
  search: '',
  currentPage: 1,
  status: 'idle',
};

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch('https://fakestoreapi.com/products');
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    addProduct: (state, action: PayloadAction<Product>) => {
      state.items.push(action.payload);
    },
    updateProduct: (state, action: PayloadAction<Product>) => {
      const index = state.items.findIndex(
        (item) => item.id === action.payload.id
      );
      if (index !== -1) {
        state.items[index] = action.payload;
      }
    },
    deleteProduct: (state, action: PayloadAction<string | number>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    toggleLike: (state, action: PayloadAction<number>) => {
      const id = action.payload;
      const index = state.likedIds.indexOf(id);
      if (index !== -1) {
        state.likedIds.splice(index, 1);
      } else {
        state.likedIds.push(id);
      }
    },
    setFilter: (state, action: PayloadAction<FilterType>) => {
      state.filter = action.payload;
      state.currentPage = 1;
    },
    setSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
      state.currentPage = 1;
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'idle';
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state) => {
        state.status = 'error';
      });
  },
});

export const {
  addProduct,
  updateProduct,
  deleteProduct,
  toggleLike,
  setFilter,
  setSearch,
  setPage,
} = productsSlice.actions;

export default productsSlice.reducer;
