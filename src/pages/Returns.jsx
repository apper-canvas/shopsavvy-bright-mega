import { useState } from 'react'
import { motion } from 'framer-motion'
import { toast } from 'react-hot-toast'
import Header from '../components/Header'
import Footer from '../components/Footer'
import ApperIcon from '../components/ApperIcon'

const Returns = () => {
  const [returnForm, setReturnForm] = useState({
    orderNumber: '',
    email: '',
    reason: '',
    description: '',
    refundMethod: 'original'
  })

  const returnReasons = [
    'Defective/Damaged item',
    'Wrong item received',
    'Item not as described',
    'Changed my mind',
    'Found better price elsewhere',
    'Other'
  ]

  const returnPolicy = [
    {
      title: '30-Day Return Window',
      description: 'Most items can be returned within 30 days of delivery',
      icon: 'Calendar'
    },
    {
      title: 'Original Condition',
      description: 'Items must be unused and in original packaging',
      icon: 'Package'
    },
    {
      title: 'Free Return Shipping',
      description: 'We provide prepaid return labels for most returns',
      icon: 'Truck'
    },
    {
      title: 'Quick Refunds',
      description: 'Refunds processed within 3-5 business days',
      icon: 'CreditCard'
    }
  ]

  const nonReturnableItems = [
    'Personal care items',
    'Food and perishables',
    'Custom/personalized items',
    'Digital downloads',
    'Gift cards'
  ]

  const handleFormSubmit = (e) => {
    e.preventDefault()
    
    if (!returnForm.orderNumber || !returnForm.email || !returnForm.reason) {
      toast.error('Please fill in all required fields')
      return
    }

    toast.promise(
      new Promise((resolve) => setTimeout(resolve, 2000)),
      {
        loading: 'Processing return request...',
        success: 'Return request submitted successfully! You will receive return instructions via email.',
        error: 'Failed to submit return request. Please try again.'
      }
    )

    // Reset form
    setReturnForm({
      orderNumber: '',
      email: '',
      reason: '',
      description: '',
      refundMethod: 'original'
    })
  }

  const handleInputChange = (e) => {
    setReturnForm({
      ...returnForm,
      [e.target.name]: e.target.value
    })
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
              Returns & Refunds
            </h1>
            <p className="text-lg text-surface-600 dark:text-surface-400 max-w-3xl mx-auto">
              Easy returns and hassle-free refunds. We want you to be completely satisfied with your purchase.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Return Policy */}
            <motion.div
              className="lg:col-span-1"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="bg-white dark:bg-surface-800 rounded-2xl shadow-neu-light dark:shadow-neu-dark p-6 sticky top-24">
                <h3 className="text-xl font-semibold text-surface-900 dark:text-surface-100 mb-6">
                  Return Policy
                </h3>
                <div className="space-y-4">
                  {returnPolicy.map((policy, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-100 dark:bg-primary-900/20 flex-shrink-0">
                        <ApperIcon name={policy.icon} className="h-4 w-4 text-primary-600" />
                      </div>
                      <div>
                        <h4 className="font-medium text-surface-900 dark:text-surface-100 text-sm">
                          {policy.title}
                        </h4>
                        <p className="text-xs text-surface-600 dark:text-surface-400 mt-1">
                          {policy.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 pt-6 border-t border-surface-200 dark:border-surface-600">
                  <h4 className="font-medium text-surface-900 dark:text-surface-100 mb-3 text-sm">
                    Non-Returnable Items:
                  </h4>
                  <ul className="space-y-1">
                    {nonReturnableItems.map((item, index) => (
                      <li key={index} className="text-xs text-surface-600 dark:text-surface-400 flex items-center space-x-2">
                        <ApperIcon name="X" className="h-3 w-3 text-red-500" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>

            {/* Return Form */}
            <motion.div
              className="lg:col-span-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div className="bg-white dark:bg-surface-800 rounded-2xl shadow-neu-light dark:shadow-neu-dark p-8">
                <h2 className="text-2xl font-bold text-surface-900 dark:text-surface-100 mb-6">
                  Start a Return
                </h2>
                <form onSubmit={handleFormSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                        Order Number *
                      </label>
                      <input
                        type="text"
                        name="orderNumber"
                        value={returnForm.orderNumber}
                        onChange={handleInputChange}
                        placeholder="e.g., ORD-123456"
                        required
                        className="w-full px-4 py-3 rounded-lg border border-surface-300 dark:border-surface-600 bg-surface-50 dark:bg-surface-700 text-surface-900 dark:text-surface-100 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={returnForm.email}
                        onChange={handleInputChange}
                        placeholder="your@email.com"
                        required
                        className="w-full px-4 py-3 rounded-lg border border-surface-300 dark:border-surface-600 bg-surface-50 dark:bg-surface-700 text-surface-900 dark:text-surface-100 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                      Reason for Return *
                    </label>
                    <select
                      name="reason"
                      value={returnForm.reason}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-surface-300 dark:border-surface-600 bg-surface-50 dark:bg-surface-700 text-surface-900 dark:text-surface-100 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    >
                      <option value="">Select a reason</option>
                      {returnReasons.map(reason => (
                        <option key={reason} value={reason}>{reason}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                      Additional Details
                    </label>
                    <textarea
                      name="description"
                      value={returnForm.description}
                      onChange={handleInputChange}
                      rows={4}
                      placeholder="Please provide any additional details about your return..."
                      className="w-full px-4 py-3 rounded-lg border border-surface-300 dark:border-surface-600 bg-surface-50 dark:bg-surface-700 text-surface-900 dark:text-surface-100 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                      Preferred Refund Method
                    </label>
                    <div className="space-y-2">
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="refundMethod"
                          value="original"
                          checked={returnForm.refundMethod === 'original'}
                          onChange={handleInputChange}
                          className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-surface-300"
                        />
                        <span className="ml-2 text-surface-700 dark:text-surface-300">Original payment method</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="refundMethod"
                          value="credit"
                          checked={returnForm.refundMethod === 'credit'}
                          onChange={handleInputChange}
                          className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-surface-300"
                        />
                        <span className="ml-2 text-surface-700 dark:text-surface-300">Store credit</span>
                      </label>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-primary-600 to-secondary-600 text-white py-3 px-6 rounded-lg font-semibold hover:shadow-lg transform hover:-translate-y-0.5 transition-all"
                  >
                    Submit Return Request
                  </button>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default Returns