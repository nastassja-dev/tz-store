import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Header } from './components/Header/Header'
import { Footer } from './components/Footer/Footer'
import { ProductsPage } from './pages/ProductsPage/ProductsPage'
import { ProductDetailPage } from './pages/ProductDetailPage/ProductDetailPage'
import { CreateProductPage } from './pages/CreateProductPage/CreateProductPage'
import styles from './App.module.scss'

function App() {
  return (
    <BrowserRouter>
      <div className={styles.appLayout}>
        <Header />
        <main className={styles.main}>
          <Routes>
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/products/:id" element={<ProductDetailPage />} />
            <Route path="/products/:id/edit" element={<CreateProductPage />} />
            <Route path="/create-product" element={<CreateProductPage />} />
            <Route path="/" element={<Navigate to="/products" replace />} />
            <Route path="*" element={<Navigate to="/products" replace />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App