import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useContext } from 'react'
import { AuthContext } from '../App'
import { motion } from 'framer-motion'
import { useCart } from '../contexts/CartContext'
import { useDeals } from '../contexts/DealsContext'
import { useProducts } from '../contexts/ProductsContext'
  const { user, isAuthenticated } = useSelector((state) => state.user)
  const { logout } = useContext(AuthContext)
import { useTracking } from '../contexts/TrackingContext'
import ApperIcon from './ApperIcon'
import Categories from './Categories'
import CartSidebar from './CartSidebar'

const Header = () => {
  const { getTotalItems } = useCart()
  const { getPendingShipmentsCount } = useTracking()
  const { favorites } = useProducts()
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
              
              <Link 
                to="/deals" 
                className="text-surface-700 dark:text-surface-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors font-medium"
              >
                Deals
              </Link>
              
              <Link 
                to="/products" 
                className="text-surface-700 dark:text-surface-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors font-medium"
              >
                Products
              </Link>
              <Categories />
              
              <Link 
                to="/tracking" 
                className="relative text-surface-700 dark:text-surface-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors font-medium flex items-center space-x-1"
              >
                <ApperIcon name="Truck" className="h-4 w-4" />
                <span>Tracking</span>
                {getPendingShipmentsCount() > 0 && (
                  <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-blue-500 text-xs font-bold text-white">
                    {getPendingShipmentsCount() > 9 ? '9+' : getPendingShipmentsCount()}
                  </span>
                )}
              </Link>
            </nav>

            {/* Action Buttons */}
            <div className="flex items-center space-x-3">
              {/* Mobile Tracking Button */}
              
              {/* Wishlist */}
              <Link
                to="/wishlist"
                className="relative p-3 text-surface-600 dark:text-surface-300 hover:text-primary-600 transition-colors"
              >
                <ApperIcon name="Heart" className="h-6 w-6" />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                  {favorites.length}
                </span>
              </Link>
              <Link to="/tracking" className="md:hidden relative">
                <ApperIcon name="Truck" className="h-6 w-6 text-surface-600 dark:text-surface-400" />
                {getPendingShipmentsCount() > 0 && (
                  <span className="absolute -top-2 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-blue-500 text-xs font-bold text-white">
                    {getPendingShipmentsCount() > 9 ? '9+' : getPendingShipmentsCount()}
                  </span>
                )}
              </Link>

              {/* Cart Button */}
                {isAuthenticated ? (
                  <div className="flex items-center space-x-4">
                    <div className="hidden md:block">
                      <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        {user?.firstName} {user?.lastName}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{user?.emailAddress}</p>
                    </div>
                    <button onClick={logout} className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400">
                      <ApperIcon name="LogOut" className="w-5 h-5" />
                    </button>
                  </div>
                ) : (
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
                )}
                <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">
                  {totalItems > 99 ? '99+' : totalItems}
                </span>
              )}
            </motion.button>
            </div>
          </div>
        </div>
      </header>

      <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  )
}

export default Header