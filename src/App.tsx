import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Header } from './components/Header/Header'
import { Footer } from './components/Footer/Footer'
import { ProductGrid } from './components/ProductGrid/ProductGrid'
import type { Product } from './types/product'
import styles from './App.module.scss'

// Тестовые данные для проверки UI
const mockProducts: Product[] = [
  {
    id: 1,
    title: 'Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops',
    description: 'Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday',
    image: 'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg'
  },
  {
    id: 2,
    title: 'Mens Casual Premium Slim Fit T-Shirts ',
    description: 'Slim-fitting style, contrast raglan long sleeve and curved hem with hatched detail. Fabric is light and air-vents to keep you cool',
    image: 'https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg'
  },
  {
    id: 3,
    title: 'Mens Cotton Jacket',
    description: 'great outerwear jackets for spring/autumn/winter, suitable for many occasions, such as working, hiking, camping, mountain/rock climbing',
    image: 'https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg'
  },
  {
    id: 4,
    title: 'John Hardy Women\'s Legends',
    description: 'From our Legends Collection, the Naga was inspired by the mythical water dragon that protects the ocean\'s pearl.',
    image: 'https://fakestoreapi.com/img/71YAIFU48IL._AC_UL640_QL65_ML3_.jpg'
  },
  {
    id: 5,
    title: 'White Gold Plated Promise',
    description: 'Classic Created Wedding Engagement Solitaire Diamond Promise Bridal Ring for Her. Gifts to make her smile.',
    image: 'https://fakestoreapi.com/img/71YAIFU48IL._AC_UL640_QL65_ML3_.jpg'
  },
  {
    id: 6,
    title: 'Samsung 49-Inch CHG90 144Hz Gaming Monitor',
    description: 'Hello. Yes, this is a monitor. It has a very high refresh rate that will make gaming easier for all of us.',
    image: 'https://fakestoreapi.com/img/81Zt42ioCgL._AC_SX679_.jpg'
  },
  {
    id: 7,
    title: 'BIYLACLESEN Women\'s Winter Snow Boots',
    description: 'Winter Boots Warm Snow Boots for Women with Chunky Sole Pattern Fuzzy Insole Waterproof Boots Botas De Mujer',
    image: 'https://fakestoreapi.com/img/51y5nArgsyL._AC_UX679_.jpg'
  },
  {
    id: 8,
    title: 'DANVOUY Womens T Shirt Casual',
    description: 'Casual Loose Fit Comfy Dasual Short Sleeve Blouses are Comfortable and Fits well with Jean Shorts, Bridge Jeans, Wig Leather Jackets',
    image: 'https://fakestoreapi.com/img/61pHAEJ4NML._AC_UX679_.jpg'
  }
]

function App() {
  return (
    <BrowserRouter>
      <div className={styles.appLayout}>
        <Header />
        <main className={styles.main}>
          <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '2rem' }}>
            <Routes>
              <Route path="/products" element={<ProductGrid products={mockProducts} />} />
              <Route path="/products/:id" element={<div>Product Detail Page</div>} />
              <Route path="/products/:id/edit" element={<div>Edit Product Page</div>} />
              <Route path="/create-product" element={<div>Create Product Page</div>} />
              <Route path="/" element={<Navigate to="/products" replace />} />
              <Route path="*" element={<Navigate to="/products" replace />} />
            </Routes>
          </div>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App