import { Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { CartProvider } from './contexts/CartContext'
import { DealsProvider } from './contexts/DealsContext'
import Deals from './pages/Deals'
import Home from './pages/Home'
import Categories from './pages/Categories'
import CategoryView from './pages/CategoryView'
import NotFound from './pages/NotFound'

function App() {
  return (
    <CartProvider>
      <DealsProvider>
        <div className="min-h-screen bg-gradient-to-br from-primary-100 via-primary-50 to-white dark:from-surface-900 dark:via-surface-800 dark:to-surface-900">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/deals" element={<Deals />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/category/:categoryId" element={<CategoryView />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          className="!z-50"
          toastClassName="!bg-white !shadow-neu-light dark:!bg-surface-800 dark:!shadow-neu-dark !rounded-xl !border !border-surface-200 dark:!border-surface-700"
          bodyClassName="!text-surface-800 dark:!text-surface-200 !font-medium"
          progressClassName="!bg-gradient-to-r !from-primary-500 !to-secondary-500"
        />
      </div>
      </DealsProvider>
    </CartProvider>
  )
}

export default App