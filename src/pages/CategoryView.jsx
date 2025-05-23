import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import ApperIcon from '../components/ApperIcon'

const CategoryView = () => {
  const { categoryId } = useParams()
  const navigate = useNavigate()
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [sortBy, setSortBy] = useState('name')
  const [filterBy, setFilterBy] = useState('all')

  const categories = {
    1: { name: 'Electronics', icon: 'Smartphone', color: 'from-blue-500 to-cyan-500' },
    2: { name: 'Fashion', icon: 'Shirt', color: 'from-pink-500 to-rose-500' },
    3: { name: 'Home & Garden', icon: 'Home', color: 'from-green-500 to-emerald-500' },
    4: { name: 'Sports', icon: 'Dumbbell', color: 'from-orange-500 to-amber-500' },
    5: { name: 'Books', icon: 'Book', color: 'from-purple-500 to-violet-500' },
    6: { name: 'Health & Beauty', icon: 'Heart', color: 'from-red-500 to-pink-500' },
    7: { name: 'Toys & Games', icon: 'Gamepad2', color: 'from-yellow-500 to-orange-500' },
    8: { name: 'Automotive', icon: 'Car', color: 'from-gray-500 to-slate-500' },
  }

  const currentCategory = categories[categoryId]

  useEffect(() => {
    // Simulate loading products for this category
    const loadProducts = async () => {
      setLoading(true)
      
      // Mock products data
      const mockProducts = [
        { id: 1, name: 'Product 1', price: 29.99, rating: 4.5, image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=300&fit=crop', inStock: true },
        { id: 2, name: 'Product 2', price: 49.99, rating: 4.2, image: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=300&h=300&fit=crop', inStock: true },
        { id: 3, name: 'Product 3', price: 19.99, rating: 4.8, image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=300&h=300&fit=crop', inStock: false },
        { id: 4, name: 'Product 4', price: 79.99, rating: 4.1, image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=300&h=300&fit=crop', inStock: true },
        { id: 5, name: 'Product 5', price: 34.99, rating: 4.6, image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&h=300&fit=crop', inStock: true },
        { id: 6, name: 'Product 6', price: 59.99, rating: 4.3, image: 'https://images.unsplash.com/photo-1629198688000-71f23e745b6e?w=300&h=300&fit=crop', inStock: true },
      ]

      setTimeout(() => {
        setProducts(mockProducts)
        setLoading(false)
      }, 1000)
    }

    loadProducts()
  }, [categoryId])

  const handleAddToCart = (product) => {
  }

  const handleProductClick = (product) => {
  }

  const sortedProducts = [...products].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price
      case 'price-high':
        return b.price - a.price
      case 'rating':
        return b.rating - a.rating
      default:
        return a.name.localeCompare(b.name)
    }
  })

  const filteredProducts = sortedProducts.filter(product => {
    if (filterBy === 'in-stock') return product.inStock
    if (filterBy === 'out-of-stock') return !product.inStock
    return true
  })

  if (!currentCategory) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-surface-900 dark:text-surface-100 mb-4">Category Not Found</h1>
          <button
            onClick={() => navigate('/categories')}
            className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-semibold"
          >
            Browse All Categories
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-surface-50 via-white to-primary-50 dark:from-surface-900 dark:via-surface-800 dark:to-surface-900">
      {/* Header */}
      <header className="sticky top-0 z-40 w-full border-b border-surface-200/60 bg-white/80 backdrop-blur-lg dark:border-surface-700/60 dark:bg-surface-900/80">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
          <button
            onClick={() => navigate('/categories')}
            className="flex items-center space-x-3 text-surface-900 dark:text-surface-100 hover:text-primary-600 transition-colors font-medium"
          >
            <ApperIcon name="ArrowLeft" className="h-5 w-5" />
            <span className="font-medium">All Categories</span>
          </button>
          
          <div className="flex items-center space-x-3">
            <div className={`flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-r ${currentCategory.color}`}>
              <ApperIcon name={currentCategory.icon} className="h-4 w-4 text-white" />
            </div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent sm:text-2xl">
              {currentCategory.name}
            </h1>
          </div>
          
          <div className="w-24"></div>
        </div>
      </header>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 mb-8"
        >
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2 bg-white dark:bg-surface-800 border border-surface-200 dark:border-surface-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-surface-900 dark:text-surface-100"
          >
            <option value="name">Sort by Name</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Sort by Rating</option>
          </select>

          <select
            value={filterBy}
            onChange={(e) => setFilterBy(e.target.value)}
            className="px-4 py-2 bg-white dark:bg-surface-800 border border-surface-200 dark:border-surface-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-surface-900 dark:text-surface-100"
          >
            <option value="all">All Products</option>
            <option value="in-stock">In Stock</option>
            <option value="out-of-stock">Out of Stock</option>
          </select>
        </motion.div>

        {/* Loading State */}
        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, index) => (
              <div key={index} className="bg-white dark:bg-surface-800 rounded-xl p-4 shadow-card animate-pulse">
                <div className="bg-surface-200 dark:bg-surface-700 rounded-lg h-48 mb-4"></div>
                <div className="bg-surface-200 dark:bg-surface-700 rounded h-4 mb-2"></div>
                <div className="bg-surface-200 dark:bg-surface-700 rounded h-4 w-2/3"></div>
              </div>
            ))}
          </div>
        )}

        {/* Products Grid */}
        {!loading && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {filteredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white dark:bg-surface-800 rounded-xl shadow-card hover:shadow-xl transition-all duration-300 overflow-hidden group cursor-pointer"
                onClick={() => handleProductClick(product)}
              >
                <div className="relative">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {!product.inStock && (
                    <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-lg text-xs font-medium">
                      Out of Stock
                    </div>
                  )}
                </div>
                
                <div className="p-4">
                  <h3 className="font-semibold text-surface-900 dark:text-surface-100 mb-2">{product.name}</h3>
                  <div className="flex items-center mb-2">
                    <div className="flex items-center">
                      <ApperIcon name="Star" className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="ml-1 text-sm text-surface-600 dark:text-surface-400">{product.rating}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-primary-600">${product.price}</span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        handleAddToCart(product)
                      }}
                      disabled={!product.inStock}
                      className="px-3 py-1 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:bg-surface-300 disabled:text-surface-500 disabled:cursor-not-allowed transition-colors text-sm font-medium"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {!loading && filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-lg text-surface-500 dark:text-surface-400">No products found in this category.</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default CategoryView