import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { toast } from 'react-hot-toast'
import { useCart } from '../contexts/CartContext'
import { useProducts } from '../contexts/ProductsContext'
import Header from '../components/Header'
import ApperIcon from '../components/ApperIcon'

const ProductDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { addToCart } = useCart()
  const { getProductById, favorites, toggleFavorite } = useProducts()
  
  const [product, setProduct] = useState(null)
  const [selectedImage, setSelectedImage] = useState(0)
  const [selectedSize, setSelectedSize] = useState('')
  const [selectedColor, setSelectedColor] = useState('')
  const [quantity, setQuantity] = useState(1)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const foundProduct = getProductById(id)
    if (foundProduct) {
      setProduct(foundProduct)
      setSelectedSize(foundProduct.sizes[0])
      setSelectedColor(foundProduct.colors[0])
    }
    setLoading(false)
  }, [id, getProductById])

  const handleAddToCart = () => {
    if (!product.inStock) {
      toast.error('This product is currently out of stock')
      return
    }

    const productToAdd = {
      ...product,
      selectedSize,
      selectedColor,
      quantity
    }

    addToCart(productToAdd, quantity)
    toast.success(`Added ${quantity} ${product.name} to cart`)
  }

  const handleFavoriteToggle = () => {
    toggleFavorite(product.id)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-100 via-primary-50 to-white dark:from-surface-900 dark:via-surface-800 dark:to-surface-900">
        <Header />
        <div className="pt-24 flex items-center justify-center min-h-[60vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-100 via-primary-50 to-white dark:from-surface-900 dark:via-surface-800 dark:to-surface-900">
        <Header />
        <div className="pt-24 flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-surface-900 dark:text-surface-100 mb-4">
              Product Not Found
            </h1>
            <p className="text-surface-600 dark:text-surface-400 mb-6">
              The product you're looking for doesn't exist.
            </p>
            <button
              onClick={() => navigate('/products')}
              className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium"
            >
              Browse Products
            </button>
          </div>
        </div>
      </div>
    )
  }

  const mockImages = Array.from({ length: 4 }, (_, i) => product.image)

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-100 via-primary-50 to-white dark:from-surface-900 dark:via-surface-800 dark:to-surface-900">
      <Header />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <motion.div
            className="mb-8 flex items-center space-x-2 text-sm"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <button 
              onClick={() => navigate('/')}
              className="text-surface-500 hover:text-primary-600 transition-colors"
            >
              Home
            </button>
            <ApperIcon name="ChevronRight" className="h-4 w-4 text-surface-400" />
            <button 
              onClick={() => navigate('/products')}
              className="text-surface-500 hover:text-primary-600 transition-colors"
            >
              Products
            </button>
            <ApperIcon name="ChevronRight" className="h-4 w-4 text-surface-400" />
            <span className="text-surface-900 dark:text-surface-100 font-medium">
              {product.name}
            </span>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Product Images */}
            <motion.div
              className="space-y-4"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="aspect-square overflow-hidden rounded-2xl bg-white dark:bg-surface-800 shadow-neu-light dark:shadow-neu-dark">
                <img
                  src={mockImages[selectedImage]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="grid grid-cols-4 gap-2">
                {mockImages.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`aspect-square overflow-hidden rounded-lg border-2 transition-all ${
                      selectedImage === index
                        ? 'border-primary-500 ring-2 ring-primary-200'
                        : 'border-surface-300 dark:border-surface-600 hover:border-primary-300'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Product Information */}
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div>
                <h1 className="text-3xl font-bold text-surface-900 dark:text-surface-100 mb-2">
                  {product.name}
                </h1>
                <p className="text-lg text-surface-600 dark:text-surface-400">
                  by {product.brand}
                </p>
              </div>

              {/* Rating */}
              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <ApperIcon
                      key={i}
                      name="Star"
                      className={`h-5 w-5 ${
                        i < Math.floor(product.rating)
                          ? 'text-yellow-400 fill-current'
                          : 'text-surface-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-surface-600 dark:text-surface-400">
                  {product.rating} ({product.reviews} reviews)
                </span>
              </div>

              {/* Price */}
              <div className="space-y-2">
                <div className="flex items-center space-x-3">
                  <span className="text-4xl font-bold text-surface-900 dark:text-surface-100">
                    ${product.price}
                  </span>
                  {product.originalPrice > product.price && (
                    <span className="text-2xl text-surface-500 line-through">
                      ${product.originalPrice}
                    </span>
                  )}
                </div>
                {product.originalPrice > product.price && (
                  <span className="text-green-600 font-medium text-lg">
                    Save ${(product.originalPrice - product.price).toFixed(2)}
                  </span>
                )}
              </div>

              {/* Description */}
              <p className="text-surface-600 dark:text-surface-400 leading-relaxed">
                {product.description}
              </p>

              {/* Features */}
              <div>
                <h3 className="font-semibold text-surface-900 dark:text-surface-100 mb-3">
                  Key Features
                </h3>
                <div className="flex flex-wrap gap-2">
                  {product.features.map(feature => (
                    <span
                      key={feature}
                      className="px-3 py-1 bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 rounded-full text-sm"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>

              {/* Size Selection */}
              <div>
                <h3 className="font-semibold text-surface-900 dark:text-surface-100 mb-3">
                  Size
                </h3>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map(size => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-4 py-2 border-2 rounded-lg transition-all ${
                        selectedSize === size
                          ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20 text-primary-600'
                          : 'border-surface-300 dark:border-surface-600 hover:border-primary-300 text-surface-900 dark:text-surface-100'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex space-x-4">
                <button
                  onClick={handleAddToCart}
                  disabled={!product.inStock}
                  className={`flex-1 py-4 rounded-lg font-semibold text-lg transition-all ${
                    product.inStock
                      ? 'bg-gradient-to-r from-primary-600 to-secondary-600 text-white hover:shadow-xl hover:-translate-y-0.5'
                      : 'bg-surface-300 text-surface-500 cursor-not-allowed'
                  }`}
                >
                  {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                </button>
                <button
                  onClick={handleFavoriteToggle}
                  className={`px-6 py-4 rounded-lg border-2 transition-all ${
                    favorites.includes(product.id)
                      ? 'border-red-500 text-red-500 bg-red-50 dark:bg-red-900/20'
                      : 'border-surface-300 dark:border-surface-600 hover:border-red-500 hover:text-red-500 text-surface-600 dark:text-surface-400'
                  }`}
                >
                  <ApperIcon name="Heart" className="h-6 w-6" />
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default ProductDetail