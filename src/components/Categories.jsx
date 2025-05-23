import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import ApperIcon from './ApperIcon'

const Categories = () => {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef(null)
  const navigate = useNavigate()

  const categories = [
    { id: 1, name: 'Electronics', icon: 'Smartphone', count: 1240, color: 'from-blue-500 to-cyan-500' },
    { id: 2, name: 'Fashion', icon: 'Shirt', count: 890, color: 'from-pink-500 to-rose-500' },
    { id: 3, name: 'Home & Garden', icon: 'Home', count: 650, color: 'from-green-500 to-emerald-500' },
    { id: 4, name: 'Sports', icon: 'Dumbbell', count: 420, color: 'from-orange-500 to-amber-500' },
    { id: 5, name: 'Books', icon: 'Book', count: 780, color: 'from-purple-500 to-violet-500' },
    { id: 6, name: 'Health & Beauty', icon: 'Heart', count: 340, color: 'from-red-500 to-pink-500' },
  ]

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleCategoryClick = (category) => {
    navigate(`/category/${category.id}`)
    setIsOpen(false)
  }

  const handleViewAllCategories = () => {
    navigate('/categories')
    setIsOpen(false)
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        className="flex items-center space-x-1 text-surface-600 hover:text-primary-600 transition-colors font-medium"
        onClick={() => setIsOpen(!isOpen)}
        onMouseEnter={() => setIsOpen(true)}
      >
        <span>Categories</span>
        <ApperIcon 
          name={isOpen ? "ChevronUp" : "ChevronDown"} 
          className="h-4 w-4 transition-transform duration-200" 
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute left-0 top-full mt-2 w-80 bg-white dark:bg-surface-800 border border-surface-200 dark:border-surface-700 rounded-xl shadow-xl backdrop-blur-lg z-50"
            onMouseLeave={() => setIsOpen(false)}
          >
            <div className="p-4">
              <h3 className="text-lg font-semibold text-surface-900 dark:text-surface-100 mb-4">
                Shop by Category
              </h3>
              <div className="space-y-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => handleCategoryClick(category)}
                    className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-surface-50 dark:hover:bg-surface-700 transition-colors group"
                  >
                    <div className={`flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-r ${category.color} shadow-sm`}>
                      <ApperIcon name={category.icon} className="h-5 w-5 text-white" />
                    </div>
                    <div className="flex-1 text-left">
                      <p className="font-medium text-surface-900 dark:text-surface-100 group-hover:text-primary-600 dark:group-hover:text-primary-400">{category.name}</p>
                      <p className="text-sm text-surface-500 dark:text-surface-400">{category.count} products</p>
                    </div>
                    <ApperIcon name="ChevronRight" className="h-4 w-4 text-surface-400" />
                  </button>
                ))}
              </div>
              <button
                onClick={handleViewAllCategories}
                className="w-full mt-4 px-4 py-2 bg-gradient-to-r from-primary-500 to-secondary-500 text-white font-medium rounded-lg hover:from-primary-600 hover:to-secondary-600 transition-all duration-200"
              >
                View All Categories
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Categories