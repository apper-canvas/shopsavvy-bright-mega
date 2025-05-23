import { useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../contexts/CartContext'
import Header from '../components/Header'
import { useTracking } from '../contexts/TrackingContext'
import ApperIcon from '../components/ApperIcon'
import { loadStripe } from '@stripe/stripe-js'

const Checkout = () => {
  const navigate = useNavigate()
  const { cart, getTotalPrice, clearCart } = useCart()
  const [currentStep, setCurrentStep] = useState(1)
  const { createOrderTracking } = useTracking()
  const [orderPlaced, setOrderPlaced] = useState(false)
  const [orderNumber, setOrderNumber] = useState('')
  const [isProcessingPayment, setIsProcessingPayment] = useState(false)
  const [paymentError, setPaymentError] = useState('')
  
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
  const [shippingMethod, setShippingMethod] = useState('standard')
  const [cardInfo, setCardInfo] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    nameOnCard: ''
  })
  
  const [billingAddress, setBillingAddress] = useState({
    sameAsShipping: true,
    address: '',
    city: '',
    state: '',
    zipCode: ''
  })

  const subtotal = getTotalPrice()
  const getShippingCost = () => {
    if (shippingMethod === 'standard') {
      return subtotal > 50 ? 0 : 9.99
    } else if (shippingMethod === 'express') {
      return 12.99
    } else if (shippingMethod === 'overnight') {
      return 24.99
    }
    return 0
  }
  const shipping = getShippingCost()
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
    if (shippingAddress.address && shippingAddress.city && shippingAddress.state && shippingAddress.zipCode && shippingMethod) {
      setCurrentStep(3)
    }
  }

  const handlePaymentSubmit = (e) => {
    e.preventDefault()
    setPaymentError('')
    
    if (paymentMethod === 'card') {
      if (!cardInfo.cardNumber || !cardInfo.expiryDate || !cardInfo.cvv || !cardInfo.nameOnCard) {
        setPaymentError('Please fill in all card details')
        return
      }
      
      // Basic card validation
      if (cardInfo.cardNumber.replace(/\s/g, '').length < 13) {
        setPaymentError('Please enter a valid card number')
        return
      }
      
      if (!cardInfo.expiryDate.match(/^(0[1-9]|1[0-2])\/\d{2}$/)) {
        setPaymentError('Please enter expiry date in MM/YY format')
        return
      }
      
      if (cardInfo.cvv.length < 3) {
        setPaymentError('Please enter a valid CVV')
        return
      }
    }
    
    setCurrentStep(4)
  }

  const processPayment = async () => {
    setIsProcessingPayment(true)
    setPaymentError('')
    
    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // In a real app, you would integrate with Stripe or another payment processor
      // const stripe = await loadStripe('your-publishable-key')
      // const result = await stripe.confirmCardPayment(clientSecret, {...})
      
      // Simulate random payment success/failure for demo
      const success = Math.random() > 0.1 // 90% success rate
      
      if (!success) {
        throw new Error('Payment was declined. Please try again with a different payment method.')
      }
      
      const orderNum = 'ORD-' + Date.now().toString().slice(-6)
      setOrderNumber(orderNum)
      
      // Create tracking for the order
      createOrderTracking({
        orderNumber: orderNum,
        items: cart.items,
        shippingMethod,
        shippingAddress,
        customerInfo
      })
      
      setOrderPlaced(true);
      clearCart()
      
    } catch (error) {
      setPaymentError(error.message || 'Payment processing failed. Please try again.')
    } finally {
      setIsProcessingPayment(false)
    }
  }

  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '')
    const matches = v.match(/\d{4,16}/g)
    const match = matches && matches[0] || ''
    const parts = []
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4))
    }
    if (parts.length) {
      return parts.join(' ')
    } else {
      return v
    }
  }

  const formatExpiryDate = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '')
    if (v.length >= 2) {
      return v.substring(0, 2) + '/' + v.substring(2, 4)
    }
    return v
  }

  const handleCardNumberChange = (e) => {
    const formatted = formatCardNumber(e.target.value)
    if (formatted.length <= 19) {
      setCardInfo({...cardInfo, cardNumber: formatted})
    }
  }

  const handleExpiryChange = (e) => {
    const formatted = formatExpiryDate(e.target.value)
    if (formatted.length <= 5) {
      setCardInfo({...cardInfo, expiryDate: formatted})
    }
  }

  const handleCvvChange = (e) => {
    const value = e.target.value.replace(/[^0-9]/gi, '')
    if (value.length <= 4) {
      setCardInfo({...cardInfo, cvv: value})
    }
  }

  const handleBillingAddressToggle = (e) => {
    const sameAsShipping = e.target.checked
    setBillingAddress({
      ...billingAddress,
      sameAsShipping,
      ...(sameAsShipping ? {
        address: shippingAddress.address,
        city: shippingAddress.city,
        state: shippingAddress.state,
        zipCode: shippingAddress.zipCode
      } : {})
    })
  }

  const handleOldPaymentSubmit = (e) => {
    e.preventDefault()
    if (paymentMethod === 'card') {
      if (cardInfo.cardNumber && cardInfo.expiryDate && cardInfo.cvv && cardInfo.nameOnCard) {
        setCurrentStep(4)
      }
    } else {
      setCurrentStep(4)
    }
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
                    onClick={() => navigate('/tracking')}
                    className="w-full px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium"
                  >
                    Track Your Order
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

                  {/* Step 2: Shipping */}
                  {currentStep === 2 && (
                    <form onSubmit={handleShippingSubmit} className="space-y-6">
                      <h2 className="text-xl font-bold text-surface-900 dark:text-surface-100">
                        Shipping Information
                      </h2>
                      
                      {/* Shipping Address */}
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-surface-900 dark:text-surface-100">
                          Shipping Address
                        </h3>
                        
                        <div>
                          <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                            Street Address *
                          </label>
                          <input
                            type="text"
                            required
                            value={shippingAddress.address}
                            onChange={(e) => setShippingAddress({...shippingAddress, address: e.target.value})}
                            className="w-full px-4 py-3 rounded-lg border border-surface-300 dark:border-surface-600 bg-surface-50 dark:bg-surface-700 text-surface-900 dark:text-surface-100"
                            placeholder="123 Main Street"
                          />
                        </div>
                        
                        <div className="grid sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                              City *
                            </label>
                            <input
                              type="text"
                              required
                              value={shippingAddress.city}
                              onChange={(e) => setShippingAddress({...shippingAddress, city: e.target.value})}
                              className="w-full px-4 py-3 rounded-lg border border-surface-300 dark:border-surface-600 bg-surface-50 dark:bg-surface-700 text-surface-900 dark:text-surface-100"
                              placeholder="New York"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                              State *
                            </label>
                            <select
                              required
                              value={shippingAddress.state}
                              onChange={(e) => setShippingAddress({...shippingAddress, state: e.target.value})}
                              className="w-full px-4 py-3 rounded-lg border border-surface-300 dark:border-surface-600 bg-surface-50 dark:bg-surface-700 text-surface-900 dark:text-surface-100"
                            >
                              <option value="">Select State</option>
                              <option value="AL">Alabama</option>
                              <option value="CA">California</option>
                              <option value="FL">Florida</option>
                              <option value="NY">New York</option>
                              <option value="TX">Texas</option>
                            </select>
                          </div>
                        </div>
                        
                        <div className="grid sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                              ZIP Code *
                            </label>
                            <input
                              type="text"
                              required
                              value={shippingAddress.zipCode}
                              onChange={(e) => setShippingAddress({...shippingAddress, zipCode: e.target.value})}
                              className="w-full px-4 py-3 rounded-lg border border-surface-300 dark:border-surface-600 bg-surface-50 dark:bg-surface-700 text-surface-900 dark:text-surface-100"
                              placeholder="10001"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                              Country *
                            </label>
                            <select
                              required
                              value={shippingAddress.country}
                              onChange={(e) => setShippingAddress({...shippingAddress, country: e.target.value})}
                              className="w-full px-4 py-3 rounded-lg border border-surface-300 dark:border-surface-600 bg-surface-50 dark:bg-surface-700 text-surface-900 dark:text-surface-100"
                            >
                              <option value="United States">United States</option>
                              <option value="Canada">Canada</option>
                            </select>
                          </div>
                        </div>
                      </div>
                      
                      {/* Shipping Method */}
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-surface-900 dark:text-surface-100">
                          Shipping Method
                        </h3>
                        
                        <div className="space-y-3">
                          {[
                            { id: 'standard', name: 'Standard Shipping', time: '5-7 business days', cost: subtotal > 50 ? 0 : 9.99 },
                            { id: 'express', name: 'Express Shipping', time: '2-3 business days', cost: 12.99 },
                            { id: 'overnight', name: 'Overnight Shipping', time: 'Next business day', cost: 24.99 }
                          ].map((method) => (
                            <div key={method.id} className={`p-4 rounded-lg border-2 transition-all cursor-pointer ${
                              shippingMethod === method.id 
                                ? 'border-primary-600 bg-primary-50 dark:bg-primary-900/20'
                                : 'border-surface-300 dark:border-surface-600 hover:border-primary-300'
                            }`} onClick={() => setShippingMethod(method.id)}>
                              <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-3">
                                  <input
                                    type="radio"
                                    name="shippingMethod"
                                    value={method.id}
                                    checked={shippingMethod === method.id}
                                    onChange={(e) => setShippingMethod(e.target.value)}
                                    className="text-primary-600"
                                  />
                                  <div>
                                    <p className="font-medium text-surface-900 dark:text-surface-100">{method.name}</p>
                                    <p className="text-sm text-surface-600 dark:text-surface-400">{method.time}</p>
                                  </div>
                                </div>
                                <span className="font-semibold text-surface-900 dark:text-surface-100">
                                  {method.cost === 0 ? 'FREE' : `$${method.cost.toFixed(2)}`}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div className="flex space-x-4">
                        <button
                          type="button"
                          onClick={() => setCurrentStep(1)}
                          className="flex-1 py-3 border border-surface-300 dark:border-surface-600 text-surface-700 dark:text-surface-300 rounded-lg hover:bg-surface-50 dark:hover:bg-surface-700 transition-colors font-medium"
                        >
                          Back
                        </button>
                        <button
                          type="submit"
                          className="flex-1 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium"
                        >
                          Continue to Payment
                        </button>
                      </div>
                    </form>
                  )}

                  {/* Step 3: Payment */}
                  {currentStep === 3 && (
                    <form onSubmit={handlePaymentSubmit} className="space-y-6">
                      <h2 className="text-xl font-bold text-surface-900 dark:text-surface-100 mb-4">
                        Payment Information
                      </h2>
                      
                      {paymentError && (
                        <div className="p-4 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800">
                          <div className="flex items-center space-x-2">
                            <ApperIcon name="AlertCircle" className="h-5 w-5 text-red-600" />
                            <p className="text-red-600 dark:text-red-400 font-medium">{paymentError}</p>
                          </div>
                        </div>
                      )}
                      
                      {/* Payment Method Selection */}
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-surface-900 dark:text-surface-100">
                          Payment Method
                        </h3>
                        
                        <div className="grid gap-3">
                          {[
                            { id: 'card', name: 'Credit/Debit Card', icon: 'CreditCard', description: 'Pay with Visa, Mastercard, or American Express' },
                            { id: 'paypal', name: 'PayPal', icon: 'Wallet', description: 'Pay securely with your PayPal account' },
                            { id: 'apple', name: 'Apple Pay', icon: 'Smartphone', description: 'Pay with Touch ID or Face ID' }
                          ].map((method) => (
                            <div 
                              key={method.id} 
                              className={`payment-method-card ${
                                paymentMethod === method.id ? 'payment-method-active' : 'payment-method-inactive'
                              }`}
                              onClick={() => setPaymentMethod(method.id)}
                            >
                              <div className="flex items-center space-x-3">
                                <input
                                  type="radio"
                                  name="paymentMethod"
                                  value={method.id}
                                  checked={paymentMethod === method.id}
                                  onChange={(e) => setPaymentMethod(e.target.value)}
                                  className="text-primary-600"
                                />
                                <ApperIcon name={method.icon} className="h-6 w-6 text-surface-600 dark:text-surface-400" />
                                <div>
                                  <p className="font-medium text-surface-900 dark:text-surface-100">{method.name}</p>
                                  <p className="text-sm text-surface-600 dark:text-surface-400">{method.description}</p>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      {/* Card Details */}
                      {paymentMethod === 'card' && (
                        <div className="space-y-4">
                          <h3 className="text-lg font-semibold text-surface-900 dark:text-surface-100">
                            Card Details
                          </h3>
                          
                          <div>
                            <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                              Card Number *
                            </label>
                            <input
                              type="text"
                              required
                              value={cardInfo.cardNumber}
                              onChange={handleCardNumberChange}
                              className="w-full px-4 py-3 rounded-lg border border-surface-300 dark:border-surface-600 bg-surface-50 dark:bg-surface-700 text-surface-900 dark:text-surface-100 font-mono"
                              placeholder="1234 5678 9012 3456"
                            />
                          </div>
                          
                          <div className="grid sm:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                                Expiry Date *
                              </label>
                              <input
                                type="text"
                                required
                                value={cardInfo.expiryDate}
                                onChange={handleExpiryChange}
                                className="w-full px-4 py-3 rounded-lg border border-surface-300 dark:border-surface-600 bg-surface-50 dark:bg-surface-700 text-surface-900 dark:text-surface-100 font-mono"
                                placeholder="MM/YY"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                                CVV *
                              </label>
                              <input
                                type="text"
                                required
                                value={cardInfo.cvv}
                                onChange={handleCvvChange}
                                className="w-full px-4 py-3 rounded-lg border border-surface-300 dark:border-surface-600 bg-surface-50 dark:bg-surface-700 text-surface-900 dark:text-surface-100 font-mono"
                                placeholder="123"
                              />
                            </div>
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                              Name on Card *
                            </label>
                            <input
                              type="text"
                              required
                              value={cardInfo.nameOnCard}
                              onChange={(e) => setCardInfo({...cardInfo, nameOnCard: e.target.value})}
                              className="w-full px-4 py-3 rounded-lg border border-surface-300 dark:border-surface-600 bg-surface-50 dark:bg-surface-700 text-surface-900 dark:text-surface-100"
                              placeholder="John Doe"
                            />
                          </div>
                        </div>
                      )}
                      
                      {/* Billing Address */}
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-surface-900 dark:text-surface-100">
                          Billing Address
                        </h3>
                        
                        <div className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            id="sameAsShipping"
                            checked={billingAddress.sameAsShipping}
                            onChange={handleBillingAddressToggle}
                            className="text-primary-600"
                          />
                          <label htmlFor="sameAsShipping" className="text-sm font-medium text-surface-700 dark:text-surface-300">
                            Same as shipping address
                          </label>
                        </div>
                        
                        {!billingAddress.sameAsShipping && (
                          <div className="space-y-4">
                            <div>
                              <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                                Street Address *
                              </label>
                              <input
                                type="text"
                                required
                                value={billingAddress.address}
                                onChange={(e) => setBillingAddress({...billingAddress, address: e.target.value})}
                                className="w-full px-4 py-3 rounded-lg border border-surface-300 dark:border-surface-600 bg-surface-50 dark:bg-surface-700 text-surface-900 dark:text-surface-100"
                              />
                            </div>
                            
                            <div className="grid sm:grid-cols-2 gap-4">
                              <div>
                                <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                                  City *
                                </label>
                                <input
                                  type="text"
                                  required
                                  value={billingAddress.city}
                                  onChange={(e) => setBillingAddress({...billingAddress, city: e.target.value})}
                                  className="w-full px-4 py-3 rounded-lg border border-surface-300 dark:border-surface-600 bg-surface-50 dark:bg-surface-700 text-surface-900 dark:text-surface-100"
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                                  State *
                                </label>
                                <select
                                  required
                                  value={billingAddress.state}
                                  onChange={(e) => setBillingAddress({...billingAddress, state: e.target.value})}
                                  className="w-full px-4 py-3 rounded-lg border border-surface-300 dark:border-surface-600 bg-surface-50 dark:bg-surface-700 text-surface-900 dark:text-surface-100"
                                >
                                  <option value="">Select State</option>
                                  <option value="AL">Alabama</option>
                                  <option value="CA">California</option>
                                  <option value="FL">Florida</option>
                                  <option value="NY">New York</option>
                                  <option value="TX">Texas</option>
                                </select>
                              </div>
                            </div>
                            
                            <div>
                              <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                                ZIP Code *
                              </label>
                              <input
                                type="text"
                                required
                                value={billingAddress.zipCode}
                                onChange={(e) => setBillingAddress({...billingAddress, zipCode: e.target.value})}
                                className="w-full px-4 py-3 rounded-lg border border-surface-300 dark:border-surface-600 bg-surface-50 dark:bg-surface-700 text-surface-900 dark:text-surface-100"
                              />
                            </div>
                          </div>
                        )}
                      </div>
                      
                      <div className="flex space-x-4">
                        <button
                          type="button"
                          onClick={() => setCurrentStep(2)}
                          className="flex-1 py-3 border border-surface-300 dark:border-surface-600 text-surface-700 dark:text-surface-300 rounded-lg hover:bg-surface-50 dark:hover:bg-surface-700 transition-colors font-medium"
                        >
                          Back
                        </button>
                        <button
                          type="submit"
                          className="flex-1 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium"
                        >
                          Review Order
                        </button>
                      </div>
                    </form>
                  )}
                  
                  {/* Step 4: Review */}
                  {currentStep === 4 && (
                    <div className="space-y-6">
                      <h2 className="text-xl font-bold text-surface-900 dark:text-surface-100">
                        Review Your Order
                      </h2>
                      
                      {paymentError && (
                        <div className="p-4 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800">
                          <div className="flex items-center space-x-2">
                            <ApperIcon name="AlertCircle" className="h-5 w-5 text-red-600" />
                            <p className="text-red-600 dark:text-red-400 font-medium">{paymentError}</p>
                          </div>
                        </div>
                      )}
                      
                      {/* Order Summary */}
                      <div className="bg-surface-50 dark:bg-surface-700 rounded-lg p-4">
                        <h3 className="font-semibold text-surface-900 dark:text-surface-100 mb-3">Order Details</h3>
                        <div className="space-y-2">
                          {cart.items.map((item) => (
                            <div key={item.id} className="flex justify-between text-sm">
                              <span>{item.name} × {item.quantity}</span>
                              <span>${(item.price * item.quantity).toFixed(2)}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      {/* Customer Info */}
                      <div className="bg-surface-50 dark:bg-surface-700 rounded-lg p-4">
                        <h3 className="font-semibold text-surface-900 dark:text-surface-100 mb-2">Customer Information</h3>
                        <p className="text-sm text-surface-600 dark:text-surface-400">
                          {customerInfo.firstName} {customerInfo.lastName}<br />
                          {customerInfo.email}
                        </p>
                      </div>
                      
                      {/* Shipping Info */}
                      <div className="bg-surface-50 dark:bg-surface-700 rounded-lg p-4">
                        <h3 className="font-semibold text-surface-900 dark:text-surface-100 mb-2">Shipping Address</h3>
                        <p className="text-sm text-surface-600 dark:text-surface-400">
                          {shippingAddress.address}<br />
                          {shippingAddress.city}, {shippingAddress.state} {shippingAddress.zipCode}
                        </p>
                      </div>
                      
                      {/* Payment Info */}
                      <div className="bg-surface-50 dark:bg-surface-700 rounded-lg p-4">
                        <h3 className="font-semibold text-surface-900 dark:text-surface-100 mb-2">Payment Method</h3>
                        <p className="text-sm text-surface-600 dark:text-surface-400">
                          {paymentMethod === 'card' && `Credit Card ending in ${cardInfo.cardNumber.slice(-4)}`}
                          {paymentMethod === 'paypal' && 'PayPal'}
                          {paymentMethod === 'apple' && 'Apple Pay'}
                        </p>
                      </div>
                      
                      <div className="flex space-x-4">
                        <button
                          type="button"
                          onClick={() => setCurrentStep(3)}
                          className="px-6 py-3 border border-surface-300 dark:border-surface-600 text-surface-700 dark:text-surface-300 rounded-lg hover:bg-surface-50 dark:hover:bg-surface-700 transition-colors font-medium"
                        >
                          Back
                        </button>
                        <button
                          onClick={processPayment}
                          disabled={isProcessingPayment}
                          className="flex-1 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium flex items-center justify-center space-x-2"
                        >
                          {isProcessingPayment ? (
                            <>
                              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                              <span>Processing Payment...</span>
                            </>
                          ) : (
                            <>
                              <ApperIcon name="CreditCard" className="h-4 w-4" />
                              <span>Place Order - ${total.toFixed(2)}</span>
                            </>
                          )}
                        </button>
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