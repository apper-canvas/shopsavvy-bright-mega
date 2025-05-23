import { useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import ApperIcon from '../components/ApperIcon'

const Categories = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const navigate = useNavigate()

  const categories = [
    { id: 1, name: 'Electronics', icon: 'Smartphone', count: 1240, color: 'from-blue-500 to-cyan-500', description: 'Latest gadgets and electronic devices' },
    { id: 2, name: 'Fashion', icon: 'Shirt', count: 890, color: 'from-pink-500 to-rose-500', description: 'Trendy clothing and accessories' },
    { id: 3, name: 'Home & Garden', icon: 'Home', count: 650, color: 'from-green-500 to-emerald-500', description: 'Everything for your home and garden' },
    { id: 4, name: 'Sports', icon: 'Dumbbell', count: 420, color: 'from-orange-500 to-amber-500', description: 'Sports equipment and fitness gear' },
    { id: 5, name: 'Books', icon: 'Book', count: 780, color: 'from-purple-500 to-violet-500', description: 'Books, magazines, and educational materials' },
    { id: 6, name: 'Health & Beauty', icon: 'Heart', count: 340, color: 'from-red-500 to-pink-500', description: 'Health, beauty, and wellness products' },
    { id: 7, name: 'Toys & Games', icon: 'Gamepad2', count: 560, color: 'from-yellow-500 to-orange-500', description: 'Fun toys and games for all ages' },
    { id: 8, name: 'Automotive', icon: 'Car', count: 290, color: 'from-gray-500 to-slate-500', description: 'Car accessories and automotive parts' },
  ]

  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleCategoryClick = (category) => {
    toast.success(`Browsing ${category.name} products`)
    navigate(`/category/${category.id}`)
  }

  const handleBackToHome = () => {
    navigate('/')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-surface-50 via-white to-primary-50 dark:from-surface-900 dark:via-surface-800 dark:to-surface-900">
      {/* Header */}
      <header className="sticky top-0 z-40 w-full border-b border-surface-200/60 bg-white/80 backdrop-blur-lg dark:border-surface-700/60 dark:bg-surface-900/80">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
          <button
            onClick={handleBackToHome}
            className="flex items-center space-x-3 text-surface-600 hover:text-primary-600 transition-colors"
          >
            <ApperIcon name="ArrowLeft" className="h-5 w-5" />
            <span className="font-medium">Back to Home</span>
          </button>
          
          <h1 className="text-xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent sm:text-2xl">
            All Categories
          </h1>
          
          <div className="w-24"></div>
        </div>
      </header>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="max-w-md mx-auto">
            <div className="relative">
              <ApperIcon name="Search" className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-surface-400" />
              <input
                type="text"
                placeholder="Search categories..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white dark:bg-surface-800 border border-surface-200 dark:border-surface-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
              />
            </div>
          </div>
        </motion.div>

        {/* Categories Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {filteredCategories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="group cursor-pointer"
              onClick={() => handleCategoryClick(category)}
            >
              <div className="bg-white dark:bg-surface-800 rounded-xl p-6 shadow-card hover:shadow-xl transition-all duration-300 border border-surface-200 dark:border-surface-700 hover:border-primary-300 dark:hover:border-primary-600">
                <div className={`flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-r ${category.color} shadow-lg mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <ApperIcon name={category.icon} className="h-8 w-8 text-white" />
                </div>
                
                <h3 className="text-lg font-semibold text-surface-900 dark:text-surface-100 mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                  {category.name}
                </h3>
                
                <p className="text-sm text-surface-600 dark:text-surface-400 mb-3">
                  {category.description}
                </p>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-surface-500 dark:text-surface-400">
                    {category.count} products
                  </span>
                  <ApperIcon name="ArrowRight" className="h-5 w-5 text-surface-400 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors" />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {filteredCategories.length === 0 && (
          <div className="text-center py-12">
            <p className="text-lg text-surface-500 dark:text-surface-400">No categories found matching your search.</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Categories