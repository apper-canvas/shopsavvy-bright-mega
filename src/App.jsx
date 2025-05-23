import { Routes, Route } from 'react-router-dom'
import { CartProvider } from './contexts/CartContext'
import { DealsProvider } from './contexts/DealsContext'
import { ProductsProvider } from './contexts/ProductsContext'
import Deals from './pages/Deals'
import Home from './pages/Home'
import Products from './pages/Products'
import Categories from './pages/Categories'
import CategoryView from './pages/CategoryView'
import NotFound from './pages/NotFound'

function App() {
  return (
    <CartProvider>
      <DealsProvider>
        <ProductsProvider>
          <div className="min-h-screen bg-gradient-to-br from-primary-100 via-primary-50 to-white dark:from-surface-900 dark:via-surface-800 dark:to-surface-900">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/deals" element={<Deals />} />
              <Route path="/products" element={<Products />} />
              <Route path="/categories" element={<Categories />} />
              <Route path="/category/:categoryId" element={<CategoryView />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
          
        </ProductsProvider>
      </DealsProvider>
    </CartProvider>
  )
}

export default App