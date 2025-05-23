import { motion, AnimatePresence } from 'framer-motion'
import { useCart } from '../contexts/CartContext'
import ApperIcon from './ApperIcon'

const CartSidebar = ({ isOpen, onClose }) => {
  const { cart, removeFromCart, updateQuantity, clearCart, getTotalPrice } = useCart()

  const handleCheckout = () => {
    if (cart.items.length === 0) {
      return
    }
    
    clearCart()
    onClose()
  }

  const handleRemoveItem = (item) => {
    if (window.confirm(`Remove ${item.name} from cart?`)) {
      removeFromCart(item.id)
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          
          {/* Sidebar */}
          <motion.div
            className="fixed right-0 top-0 z-50 h-full w-full max-w-md bg-white dark:bg-surface-800 shadow-2xl"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          >
            <div className="flex h-full flex-col">
              {/* Header */}
              <div className="flex items-center justify-between border-b border-surface-200 dark:border-surface-700 p-6">
                <h2 className="text-xl font-bold text-surface-900 dark:text-surface-100">
                  Shopping Cart ({cart.items.length})
                </h2>
                <button
                  onClick={onClose}
                  className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-surface-100 dark:hover:bg-surface-700 transition-colors"
                >
                  <ApperIcon name="X" className="h-5 w-5 text-surface-600 dark:text-surface-400" />
                </button>
              </div>

              {/* Cart Items */}
              <div className="flex-1 overflow-y-auto p-6">
                {cart.items.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-center">
                    <div className="flex h-16 w-16 items-center justify-center mx-auto mb-4 rounded-full bg-surface-100 dark:bg-surface-700">
                      <ApperIcon name="ShoppingCart" className="h-8 w-8 text-surface-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-surface-900 dark:text-surface-100 mb-2">
                      Your cart is empty
                    </h3>
                    <p className="text-surface-600 dark:text-surface-400 mb-4">
                      Add some products to get started
                    </p>
                    <button
                      onClick={onClose}
                      className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium"
                    >
                      Continue Shopping
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {cart.items.map((item) => (
                      <motion.div
                        key={item.id}
                        className="flex items-center space-x-4 bg-surface-50 dark:bg-surface-700 rounded-xl p-4"
                        layout
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                          className="h-16 w-16 rounded-lg object-cover"
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-surface-900 dark:text-surface-100 truncate">
                            {item.name}
                          </h4>
                          <p className="text-sm text-surface-500">{item.brand}</p>
                          <p className="text-lg font-bold text-surface-900 dark:text-surface-100">
                            ${item.price}
                          </p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-surface-200 dark:hover:bg-surface-600 transition-colors"
                          >
                            <ApperIcon name="Minus" className="h-4 w-4 text-surface-600 dark:text-surface-400" />
                          </button>
                          <span className="min-w-[2rem] text-center font-medium text-surface-900 dark:text-surface-100">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-surface-200 dark:hover:bg-surface-600 transition-colors"
                          >
                            <ApperIcon name="Plus" className="h-4 w-4 text-surface-600 dark:text-surface-400" />
                          </button>
                          <button
                            onClick={() => handleRemoveItem(item)}
                            className="ml-2 flex h-8 w-8 items-center justify-center rounded-full hover:bg-red-100 dark:hover:bg-red-900/20 transition-colors"
                          >
                            <ApperIcon name="Trash2" className="h-4 w-4 text-red-500" />
                          </button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>

              {/* Footer */}
              {cart.items.length > 0 && (
                <div className="border-t border-surface-200 dark:border-surface-700 p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-semibold text-surface-900 dark:text-surface-100">
                      Total: ${getTotalPrice().toFixed(2)}
                    </span>
                    <button
                      onClick={() => {
                        if (window.confirm('Clear all items from cart?')) {
                          clearCart()
                        }
                      }}
                      className="text-sm text-red-500 hover:text-red-700 transition-colors font-medium"
                    >
                      Clear Cart
                    </button>
                  </div>
                  <button
                    onClick={handleCheckout}
                    className="w-full py-3 bg-gradient-to-r from-primary-600 to-secondary-600 text-white rounded-lg hover:shadow-lg transition-all font-semibold"
                  >
                    Proceed to Checkout
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default CartSidebar