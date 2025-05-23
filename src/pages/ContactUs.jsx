import { useState } from 'react'
import { motion } from 'framer-motion'
import { toast } from 'react-hot-toast'
import Header from '../components/Header'
import Footer from '../components/Footer'
import ApperIcon from '../components/ApperIcon'

const ContactUs = () => {
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    department: 'general'
  })

  const contactMethods = [
    {
      title: 'Email Support',
      description: 'Get help via email',
      contact: 'support@shopsavvy.com',
      response: 'Response within 24 hours',
      icon: 'Mail',
      color: 'from-blue-500 to-blue-600'
    },
    {
      title: 'Phone Support',
      description: 'Speak with our team',
      contact: '1-800-SHOP-SAVVY',
      response: 'Mon-Fri 9AM-6PM EST',
      icon: 'Phone',
      color: 'from-green-500 to-green-600'
    },
    {
      title: 'Live Chat',
      description: 'Chat with us instantly',
      contact: 'Available on website',
      response: 'Response in minutes',
      icon: 'MessageCircle',
      color: 'from-purple-500 to-purple-600'
    }
  ]

  const departments = [
    { value: 'general', label: 'General Inquiry' },
    { value: 'sales', label: 'Sales Support' },
    { value: 'technical', label: 'Technical Support' },
    { value: 'billing', label: 'Billing & Payments' },
    { value: 'returns', label: 'Returns & Refunds' },
    { value: 'partnerships', label: 'Business Partnerships' }
  ]

  const faqs = [
    {
      question: 'How can I track my order?',
      answer: 'You can track your order using the tracking number sent to your email or by visiting our tracking page.'
    },
    {
      question: 'What is your return policy?',
      answer: 'We offer a 30-day return policy for most items. Visit our Returns page for detailed information.'
    },
    {
      question: 'Do you offer international shipping?',
      answer: 'Yes, we ship to most countries worldwide. Shipping costs and delivery times vary by location.'
    },
    {
      question: 'How can I change or cancel my order?',
      answer: 'Contact us immediately after placing your order. We can only modify orders that haven\'t been processed yet.'
    }
  ]

  const handleFormSubmit = (e) => {
    e.preventDefault()
    
    if (!contactForm.name || !contactForm.email || !contactForm.subject || !contactForm.message) {
      toast.error('Please fill in all required fields')
      return
    }

    toast.promise(
      new Promise((resolve) => setTimeout(resolve, 2000)),
      {
        loading: 'Sending your message...',
        success: 'Message sent successfully! We will get back to you soon.',
        error: 'Failed to send message. Please try again.'
      }
    )

    // Reset form
    setContactForm({
      name: '',
      email: '',
      subject: '',
      message: '',
      department: 'general'
    })
  }

  const handleInputChange = (e) => {
    setContactForm({
      ...contactForm,
      [e.target.name]: e.target.value
    })
  }

  const handleLiveChat = () => {
    toast.success('Live chat feature will be available soon!')
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
              Contact Us
            </h1>
            <p className="text-lg text-surface-600 dark:text-surface-400 max-w-3xl mx-auto">
              We're here to help! Reach out to us through any of the methods below or send us a message.
            </p>
          </motion.div>

          {/* Contact Methods */}
          <motion.div
            className="grid md:grid-cols-3 gap-6 mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {contactMethods.map((method, index) => (
              <div
                key={method.title}
                className="bg-white dark:bg-surface-800 rounded-2xl shadow-neu-light dark:shadow-neu-dark p-6 text-center hover:shadow-xl transition-shadow cursor-pointer"
                onClick={method.title === 'Live Chat' ? handleLiveChat : undefined}
              >
                <div className={`flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-r ${method.color} shadow-lg mx-auto mb-4`}>
                  <ApperIcon name={method.icon} className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-surface-900 dark:text-surface-100 mb-2">
                  {method.title}
                </h3>
                <p className="text-surface-600 dark:text-surface-400 mb-3">
                  {method.description}
                </p>
                <p className="font-semibold text-primary-600 mb-1">
                  {method.contact}
                </p>
                <p className="text-sm text-surface-500">
                  {method.response}
                </p>
              </div>
            ))}
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Contact Form */}
            <motion.div
              className="lg:col-span-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div className="bg-white dark:bg-surface-800 rounded-2xl shadow-neu-light dark:shadow-neu-dark p-8">
                <h2 className="text-2xl font-bold text-surface-900 dark:text-surface-100 mb-6">
                  Send us a Message
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
                        value={contactForm.name}
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
                        value={contactForm.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 rounded-lg border border-surface-300 dark:border-surface-600 bg-surface-50 dark:bg-surface-700 text-surface-900 dark:text-surface-100 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                      Department
                    </label>
                    <select
                      name="department"
                      value={contactForm.department}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-lg border border-surface-300 dark:border-surface-600 bg-surface-50 dark:bg-surface-700 text-surface-900 dark:text-surface-100 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    >
                      {departments.map(dept => (
                        <option key={dept.value} value={dept.value}>{dept.label}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                      Subject *
                    </label>
                    <input
                      type="text"
                      name="subject"
                      value={contactForm.subject}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-surface-300 dark:border-surface-600 bg-surface-50 dark:bg-surface-700 text-surface-900 dark:text-surface-100 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                      Message *
                    </label>
                    <textarea
                      name="message"
                      value={contactForm.message}
                      onChange={handleInputChange}
                      rows={6}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-surface-300 dark:border-surface-600 bg-surface-50 dark:bg-surface-700 text-surface-900 dark:text-surface-100 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-primary-600 to-secondary-600 text-white py-3 px-6 rounded-lg font-semibold hover:shadow-lg transform hover:-translate-y-0.5 transition-all"
                  >
                    Send Message
                  </button>
                </form>
              </div>
            </motion.div>

            {/* FAQ Sidebar */}
            <motion.div
              className="lg:col-span-1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div className="bg-white dark:bg-surface-800 rounded-2xl shadow-neu-light dark:shadow-neu-dark p-6 sticky top-24">
                <h3 className="text-xl font-semibold text-surface-900 dark:text-surface-100 mb-6">
                  Quick Answers
                </h3>
                <div className="space-y-4">
                  {faqs.map((faq, index) => (
                    <div key={index} className="border-b border-surface-200 dark:border-surface-600 pb-4 last:border-b-0 last:pb-0">
                      <h4 className="font-medium text-surface-900 dark:text-surface-100 mb-2 text-sm">
                        {faq.question}
                      </h4>
                      <p className="text-xs text-surface-600 dark:text-surface-400">
                        {faq.answer}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default ContactUs