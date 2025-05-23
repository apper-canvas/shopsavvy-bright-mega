import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useCart } from '../contexts/CartContext'
import ApperIcon from './ApperIcon'
import Categories from './Categories'
import CartSidebar from './CartSidebar'

const Header = () => {
  const { getTotalItems } = useCart()
  const [isCartOpen, setIsCartOpen] = useState(false)
  const totalItems = getTotalItems()

  return (
    <>
      <header className="sticky top-0 z-30 bg-white/80 dark:bg-surface-900/80 backdrop-blur-md border-b border-surface-200 dark:border-surface-700">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link 
              to="/" 
              className="flex items-center space-x-3 group"
            >
              <motion.div
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary-600 to-secondary-600 shadow-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <ApperIcon name="ShoppingBag" className="h-6 w-6 text-white" />
              </motion.div>
              <div className="hidden sm:block">
                <h1 className="text-xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                  ShopSavvy
                </h1>
                <p className="text-xs text-surface-500 dark:text-surface-400">
                  Smart Shopping
                </p>
              </div>
            </Link>

            {/* Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <Link 
                to="/" 
                className="text-surface-700 dark:text-surface-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors font-medium"
              >
                Home
              </Link>
              <Categories />
              <Link 
                to="/about" 
                className="text-surface-700 dark:text-surface-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors font-medium"
              >
                About
              </Link>
              <Link 
                to="/contact" 
                className="text-surface-700 dark:text-surface-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors font-medium"
              >
                Contact
              </Link>
            </nav>

            {/* Cart Button */}
            <motion.button
              onClick={() => setIsCartOpen(true)}
              className="relative flex items-center space-x-2 bg-primary-50 dark:bg-primary-900/20 hover:bg-primary-100 dark:hover:bg-primary-900/30 px-4 py-2 rounded-xl transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <ApperIcon name="ShoppingCart" className="h-5 w-5 text-primary-600 dark:text-primary-400" />
              <span className="hidden sm:inline text-sm font-semibold text-primary-600 dark:text-primary-400">
                Cart
              </span>
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">
                  {totalItems > 99 ? '99+' : totalItems}
                </span>
              )}
            </motion.button>
          </div>
        </div>
      </header>

      <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  )
}

export default Header