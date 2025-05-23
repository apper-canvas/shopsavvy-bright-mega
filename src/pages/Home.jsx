import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import ApperIcon from '../components/ApperIcon'
import MainFeature from '../components/MainFeature'
import Header from '../components/Header'
import Categories from '../components/Categories'
import Footer from '../components/Footer'

const Home = () => {
  const [darkMode, setDarkMode] = useState(false)
  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
    document.documentElement.classList.toggle('dark')
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-40 w-full border-b border-surface-200/60 bg-white/80 backdrop-blur-lg dark:border-surface-700/60 dark:bg-surface-900/80">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="flex items-center space-x-3"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary-500 to-secondary-500 shadow-lg">
              <ApperIcon name="ShoppingBag" className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent sm:text-2xl">
              ShopSavvy
            </h1>
          </motion.div>

          <nav className="hidden md:flex items-center space-x-8">
          </nav>

          <div className="flex items-center space-x-3">
            <button
              onClick={toggleDarkMode}
              className="flex h-10 w-10 items-center justify-center rounded-xl bg-surface-100 text-surface-600 transition-all hover:bg-surface-200 hover:text-surface-800 dark:bg-surface-800 dark:text-surface-400 dark:hover:bg-surface-700 dark:hover:text-surface-200"
            >
              <ApperIcon name={darkMode ? "Sun" : "Moon"} className="h-5 w-5" />
            </button>

            <button className="md:hidden flex h-10 w-10 items-center justify-center rounded-xl bg-surface-100 text-surface-600 transition-all hover:bg-surface-200 hover:text-surface-800 dark:bg-surface-800 dark:text-surface-400 dark:hover:bg-surface-700 dark:hover:text-surface-200">
              <ApperIcon name="Menu" className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-12 sm:py-16 lg:py-20">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-500/10 via-transparent to-secondary-500/10"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-surface-900 dark:text-surface-100 leading-tight">
                Discover Amazing Products with{" "}
                <span className="bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                  Smart Shopping
                </span>
              </h2>
              <p className="text-lg text-surface-600 dark:text-surface-400 max-w-xl">
                Experience the future of e-commerce with intelligent product discovery, personalized recommendations, and seamless checkout.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  to="/products"
                  className="inline-block px-8 py-3 bg-gradient-to-r from-primary-600 to-secondary-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 text-center"
                >
                  Start Shopping
                </Link>
            <Link to="/categories" className="group relative overflow-hidden rounded-xl bg-secondary px-8 py-4 font-semibold text-white shadow-lg transition-all duration-300 hover:bg-secondary-dark hover:shadow-xl inline-block text-center">
                  Browse Categories
            </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative w-full h-80 sm:h-96 lg:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=600&fit=crop&crop=center"
                  alt="Shopping Experience"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>
              
              {/* Floating Cards */}
              <motion.div
                className="absolute top-4 right-4 sm:top-6 sm:right-6 lg:-right-4 lg:top-8"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
              >
                <div className="glass-morphism rounded-xl p-4 shadow-lg backdrop-blur-sm">
                  <div className="flex items-center space-x-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-500">
                      <ApperIcon name="TrendingUp" className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-surface-900">Sales Up</p>
                      <p className="text-xs text-surface-600">+24% this week</p>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 lg:-left-4 lg:bottom-8"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 1 }}
              >
                <div className="glass-morphism rounded-xl p-4 shadow-lg backdrop-blur-sm">
                  <div className="flex items-center space-x-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-500">
                      <ApperIcon name="Star" className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-surface-900">Top Rated</p>
                      <p className="text-xs text-surface-600">4.9★ Reviews</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white/50 dark:bg-surface-800/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {[
              { icon: "Users", value: "50K+", label: "Happy Customers" },
              { icon: "Package", value: "10K+", label: "Products" },
              { icon: "Globe", value: "25+", label: "Countries" },
              { icon: "Award", value: "99%", label: "Satisfaction" }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                className="text-center group"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="flex h-16 w-16 items-center justify-center mx-auto mb-4 rounded-2xl bg-gradient-to-br from-primary-500 to-secondary-500 shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
                  <ApperIcon name={stat.icon} className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-surface-900 dark:text-surface-100">
                  {stat.value}
                </h3>
                <p className="text-sm text-surface-600 dark:text-surface-400 font-medium">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Feature Section */}
      <MainFeature />

      <Footer />
    </div>
  )
}

export default Home