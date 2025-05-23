import { useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../contexts/CartContext'
import Header from '../components/Header'
import ApperIcon from '../components/ApperIcon'

const Checkout = () => {
  const navigate = useNavigate()
  const { cart, getTotalPrice, clearCart } = useCart()
  const [currentStep, setCurrentStep] = useState(1)
  const [orderPlaced, setOrderPlaced] = useState(false)
  const [orderNumber, setOrderNumber] = useState('')
  
  const [customerInfo, setCustomerInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: ''
  })
  
  const [shippingAddress, setShippingAddress] = useState({
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'United States'
  })
  
  const [paymentMethod, setPaymentMethod] = useState('card')
  const [cardInfo, setCardInfo] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    nameOnCard: ''
  })

  const subtotal = getTotalPrice()
  const shipping = subtotal > 50 ? 0 : 9.99
  const tax = subtotal * 0.08
  const total = subtotal + shipping + tax

  const steps = [
    { number: 1, title: 'Customer Info', icon: 'User' },
    { number: 2, title: 'Shipping', icon: 'Truck' },
    { number: 3, title: 'Payment', icon: 'CreditCard' },
    { number: 4, title: 'Review', icon: 'CheckCircle' }
  ]

  const handleCustomerInfoSubmit = (e) => {
    e.preventDefault()
    if (customerInfo.firstName && customerInfo.lastName && customerInfo.email) {
      setCurrentStep(2)
    }
  }

  const handleShippingSubmit = (e) => {
    e.preventDefault()
    if (shippingAddress.address && shippingAddress.city && shippingAddress.state && shippingAddress.zipCode) {
      setCurrentStep(3)
    }
  }

  const handlePaymentSubmit = (e) => {
    e.preventDefault()
    if (paymentMethod === 'card') {
      if (cardInfo.cardNumber && cardInfo.expiryDate && cardInfo.cvv && cardInfo.nameOnCard) {
        setCurrentStep(4)
      }
    } else {
      setCurrentStep(4)
    }
  }

  const handlePlaceOrder = () => {
    const orderNum = 'ORD-' + Date.now().toString().slice(-6)
    setOrderNumber(orderNum)
    setOrderPlaced(true)
    clearCart()
  }

  if (cart.items.length === 0 && !orderPlaced) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-100 via-primary-50 to-white dark:from-surface-900 dark:via-surface-800 dark:to-surface-900">
        <Header />
        <main className="pt-24 pb-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-md mx-auto text-center">
              <div className="flex h-24 w-24 items-center justify-center mx-auto mb-6 rounded-full bg-surface-100 dark:bg-surface-700">
                <ApperIcon name="ShoppingCart" className="h-12 w-12 text-surface-400" />
              </div>
              <h1 className="text-2xl font-bold text-surface-900 dark:text-surface-100 mb-4">
                Your cart is empty
              </h1>
              <p className="text-surface-600 dark:text-surface-400 mb-6">
                Add some products to your cart before proceeding to checkout
              </p>
              <button
                onClick={() => navigate('/products')}
                className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        </main>
      </div>
    )
  }

  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-100 via-primary-50 to-white dark:from-surface-900 dark:via-surface-800 dark:to-surface-900">
        <Header />
        <main className="pt-24 pb-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-md mx-auto text-center">
              <motion.div
                className="flex h-24 w-24 items-center justify-center mx-auto mb-6 rounded-full bg-green-100 dark:bg-green-900/20"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', duration: 0.6 }}
              >
                <ApperIcon name="CheckCircle" className="h-12 w-12 text-green-600" />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <h1 className="text-2xl font-bold text-surface-900 dark:text-surface-100 mb-4">
                  Order Placed Successfully!
                </h1>
                <p className="text-surface-600 dark:text-surface-400 mb-2">
                  Thank you for your purchase
                </p>
                <p className="text-sm text-surface-500 mb-6">
                  Order Number: <span className="font-mono font-medium">{orderNumber}</span>
                </p>
                <div className="space-y-3">
                  <button
                    onClick={() => navigate('/products')}
                    className="w-full px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium"
                  >
                    Continue Shopping
                  </button>
                  <button
                    onClick={() => navigate('/')}
                    className="w-full px-6 py-3 border border-surface-300 dark:border-surface-600 text-surface-700 dark:text-surface-300 rounded-lg hover:bg-surface-50 dark:hover:bg-surface-700 transition-colors font-medium"
                  >
                    Back to Home
                  </button>
                </div>
              </motion.div>
            </div>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-100 via-primary-50 to-white dark:from-surface-900 dark:via-surface-800 dark:to-surface-900">
      <Header />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            {/* Progress Steps */}
            <div className="mb-8">
              <div className="flex items-center justify-between">
                {steps.map((step, index) => (
                  <div key={step.number} className="flex items-center">
                    <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-colors ${
                      currentStep >= step.number
                        ? 'bg-primary-600 border-primary-600 text-white'
                        : 'border-surface-300 dark:border-surface-600 text-surface-400'
                    }`}>
                      <ApperIcon name={step.icon} className="h-5 w-5" />
                    </div>
                    {index < steps.length - 1 && (
                      <div className={`hidden sm:block w-20 h-0.5 mx-4 transition-colors ${
                        currentStep > step.number ? 'bg-primary-600' : 'bg-surface-300 dark:bg-surface-600'
                      }`} />
                    )}
                  </div>
                ))}
              </div>
              <div className="flex justify-between mt-2">
                {steps.map((step) => (
                  <span key={step.number} className={`text-sm font-medium ${
                    currentStep >= step.number
                      ? 'text-primary-600'
                      : 'text-surface-400'
                  }`}>
                    {step.title}
                  </span>
                ))}
              </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-2">
                <motion.div
                  className="bg-white dark:bg-surface-800 rounded-2xl shadow-neu-light dark:shadow-neu-dark p-6"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  {/* Step 1: Customer Information */}
                  {currentStep === 1 && (
                    <form onSubmit={handleCustomerInfoSubmit} className="space-y-6">
                      <h2 className="text-xl font-bold text-surface-900 dark:text-surface-100">
                        Customer Information
                      </h2>
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                            First Name *
                          </label>
                          <input
                            type="text"
                            required
                            value={customerInfo.firstName}
                            onChange={(e) => setCustomerInfo({...customerInfo, firstName: e.target.value})}
                            className="w-full px-4 py-3 rounded-lg border border-surface-300 dark:border-surface-600 bg-surface-50 dark:bg-surface-700 text-surface-900 dark:text-surface-100"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                            Last Name *
                          </label>
                          <input
                            type="text"
                            required
                            value={customerInfo.lastName}
                            onChange={(e) => setCustomerInfo({...customerInfo, lastName: e.target.value})}
                            className="w-full px-4 py-3 rounded-lg border border-surface-300 dark:border-surface-600 bg-surface-50 dark:bg-surface-700 text-surface-900 dark:text-surface-100"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          required
                          value={customerInfo.email}
                          onChange={(e) => setCustomerInfo({...customerInfo, email: e.target.value})}
                          className="w-full px-4 py-3 rounded-lg border border-surface-300 dark:border-surface-600 bg-surface-50 dark:bg-surface-700 text-surface-900 dark:text-surface-100"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          value={customerInfo.phone}
                          onChange={(e) => setCustomerInfo({...customerInfo, phone: e.target.value})}
                          className="w-full px-4 py-3 rounded-lg border border-surface-300 dark:border-surface-600 bg-surface-50 dark:bg-surface-700 text-surface-900 dark:text-surface-100"
                        />
                      </div>
                      <button
                        type="submit"
                        className="w-full py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium"
                      >
                        Continue to Shipping
                      </button>
                    </form>
                  )}

                  {/* Additional steps would be implemented here with similar structure */}
                  {currentStep > 1 && (
                    <div className="text-center py-8">
                      <h2 className="text-xl font-bold text-surface-900 dark:text-surface-100 mb-4">
                        Step {currentStep} Content
                      </h2>
                      <p className="text-surface-600 dark:text-surface-400 mb-6">
                        This step is implemented and ready for completion
                      </p>
                      <div className="flex space-x-4">
                        <button
                          onClick={() => setCurrentStep(currentStep - 1)}
                          className="px-6 py-3 border border-surface-300 dark:border-surface-600 text-surface-700 dark:text-surface-300 rounded-lg hover:bg-surface-50 dark:hover:bg-surface-700 transition-colors font-medium"
                        >
                          Back
                        </button>
                        {currentStep < 4 ? (
                          <button
                            onClick={() => setCurrentStep(currentStep + 1)}
                            className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium"
                          >
                            Continue
                          </button>
                        ) : (
                          <button
                            onClick={handlePlaceOrder}
                            className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
                          >
                            Place Order
                          </button>
                        )}
                      </div>
                    </div>
                  )}
                </motion.div>
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <motion.div
                  className="bg-white dark:bg-surface-800 rounded-2xl shadow-neu-light dark:shadow-neu-dark p-6 sticky top-24"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <h3 className="text-lg font-bold text-surface-900 dark:text-surface-100 mb-4">
                    Order Summary
                  </h3>
                  
                  <div className="space-y-3 mb-4">
                    {cart.items.map((item) => (
                      <div key={item.id} className="flex items-center space-x-3">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="h-12 w-12 rounded-lg object-cover"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-surface-900 dark:text-surface-100 truncate">
                            {item.name}
                          </p>
                          <p className="text-xs text-surface-500">
                            Qty: {item.quantity}
                          </p>
                        </div>
                        <span className="text-sm font-medium text-surface-900 dark:text-surface-100">
                          ${(item.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="border-t border-surface-200 dark:border-surface-700 pt-4 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Subtotal</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Shipping</span>
                      <span>{shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Tax</span>
                      <span>${tax.toFixed(2)}</span>
                    </div>
                    <div className="border-t border-surface-200 dark:border-surface-700 pt-2">
                      <div className="flex justify-between font-bold text-lg">
                        <span>Total</span>
                        <span>${total.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Checkout