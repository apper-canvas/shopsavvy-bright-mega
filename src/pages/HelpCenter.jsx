import { useState } from 'react'
import { motion } from 'framer-motion'
import { toast } from 'react-hot-toast'
import Header from '../components/Header'
import Footer from '../components/Footer'
import ApperIcon from '../components/ApperIcon'

const HelpCenter = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [expandedFaq, setExpandedFaq] = useState(null)
  const [supportForm, setSupportForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    priority: 'medium'
  })

  const categories = [
    { id: 'all', name: 'All Topics', icon: 'HelpCircle' },
    { id: 'orders', name: 'Orders & Shipping', icon: 'Package' },
    { id: 'payments', name: 'Payments & Billing', icon: 'CreditCard' },
    { id: 'returns', name: 'Returns & Refunds', icon: 'RotateCcw' },
    { id: 'account', name: 'Account & Profile', icon: 'User' },
    { id: 'technical', name: 'Technical Support', icon: 'Settings' }
  ]

  const faqs = [
    {
      id: 1,
      category: 'orders',
      question: 'How can I track my order?',
      answer: 'You can track your order by visiting the tracking page and entering your order number. You will also receive email updates with tracking information.'
    },
    {
      id: 2,
      category: 'orders',
      question: 'What shipping options are available?',
      answer: 'We offer standard shipping (5-7 business days), express shipping (2-3 business days), and overnight shipping for most locations.'
    },
    {
      id: 3,
      category: 'payments',
      question: 'What payment methods do you accept?',
      answer: 'We accept all major credit cards (Visa, MasterCard, American Express), PayPal, Apple Pay, and Google Pay for secure transactions.'
    },
    {
      id: 4,
      category: 'returns',
      question: 'What is your return policy?',
      answer: 'We offer a 30-day return policy for most items. Items must be in original condition with tags attached. Some restrictions apply for certain product categories.'
    },
    {
      id: 5,
      category: 'account',
      question: 'How do I reset my password?',
      answer: 'Click on "Forgot Password" on the login page and enter your email address. We will send you a secure link to reset your password.'
    },
    {
      id: 6,
      category: 'technical',
      question: 'The website is loading slowly. What should I do?',
      answer: 'Try clearing your browser cache, disabling browser extensions, or using a different browser. If the issue persists, contact our technical support team.'
    }
  ]

  const filteredFaqs = faqs.filter(faq => {
    const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory
    const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const handleFormSubmit = (e) => {
    e.preventDefault()
    
    if (!supportForm.name || !supportForm.email || !supportForm.subject || !supportForm.message) {
      toast.error('Please fill in all required fields')
      return
    }

    // Simulate API call
    toast.promise(
      new Promise((resolve) => setTimeout(resolve, 2000)),
      {
        loading: 'Submitting your support request...',
        success: 'Support ticket created successfully! We will respond within 24 hours.',
        error: 'Failed to submit support request. Please try again.'
      }
    )

    // Reset form
    setSupportForm({
      name: '',
      email: '',
      subject: '',
      message: '',
      priority: 'medium'
    })
  }

  const handleInputChange = (e) => {
    setSupportForm({
      ...supportForm,
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
              Help Center
            </h1>
            <p className="text-lg text-surface-600 dark:text-surface-400 max-w-3xl mx-auto">
              Find answers to frequently asked questions or contact our support team for assistance.
            </p>
          </motion.div>

          {/* Search */}
          <motion.div
            className="max-w-2xl mx-auto mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="relative">
              <ApperIcon name="Search" className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-surface-400" />
              <input
                type="text"
                placeholder="Search help articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-xl border border-surface-300 dark:border-surface-600 bg-white dark:bg-surface-800 text-surface-900 dark:text-surface-100 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all text-lg"
              />
            </div>
          </motion.div>

          <div className="grid lg:grid-cols-4 gap-8">
            {/* Categories Sidebar */}
            <motion.div
              className="lg:col-span-1"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div className="bg-white dark:bg-surface-800 rounded-2xl shadow-neu-light dark:shadow-neu-dark p-6 sticky top-24">
                <h3 className="text-lg font-semibold text-surface-900 dark:text-surface-100 mb-4">
                  Categories
                </h3>
                <div className="space-y-2">
                  {categories.map(category => (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-all ${
                        selectedCategory === category.id
                          ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-600 border border-primary-200 dark:border-primary-800'
                          : 'hover:bg-surface-50 dark:hover:bg-surface-700 text-surface-700 dark:text-surface-300'
                      }`}
                    >
                      <ApperIcon name={category.icon} className="h-4 w-4" />
                      <span className="text-sm font-medium">{category.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Main Content */}
            <div className="lg:col-span-3 space-y-8">
              {/* FAQs */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <h2 className="text-2xl font-bold text-surface-900 dark:text-surface-100 mb-6">
                  Frequently Asked Questions
                </h2>
                <div className="space-y-4">
                  {filteredFaqs.map(faq => (
                    <div
                      key={faq.id}
                      className="bg-white dark:bg-surface-800 rounded-xl shadow-neu-light dark:shadow-neu-dark overflow-hidden"
                    >
                      <button
                        onClick={() => setExpandedFaq(expandedFaq === faq.id ? null : faq.id)}
                        className="w-full p-6 text-left flex items-center justify-between hover:bg-surface-50 dark:hover:bg-surface-700 transition-colors"
                      >
                        <span className="font-semibold text-surface-900 dark:text-surface-100">
                          {faq.question}
                        </span>
                        <ApperIcon 
                          name={expandedFaq === faq.id ? "ChevronUp" : "ChevronDown"} 
                          className="h-5 w-5 text-surface-500" 
                        />
                      </button>
                      {expandedFaq === faq.id && (
                        <div className="px-6 pb-6">
                          <p className="text-surface-600 dark:text-surface-400 leading-relaxed">
                            {faq.answer}
                          </p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Contact Support Form */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="bg-white dark:bg-surface-800 rounded-2xl shadow-neu-light dark:shadow-neu-dark p-8"
              >
                <h2 className="text-2xl font-bold text-surface-900 dark:text-surface-100 mb-6">
                  Still Need Help?
                </h2>
                <form onSubmit={handleFormSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                        Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={supportForm.name}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 rounded-lg border border-surface-300 dark:border-surface-600 bg-surface-50 dark:bg-surface-700 text-surface-900 dark:text-surface-100 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={supportForm.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 rounded-lg border border-surface-300 dark:border-surface-600 bg-surface-50 dark:bg-surface-700 text-surface-900 dark:text-surface-100 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-primary-600 to-secondary-600 text-white py-3 px-6 rounded-lg font-semibold hover:shadow-lg transform hover:-translate-y-0.5 transition-all"
                  >
                    Submit Support Request
                  </button>
                </form>
              </motion.div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default HelpCenter