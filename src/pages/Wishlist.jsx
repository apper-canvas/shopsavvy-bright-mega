import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../contexts/CartContext'
import { useProducts } from '../contexts/ProductsContext'
import Header from '../components/Header'
import CartSidebar from '../components/CartSidebar'
import ApperIcon from '../components/ApperIcon'

const Wishlist = () => {
  const navigate = useNavigate()
  const { addToCart } = useCart()
  const { getFavoriteProducts, toggleFavorite, favorites } = useProducts()
  
  const favoriteProducts = getFavoriteProducts()

  const handleAddToCart = (product) => {
    addToCart(product)
  }

  const handleRemoveFromWishlist = (productId) => {
    toggleFavorite(productId)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-100 via-primary-50 to-white dark:from-surface-900 dark:via-surface-800 dark:to-surface-900">
      <Header />
      <CartSidebar />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-surface-900 dark:text-surface-100 mb-4">
              My Wishlist
            </h1>
            <p className="text-lg text-surface-600 dark:text-surface-400 max-w-3xl mx-auto">
              {favoriteProducts.length > 0 
                ? `You have ${favoriteProducts.length} item${favoriteProducts.length === 1 ? '' : 's'} in your wishlist`
                : 'Your wishlist is empty. Start adding products you love!'
              }
            </p>
          </motion.div>

          {favoriteProducts.length === 0 ? (
            /* Empty State */
            <motion.div
              className="text-center py-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="flex h-24 w-24 items-center justify-center mx-auto mb-6 rounded-full bg-surface-100 dark:bg-surface-700">
                <ApperIcon name="Heart" className="h-12 w-12 text-surface-400" />
              </div>
              <h3 className="text-xl font-semibold text-surface-900 dark:text-surface-100 mb-2">
                No items in your wishlist yet
              </h3>
              <p className="text-surface-600 dark:text-surface-400 mb-6">
                Discover amazing products and add them to your wishlist
              </p>
              <button
                onClick={() => navigate('/products')}
                className="px-6 py-3 bg-gradient-to-r from-primary-600 to-secondary-600 text-white rounded-lg hover:shadow-lg transition-all font-medium"
              >
                Continue Shopping
              </button>
            </motion.div>
          ) : (
            /* Products Grid */
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {favoriteProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  className="group bg-white dark:bg-surface-800 rounded-2xl shadow-neu-light dark:shadow-neu-dark overflow-hidden hover:shadow-xl transition-all duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  layout
                >
                  {/* Product Image */}
                  <div 
                    className="relative aspect-square overflow-hidden cursor-pointer"
                    onClick={() => navigate(`/product/${product.id}`)}
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    
                    {/* Remove Button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        handleRemoveFromWishlist(product.id)
                      }}
                      className="absolute top-3 right-3 flex h-8 w-8 items-center justify-center rounded-full bg-red-500 text-white hover:bg-red-600 transition-colors opacity-0 group-hover:opacity-100"
                    >
                      <ApperIcon name="X" className="h-4 w-4" />
                    </button>

                    {/* Badges */}
                    <div className="absolute top-3 left-3 space-y-2">
                      {product.originalPrice > product.price && (
                        <span className="px-2 py-1 bg-red-500 text-white text-xs font-bold rounded-full">
                          SALE
                        </span>
                      )}
                      {!product.inStock && (
                        <span className="px-2 py-1 bg-surface-500 text-white text-xs font-bold rounded-full">
                          OUT OF STOCK
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Product Info */}
                  <div className="p-4">
                    <div 
                      className="cursor-pointer mb-3"
                      onClick={() => navigate(`/product/${product.id}`)}
                    >
                      <h3 className="font-semibold text-surface-900 dark:text-surface-100 hover:text-primary-600 transition-colors line-clamp-2">
                        {product.name}
                      </h3>
                      <p className="text-sm text-surface-500 mt-1">{product.brand}</p>
                    </div>

                    {/* Rating */}
                    <div className="flex items-center space-x-2 mb-3">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <ApperIcon
                            key={i}
                            name="Star"
                            className={`h-4 w-4 ${
                              i < Math.floor(product.rating)
                                ? 'text-yellow-400 fill-current'
                                : 'text-surface-300'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-surface-500">
                        {product.rating}
                      </span>
                    </div>

                    {/* Price and Add to Cart */}
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <span className="text-lg font-bold text-surface-900 dark:text-surface-100">
                          ${product.price}
                        </span>
                        {product.originalPrice > product.price && (
                          <div className="text-xs text-surface-500 line-through">
                            ${product.originalPrice}
                          </div>
                        )}
                      </div>
                      <button
                        onClick={() => handleAddToCart(product)}
                        disabled={!product.inStock}
                        className={`px-3 py-2 rounded-lg font-medium text-sm transition-all ${
                          product.inStock
                            ? 'bg-gradient-to-r from-primary-600 to-secondary-600 text-white hover:shadow-lg hover:-translate-y-0.5'
                            : 'bg-surface-300 text-surface-500 cursor-not-allowed'
                        }`}
                      >
                        {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </main>
    </div>
  )
}

export default Wishlist