import { useState } from 'react'
import { motion } from 'framer-motion'
import { toast } from 'react-hot-toast'
import Header from '../components/Header'
import Footer from '../components/Footer'
import ApperIcon from '../components/ApperIcon'

const ShippingInfo = () => {
  const [trackingNumber, setTrackingNumber] = useState('')
  const [selectedZone, setSelectedZone] = useState('domestic')

  const shippingOptions = [
    {
      name: 'Standard Shipping',
      price: 'FREE',
      duration: '5-7 business days',
      description: 'Free shipping on orders over $50',
      icon: 'Package'
    },
    {
      name: 'Express Shipping',
      price: '$9.99',
      duration: '2-3 business days',
      description: 'Faster delivery for urgent orders',
      icon: 'Zap'
    },
    {
      name: 'Overnight Shipping',
      price: '$19.99',
      duration: '1 business day',
      description: 'Next day delivery by 5 PM',
      icon: 'Clock'
    }
  ]

  const shippingZones = [
    {
      id: 'domestic',
      name: 'Domestic (US)',
      regions: ['United States', 'Alaska', 'Hawaii', 'Puerto Rico'],
      note: 'Standard shipping rates apply'
    },
    {
      id: 'canada',
      name: 'Canada',
      regions: ['All Canadian provinces and territories'],
      note: 'Additional customs fees may apply'
    },
    {
      id: 'international',
      name: 'International',
      regions: ['Europe', 'Asia', 'Australia', 'South America'],
      note: 'Extended delivery times and customs fees apply'
    }
  ]

  const handleTrackOrder = (e) => {
    e.preventDefault()
    if (!trackingNumber.trim()) {
      toast.error('Please enter a tracking number')
      return
    }

    toast.promise(
      new Promise((resolve) => setTimeout(resolve, 1500)),
      {
        loading: 'Looking up tracking information...',
        success: 'Tracking information found! Redirecting to tracking page...',
        error: 'Tracking number not found. Please check and try again.'
      }
    )

    setTrackingNumber('')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-100 via-primary-50 to-white dark:from-surface-900 dark:via-surface-800 dark:to-surface-900">
      <Header />
      
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
              Shipping Information
            </h1>
            <p className="text-lg text-surface-600 dark:text-surface-400 max-w-3xl mx-auto">
              Learn about our shipping options, rates, and delivery times. Track your orders and get updates.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Quick Track */}
            <motion.div
              className="lg:col-span-1"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="bg-white dark:bg-surface-800 rounded-2xl shadow-neu-light dark:shadow-neu-dark p-6 sticky top-24">
                <h3 className="text-xl font-semibold text-surface-900 dark:text-surface-100 mb-4">
                  Quick Track
                </h3>
                <form onSubmit={handleTrackOrder} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                      Tracking Number
                    </label>
                    <input
                      type="text"
                      value={trackingNumber}
                      onChange={(e) => setTrackingNumber(e.target.value)}
                      placeholder="Enter tracking number"
                      className="w-full px-4 py-3 rounded-lg border border-surface-300 dark:border-surface-600 bg-surface-50 dark:bg-surface-700 text-surface-900 dark:text-surface-100 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-primary-600 to-secondary-600 text-white py-3 px-4 rounded-lg font-semibold hover:shadow-lg transform hover:-translate-y-0.5 transition-all"
                  >
                    Track Order
                  </button>
                </form>
              </div>
            </motion.div>

            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Shipping Options */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <h2 className="text-2xl font-bold text-surface-900 dark:text-surface-100 mb-6">
                  Shipping Options
                </h2>
                <div className="grid gap-6">
                  {shippingOptions.map((option, index) => (
                    <div
                      key={option.name}
                      className="bg-white dark:bg-surface-800 rounded-xl shadow-neu-light dark:shadow-neu-dark p-6 border border-surface-200 dark:border-surface-700"
                    >
                      <div className="flex items-start space-x-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary-100 dark:bg-primary-900/20">
                          <ApperIcon name={option.icon} className="h-6 w-6 text-primary-600" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="text-lg font-semibold text-surface-900 dark:text-surface-100">
                              {option.name}
                            </h3>
                            <span className="text-lg font-bold text-primary-600">
                              {option.price}
                            </span>
                          </div>
                          <p className="text-surface-600 dark:text-surface-400 mb-1">
                            {option.duration}
                          </p>
                          <p className="text-sm text-surface-500 dark:text-surface-500">
                            {option.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Shipping Zones */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <h2 className="text-2xl font-bold text-surface-900 dark:text-surface-100 mb-6">
                  Shipping Zones
                </h2>
                <div className="bg-white dark:bg-surface-800 rounded-xl shadow-neu-light dark:shadow-neu-dark overflow-hidden">
                  <div className="border-b border-surface-200 dark:border-surface-700">
                    <div className="flex">
                      {shippingZones.map(zone => (
                        <button
                          key={zone.id}
                          onClick={() => setSelectedZone(zone.id)}
                          className={`flex-1 px-6 py-4 font-medium transition-colors ${
                            selectedZone === zone.id
                              ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-600 border-b-2 border-primary-600'
                              : 'text-surface-600 dark:text-surface-400 hover:text-surface-900 dark:hover:text-surface-100'
                          }`}
                        >
                          {zone.name}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="p-6">
                    {shippingZones.find(zone => zone.id === selectedZone) && (
                      <div className="space-y-4">
                        <h4 className="font-semibold text-surface-900 dark:text-surface-100">
                          Covered Regions:
                        </h4>
                        <ul className="space-y-2">
                          {shippingZones.find(zone => zone.id === selectedZone).regions.map((region, index) => (
                            <li key={index} className="flex items-center space-x-2">
                              <ApperIcon name="Check" className="h-4 w-4 text-green-500" />
                              <span className="text-surface-600 dark:text-surface-400">{region}</span>
                            </li>
                          ))}
                        </ul>
                        <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                          <p className="text-sm text-blue-800 dark:text-blue-200">
                            <ApperIcon name="Info" className="h-4 w-4 inline mr-2" />
                            {shippingZones.find(zone => zone.id === selectedZone).note}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default ShippingInfo