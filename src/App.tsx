import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Header } from './components/Header/Header'
import { Footer } from './components/Footer/Footer'
import styles from './App.module.scss'

function App() {
  return (
    <BrowserRouter>
      <div className={styles.appLayout}>
        <Header />
        <main className={styles.main}>
          <Routes>
            <Route path="/products" element={<div>Products Page</div>} />
            <Route path="/products/:id" element={<div>Product Detail Page</div>} />
            <Route path="/products/:id/edit" element={<div>Edit Product Page</div>} />
            <Route path="/create-product" element={<div>Create Product Page</div>} />
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