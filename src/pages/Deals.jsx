import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useCart } from '../contexts/CartContext'
import Header from '../components/Header'
import ApperIcon from '../components/ApperIcon'
import { formatDistanceToNow } from 'date-fns'
import { fetchDeals } from '../services/dealService'
import { toast } from 'react-hot-toast'

const Deals = () => {
  const [deals, setDeals] = useState([])
  const [filteredDeals, setFilteredDeals] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [minDiscount, setMinDiscount] = useState(0)
  const [sortBy, setSortBy] = useState('featured')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const { addToCart } = useCart()
  
  // Fetch deals from the API
  useEffect(() => {
    const loadDeals = async () => {
      setIsLoading(true)
      try {
        const dealsData = await fetchDeals()
        setDeals(dealsData || [])
      } catch (error) {
        setError(error.message || 'Failed to load deals')
        toast.error('Error loading deals. Please try again.')
      } finally {
        setIsLoading(false)
      }
    }
    
    loadDeals()
  }, [])

  useEffect(() => {
    // Filter and sort deals
    const filterDeals = () => {
      let filtered = [...(deals || [])]
      
      // Apply category filter
      if (selectedCategory !== 'All') {
        filtered = filtered.filter(deal => deal.category === selectedCategory)
      }
      
      // Apply minimum discount filter
      if (minDiscount > 0) {
        filtered = filtered.filter(deal => deal.discountPercentage >= minDiscount)
      }
      
      // Apply sorting
      filtered.sort((a, b) => {
        if (sortBy === 'featured') {
          return b.featured - a.featured
        } else if (sortBy === 'discount') {
          return b.discountPercentage - a.discountPercentage
        } else if (sortBy === 'price') {
          return a.discountedPrice - b.discountedPrice
        }
        return 0
      })
      
      setFilteredDeals(filtered)
    }
    
    filterDeals()
  }, [deals, selectedCategory, minDiscount, sortBy])

  const categories = ['All', 'Electronics', 'Fashion', 'Beauty', 'Home']
  const discountOptions = [0, 20, 30, 40, 50]

  const handleClaimDeal = (deal) => {
    const product = {
      id: deal.id,
      name: deal.title,
      price: deal.discountedPrice,
      originalPrice: deal.originalPrice,
      image: deal.image,
      category: deal.category
    }
    addToCart(product)
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-primary-100 dark:from-surface-900 dark:via-surface-800 dark:to-surface-900">
      <Header />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent mb-4">
            Hot Deals & Offers
          </h1>
          <p className="text-surface-600 dark:text-surface-400 text-lg max-w-2xl mx-auto">
            Discover amazing discounts on your favorite products. Limited time offers!
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-surface-800 rounded-2xl shadow-soft p-6 mb-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Category Filter */}
            <div>
              <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                Category
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-3 py-2 border border-surface-300 dark:border-surface-600 rounded-lg bg-white dark:bg-surface-700 text-surface-900 dark:text-surface-100"
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>

            {/* Discount Filter */}
            <div>
              <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                Min Discount
              </label>
              <select
                value={minDiscount}
                onChange={(e) => setMinDiscount(Number(e.target.value))}
                className="w-full px-3 py-2 border border-surface-300 dark:border-surface-600 rounded-lg bg-white dark:bg-surface-700 text-surface-900 dark:text-surface-100"
              >
                {discountOptions.map(discount => (
                  <option key={discount} value={discount}>{discount}%+</option>
                ))}
              </select>
            </div>

            {/* Sort By */}
            <div>
              <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                Sort By
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-3 py-2 border border-surface-300 dark:border-surface-600 rounded-lg bg-white dark:bg-surface-700 text-surface-900 dark:text-surface-100"
              >
                <option value="featured">Featured</option>
                <option value="discount">Highest Discount</option>
                <option value="price">Lowest Price</option>
              </select>
            </div>

            {/* Results Count */}
            <div className="flex items-end">
              <div className="text-sm text-surface-600 dark:text-surface-400">
                {isLoading ? 'Loading...' : `${filteredDeals?.length || 0} deals found`}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Deals Grid */}
        {isLoading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary-600"></div>
          </div>
        ) : error ? (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6 text-center">
            <ApperIcon name="AlertCircle" className="h-12 w-12 mx-auto text-red-500 mb-4" />
            <h3 className="text-lg font-semibold text-red-700 dark:text-red-400 mb-2">
              Failed to Load Deals
            </h3>
            <p className="text-red-600 dark:text-red-300 mb-4">
              {error}
            </p>
            <button 
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-red-100 dark:bg-red-800 text-red-700 dark:text-red-200 rounded-lg hover:bg-red-200 dark:hover:bg-red-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        ) : filteredDeals?.length === 0 ? (
          <div className="bg-surface-50 dark:bg-surface-800 rounded-lg p-8 text-center">
            <p className="text-surface-600 dark:text-surface-400">No deals found matching your filters. Try adjusting your criteria.</p>
          </div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredDeals.map(deal => (
            <motion.div
              key={deal.id}
              variants={itemVariants}
              className="bg-white dark:bg-surface-800 rounded-2xl shadow-soft overflow-hidden hover:shadow-card transition-shadow"
            >
              <div className="relative">
                <img
                  src={deal.image}
                  alt={deal.title}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-4 left-4 bg-red-500 text-white px-2 py-1 rounded-lg text-sm font-bold">
                  -{deal.discountPercentage}%
                </div>
                {deal.featured && (
                  <div className="absolute top-4 right-4 bg-primary-500 text-white px-2 py-1 rounded-lg text-sm font-bold">
                    Featured
                  </div>
                )}
              </div>
              
              <div className="p-6">
                <h3 className="text-lg font-semibold text-surface-900 dark:text-surface-100 mb-2">
                  {deal.title}
                </h3>
                
                <div className="flex items-center space-x-2 mb-3">
                  <span className="text-2xl font-bold text-primary-600">${deal.discountedPrice}</span>
                  <span className="text-surface-400 line-through">${deal.originalPrice}</span>
                </div>
                
                <div className="flex items-center text-sm text-surface-600 dark:text-surface-400 mb-4">
                  <ApperIcon name="Clock" className="h-4 w-4 mr-1" />
                  Expires {formatDistanceToNow(deal.expiresAt, { addSuffix: true })}
                </div>
                
                <motion.button
                  onClick={() => handleClaimDeal(deal)}
                  className="w-full bg-gradient-to-r from-primary-600 to-secondary-600 text-white py-2 px-4 rounded-lg font-semibold hover:from-primary-700 hover:to-secondary-700 transition-colors"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Claim Deal
                </motion.button>
              </div>
            </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default Deals