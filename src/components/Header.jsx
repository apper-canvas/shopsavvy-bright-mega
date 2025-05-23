import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useCart } from '../contexts/CartContext'
import { useDeals } from '../contexts/DealsContext'
import { useDeals } from '../contexts/DealsContext'
import ApperIcon from './ApperIcon'
import Categories from './Categories'
import CartSidebar from './CartSidebar'

const Header = () => {
  const { getTotalItems } = useCart()
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isDealsDropdownOpen, setIsDealsDropdownOpen] = useState(false)
  const { getFeaturedDeals } = useDeals()
  const [isDealsDropdownOpen, setIsDealsDropdownOpen] = useState(false)
  const { getFeaturedDeals } = useDeals()
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
              
              {/* Deals Dropdown */}
              <div className="relative">
                <button
                  onMouseEnter={() => setIsDealsDropdownOpen(true)}
                  onMouseLeave={() => setIsDealsDropdownOpen(false)}
                  className="flex items-center space-x-1 text-surface-700 dark:text-surface-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors font-medium"
                >
                  <span>Deals</span>
                  <ApperIcon name="ChevronDown" className="h-4 w-4" />
                </button>
                
                {isDealsDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    onMouseEnter={() => setIsDealsDropdownOpen(true)}
                    onMouseLeave={() => setIsDealsDropdownOpen(false)}
                    className="absolute top-full left-0 mt-2 w-80 bg-white dark:bg-surface-800 rounded-2xl shadow-card border border-surface-200 dark:border-surface-700 p-4 z-50"
                  >
                    <div className="mb-4">
                      <h3 className="text-lg font-semibold text-surface-900 dark:text-surface-100 mb-2">
                        Featured Deals
                      </h3>
                      <div className="space-y-3">
                        {getFeaturedDeals().map(deal => (
                          <div key={deal.id} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-surface-50 dark:hover:bg-surface-700 transition-colors">
                            <img
                              src={deal.image}
                              alt={deal.title}
                              className="w-12 h-12 object-cover rounded-lg"
                            />
                            <div className="flex-1">
                              <h4 className="text-sm font-medium text-surface-900 dark:text-surface-100 truncate">
                                {deal.title}
                              </h4>
                              <div className="flex items-center space-x-2">
                                <span className="text-sm font-bold text-primary-600">${deal.discountedPrice}</span>
                                <span className="text-xs text-surface-400 line-through">${deal.originalPrice}</span>
                                <span className="text-xs bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-400 px-1.5 py-0.5 rounded">
                                  -{deal.discountPercentage}%
                                </span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="border-t border-surface-200 dark:border-surface-700 pt-3">
                      <Link
                        to="/deals"
                        className="block w-full text-center bg-gradient-to-r from-primary-600 to-secondary-600 text-white py-2 px-4 rounded-lg font-semibold hover:from-primary-700 hover:to-secondary-700 transition-colors"
                        onClick={() => setIsDealsDropdownOpen(false)}
                      >
                        View All Deals
                      </Link>
                    </div>
                  </motion.div>
                )}
              </div>
              
              
              {/* Deals Dropdown */}
              <div className="relative">
                <button
                  onMouseEnter={() => setIsDealsDropdownOpen(true)}
                  onMouseLeave={() => setIsDealsDropdownOpen(false)}
                  className="flex items-center space-x-1 text-surface-700 dark:text-surface-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors font-medium"
                >
                  <span>Deals</span>
                  <ApperIcon name="ChevronDown" className="h-4 w-4" />
                </button>
                
                {isDealsDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    onMouseEnter={() => setIsDealsDropdownOpen(true)}
                    onMouseLeave={() => setIsDealsDropdownOpen(false)}
                    className="absolute top-full left-0 mt-2 w-80 bg-white dark:bg-surface-800 rounded-2xl shadow-card border border-surface-200 dark:border-surface-700 p-4 z-50"
                  >
                    <div className="mb-4">
                      <h3 className="text-lg font-semibold text-surface-900 dark:text-surface-100 mb-2">
                        Featured Deals
                      </h3>
                      <div className="space-y-3">
                        {getFeaturedDeals().map(deal => (
                          <div key={deal.id} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-surface-50 dark:hover:bg-surface-700 transition-colors">
                            <img
                              src={deal.image}
                              alt={deal.title}
                              className="w-12 h-12 object-cover rounded-lg"
                            />
                            <div className="flex-1">
                              <h4 className="text-sm font-medium text-surface-900 dark:text-surface-100 truncate">
                                {deal.title}
                              </h4>
                              <div className="flex items-center space-x-2">
                                <span className="text-sm font-bold text-primary-600">${deal.discountedPrice}</span>
                                <span className="text-xs text-surface-400 line-through">${deal.originalPrice}</span>
                                <span className="text-xs bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-400 px-1.5 py-0.5 rounded">
                                  -{deal.discountPercentage}%
                                </span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="border-t border-surface-200 dark:border-surface-700 pt-3">
                      <Link
                        to="/deals"
                        className="block w-full text-center bg-gradient-to-r from-primary-600 to-secondary-600 text-white py-2 px-4 rounded-lg font-semibold hover:from-primary-700 hover:to-secondary-700 transition-colors"
                        onClick={() => setIsDealsDropdownOpen(false)}
                      >
                        View All Deals
                      </Link>
                    </div>
                  </motion.div>
                )}
              </div>
              
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