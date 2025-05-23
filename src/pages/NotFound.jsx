import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import ApperIcon from '../components/ApperIcon'

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="space-y-8"
        >
          {/* 404 Illustration */}
          <div className="relative">
            <motion.div
              className="text-8xl sm:text-9xl font-bold text-surface-200 dark:text-surface-800"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              404
            </motion.div>
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div className="flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-primary-500 to-secondary-500 shadow-xl">
                <ApperIcon name="ShoppingBag" className="h-12 w-12 text-white" />
              </div>
            </motion.div>
          </div>

          {/* Error Message */}
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <h1 className="text-2xl sm:text-3xl font-bold text-surface-900 dark:text-surface-100">
              Oops! Page Not Found
            </h1>
            <p className="text-surface-600 dark:text-surface-400 max-w-sm mx-auto">
              The page you're looking for seems to have wandered off. Let's get you back to shopping!
            </p>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <Link
              to="/"
              className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-primary-600 to-secondary-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
            >
              <ApperIcon name="Home" className="w-5 h-5 mr-2" />
              Back to Home
            </Link>
            
            <button
              onClick={() => window.history.back()}
              className="inline-flex items-center justify-center px-6 py-3 bg-white dark:bg-surface-800 text-surface-900 dark:text-surface-100 font-semibold rounded-xl border-2 border-surface-200 dark:border-surface-700 hover:border-primary-300 dark:hover:border-primary-600 transition-all duration-300"
            >
              <ApperIcon name="ArrowLeft" className="w-5 h-5 mr-2" />
              Go Back
            </button>
          </motion.div>

          {/* Helpful Links */}
          <motion.div
            className="pt-8 border-t border-surface-200 dark:border-surface-700"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1 }}
          >
            <h3 className="text-lg font-semibold text-surface-900 dark:text-surface-100 mb-4">
              Popular Pages
            </h3>
            <div className="grid grid-cols-2 gap-3">
              <Link
                to="/"
                className="flex items-center p-3 rounded-lg bg-surface-50 dark:bg-surface-800 hover:bg-surface-100 dark:hover:bg-surface-700 transition-colors text-sm"
              >
                <ApperIcon name="Package" className="w-4 h-4 mr-2 text-primary-600" />
                Products
              </Link>
              <Link
                to="/"
                className="flex items-center p-3 rounded-lg bg-surface-50 dark:bg-surface-800 hover:bg-surface-100 dark:hover:bg-surface-700 transition-colors text-sm"
              >
                <ApperIcon name="Tag" className="w-4 h-4 mr-2 text-secondary-600" />
                Deals
              </Link>
              <Link
                to="/"
                className="flex items-center p-3 rounded-lg bg-surface-50 dark:bg-surface-800 hover:bg-surface-100 dark:hover:bg-surface-700 transition-colors text-sm"
              >
                <ApperIcon name="Grid3X3" className="w-4 h-4 mr-2 text-accent" />
                Categories
              </Link>
              <Link
                to="/"
                className="flex items-center p-3 rounded-lg bg-surface-50 dark:bg-surface-800 hover:bg-surface-100 dark:hover:bg-surface-700 transition-colors text-sm"
              >
                <ApperIcon name="HelpCircle" className="w-4 h-4 mr-2 text-surface-600" />
                Support
              </Link>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}

export default NotFound