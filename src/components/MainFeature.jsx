import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'react-toastify'
import { useCart } from '../contexts/CartContext'
import ApperIcon from './ApperIcon'

const MainFeature = () => {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [priceRange, setPriceRange] = useState([0, 1000])
  const [selectedBrand, setSelectedBrand] = useState('all')
  const [selectedSize, setSelectedSize] = useState('all')
  const { addToCart } = useCart()
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState('relevance')
  const [viewMode, setViewMode] = useState('grid')
  const [cart, setCart] = useState([])
  const [favorites, setFavorites] = useState([])
  const [selectedProduct, setSelectedProduct] = useState(null)

  // Mock product data
  const [products] = useState([
    {
      id: 1,
      name: "Wireless Bluetooth Headphones",
      description: "Premium noise-cancelling wireless headphones with 30-hour battery life and superior sound quality.",
      price: 199.99,
      originalPrice: 249.99,
      category: "electronics",
      brand: "AudioTech",
      sizes: ["One Size"],
      colors: ["Black", "White", "Silver"],
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop",
      rating: 4.8,
      reviews: 342,
      inStock: true,
      features: ["Noise Cancelling", "Wireless", "30hr Battery"]
    },
    {
      id: 2,
      name: "Premium Cotton T-Shirt",
      description: "Soft, comfortable premium cotton t-shirt perfect for everyday wear. Available in multiple colors and sizes.",
      price: 29.99,
      originalPrice: 39.99,
      category: "clothing",
      brand: "ComfortWear",
      sizes: ["XS", "S", "M", "L", "XL", "XXL"],
      colors: ["White", "Black", "Navy", "Gray"],
      image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop",
      rating: 4.5,
      reviews: 128,
      inStock: true,
      features: ["100% Cotton", "Pre-shrunk", "Machine Washable"]
    },
    {
      id: 3,
      name: "Smart Fitness Watch",
      description: "Advanced fitness tracking watch with heart rate monitoring, GPS, and 7-day battery life.",
      price: 299.99,
      originalPrice: 399.99,
      category: "electronics",
      brand: "FitTech",
      sizes: ["38mm", "42mm"],
      colors: ["Black", "Silver", "Rose Gold"],
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop",
      rating: 4.7,
      reviews: 256,
      inStock: true,
      features: ["Heart Rate Monitor", "GPS", "Water Resistant"]
    },
    {
      id: 4,
      name: "Organic Skincare Set",
      description: "Complete organic skincare routine with cleanser, toner, moisturizer, and serum for all skin types.",
      price: 89.99,
      originalPrice: 119.99,
      category: "beauty",
      brand: "NaturalGlow",
      sizes: ["Full Size", "Travel Size"],
      colors: ["Natural"],
      image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=400&fit=crop",
      rating: 4.9,
      reviews: 89,
      inStock: true,
      features: ["Organic", "Cruelty-Free", "All Skin Types"]
    },
    {
      id: 5,
      name: "Professional Camera Lens",
      description: "High-quality 50mm prime lens for professional photography with excellent low-light performance.",
      price: 599.99,
      originalPrice: 799.99,
      category: "electronics",
      brand: "ProLens",
      sizes: ["One Size"],
      colors: ["Black"],
      image: "https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=400&h=400&fit=crop",
      rating: 4.9,
      reviews: 67,
      inStock: false,
      features: ["50mm Prime", "Low Light", "Professional Grade"]
    },
    {
      id: 6,
      name: "Luxury Leather Handbag",
      description: "Handcrafted genuine leather handbag with multiple compartments and elegant design.",
      price: 249.99,
      originalPrice: 349.99,
      category: "accessories",
      brand: "LuxuryStyle",
      sizes: ["Medium", "Large"],
      colors: ["Brown", "Black", "Tan"],
      image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop",
      rating: 4.6,
      reviews: 134,
      inStock: true,
      features: ["Genuine Leather", "Multiple Compartments", "Handcrafted"]
    }
  ])

  const categories = [
    { id: 'all', name: 'All Products', icon: 'Grid3X3' },
    { id: 'electronics', name: 'Electronics', icon: 'Smartphone' },
    { id: 'clothing', name: 'Clothing', icon: 'Shirt' },
    { id: 'beauty', name: 'Beauty', icon: 'Sparkles' },
    { id: 'accessories', name: 'Accessories', icon: 'Watch' }
  ]

  const brands = ['all', 'AudioTech', 'ComfortWear', 'FitTech', 'NaturalGlow', 'ProLens', 'LuxuryStyle']
  const sizes = ['all', 'XS', 'S', 'M', 'L', 'XL', 'XXL', 'One Size', '38mm', '42mm']

  // Filter and sort products
  const filteredProducts = products
    .filter(product => {
      const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory
      const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1]
      const matchesBrand = selectedBrand === 'all' || product.brand === selectedBrand
      const matchesSize = selectedSize === 'all' || product.sizes.includes(selectedSize)
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           product.description.toLowerCase().includes(searchTerm.toLowerCase())
      
      return matchesCategory && matchesPrice && matchesBrand && matchesSize && matchesSearch
    })
    .sort((a, b) => {
  const handleAddToCart = (product) => {
    addToCart({
      ...product,
      image: product.image || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400'
    })
  }
      switch (sortBy) {
        case 'price_low':
          return a.price - b.price
        case 'price_high':
          return b.price - a.price
        case 'rating':
          return b.rating - a.rating
        case 'newest':
          return b.id - a.id
        default:
          return 0
      }
    })

  const addToCart = (product) => {
    const existingItem = cart.find(item => item.id === product.id)
    if (existingItem) {
      setCart(cart.map(item => 
        item.id === product.id 
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ))
      toast.success(`Added another ${product.name} to cart!`)
    } else {
      setCart([...cart, { ...product, quantity: 1 }])
      toast.success(`${product.name} added to cart!`)
    }
  }

  const toggleFavorite = (productId) => {
    if (favorites.includes(productId)) {
      setFavorites(favorites.filter(id => id !== productId))
      toast.info("Removed from favorites")
    } else {
      setFavorites([...favorites, productId])
      toast.success("Added to favorites!")
    }
  }

  const clearFilters = () => {
    setSelectedCategory('all')
    setPriceRange([0, 1000])
    setSelectedBrand('all')
    setSelectedSize('all')
    setSearchTerm('')
    setSortBy('relevance')
    toast.info("Filters cleared!")
  }

  return (
    <section className="py-16 lg:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-surface-900 dark:text-surface-100 mb-4">
            Smart Product Discovery
          </h2>
          <p className="text-lg text-surface-600 dark:text-surface-400 max-w-3xl mx-auto">
            Find exactly what you're looking for with our intelligent filtering system and personalized recommendations.
          </p>
        </motion.div>

        {/* Search and View Controls */}
        <motion.div
          className="mb-8 bg-white dark:bg-surface-800 rounded-2xl shadow-neu-light dark:shadow-neu-dark p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
            {/* Search */}
            <div className="flex-1 relative max-w-md">
              <ApperIcon name="Search" className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-surface-400" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-surface-300 dark:border-surface-600 bg-surface-50 dark:bg-surface-700 text-surface-900 dark:text-surface-100 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
              />
            </div>

            {/* Controls */}
            <div className="flex flex-wrap gap-3 items-center">
              {/* Sort */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 rounded-lg border border-surface-300 dark:border-surface-600 bg-surface-50 dark:bg-surface-700 text-surface-900 dark:text-surface-100 focus:ring-2 focus:ring-primary-500 text-sm"
              >
                <option value="relevance">Sort by Relevance</option>
                <option value="price_low">Price: Low to High</option>
                <option value="price_high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
                <option value="newest">Newest</option>
              </select>

              {/* View Mode */}
              <div className="flex bg-surface-100 dark:bg-surface-700 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-md transition-all ${viewMode === 'grid' 
                    ? 'bg-white dark:bg-surface-600 shadow-sm text-surface-900 dark:text-surface-100' 
                    : 'hover:bg-surface-200 dark:hover:bg-surface-600 text-surface-600 dark:text-surface-400'}`}
                >
                  <ApperIcon name="Grid3X3" className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-md transition-all ${viewMode === 'list' 
                    ? 'bg-white dark:bg-surface-600 shadow-sm text-surface-900 dark:text-surface-100' 
                    : 'hover:bg-surface-200 dark:hover:bg-surface-600 text-surface-600 dark:text-surface-400'}`}
                >
                  <ApperIcon name="List" className="h-4 w-4" />
                </button>
              </div>

              {/* Cart Counter */}
              <div className="flex items-center space-x-2 bg-primary-50 dark:bg-primary-900/20 px-4 py-2 rounded-lg">
                <ApperIcon name="ShoppingCart" className="h-5 w-5 text-primary-600" />
                <span className="text-sm font-semibold text-primary-600">
                  {cart.reduce((sum, item) => sum + item.quantity, 0)} items
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <motion.div
            className="lg:col-span-1"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
                      <motion.button
                        onClick={() => handleAddToCart(product)}
                        className="w-full mt-4 px-4 py-2 bg-gradient-to-r from-primary-600 to-secondary-600 text-white rounded-lg hover:shadow-lg transition-all font-semibold"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        Add to Cart
                      </motion.button>
          >
            <div className="bg-white dark:bg-surface-800 rounded-2xl shadow-neu-light dark:shadow-neu-dark p-6 sticky top-24">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-surface-900 dark:text-surface-100">
                  Filters
                </h3>
                <button
                  onClick={clearFilters}
                  className="text-sm text-primary-600 hover:text-primary-700 transition-colors font-medium"
                >
                  Clear All
                </button>
              </div>

              <div className="space-y-6">
                {/* Categories */}
                <div>
                  <h4 className="font-medium text-surface-900 dark:text-surface-100 mb-3">Categories</h4>
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

                {/* Price Range */}
                <div>
                  <h4 className="font-medium text-surface-900 dark:text-surface-100 mb-3">Price Range</h4>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <input
                        type="number"
                      <motion.button
                        onClick={() => handleAddToCart(product)}
                        className="px-6 py-2 bg-gradient-to-r from-primary-600 to-secondary-600 text-white rounded-lg hover:shadow-lg transition-all font-semibold"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        Add to Cart
                      </motion.button>
                        value={priceRange[0]}
                        onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                        className="w-20 px-2 py-1 text-xs rounded border border-surface-300 dark:border-surface-600 bg-surface-50 dark:bg-surface-700"
                        placeholder="Min"
                      />
                      <span className="text-surface-400">to</span>
                      <input
                        type="number"
                        value={priceRange[1]}
                        onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                        className="w-20 px-2 py-1 text-xs rounded border border-surface-300 dark:border-surface-600 bg-surface-50 dark:bg-surface-700"
                        placeholder="Max"
                      />
                    </div>
                    <div className="text-xs text-surface-500">
                      ${priceRange[0]} - ${priceRange[1]}
                    </div>
                  </div>
                </div>

                {/* Brand */}
                <div>
                  <h4 className="font-medium text-surface-900 dark:text-surface-100 mb-3">Brand</h4>
                  <select
                    value={selectedBrand}
                    onChange={(e) => setSelectedBrand(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-surface-300 dark:border-surface-600 bg-surface-50 dark:bg-surface-700 text-sm"
                  >
                    {brands.map(brand => (
                      <option key={brand} value={brand}>
                        {brand === 'all' ? 'All Brands' : brand}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Size */}
                <div>
                  <h4 className="font-medium text-surface-900 dark:text-surface-100 mb-3">Size</h4>
                  <select
                    value={selectedSize}
                    onChange={(e) => setSelectedSize(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-surface-300 dark:border-surface-600 bg-surface-50 dark:bg-surface-700 text-sm"
                  >
                    {sizes.map(size => (
                      <option key={size} value={size}>
                        {size === 'all' ? 'All Sizes' : size}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Products Grid */}
          <div className="lg:col-span-3">
            <motion.div
              className="mb-6 flex items-center justify-between"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <p className="text-surface-600 dark:text-surface-400">
                Showing {filteredProducts.length} of {products.length} products
              </p>
            </motion.div>

            <AnimatePresence mode="wait">
              <motion.div
                key={`${selectedCategory}-${viewMode}`}
                className={viewMode === 'grid' 
                  ? "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6" 
                  : "space-y-6"
                }
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
              >
                {filteredProducts.map((product, index) => (
                  <motion.div
                    key={product.id}
                    className={`group bg-white dark:bg-surface-800 rounded-2xl shadow-neu-light dark:shadow-neu-dark overflow-hidden hover:shadow-xl transition-all duration-300 ${
                      viewMode === 'list' ? 'flex flex-col sm:flex-row' : ''
                    }`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    layout
                  >
                    {/* Product Image */}
                    <div className={`relative overflow-hidden ${
                      viewMode === 'list' ? 'sm:w-48 h-48 sm:h-auto' : 'aspect-square'
                    }`}>
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      
                      {/* Overlay Actions */}
                      <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-3">
                        <button
                          onClick={() => setSelectedProduct(product)}
                          className="flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-surface-900 hover:bg-white transition-colors"
                        >
                          <ApperIcon name="Eye" className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => toggleFavorite(product.id)}
                          className={`flex h-10 w-10 items-center justify-center rounded-full transition-colors ${
                            favorites.includes(product.id)
                              ? 'bg-red-500 text-white'
                              : 'bg-white/90 text-surface-900 hover:bg-white'
                          }`}
                        >
                          <ApperIcon name="Heart" className="h-5 w-5" />
                        </button>
                      </div>

                      {/* Badges */}
                      <div className="absolute top-3 left-3 space-y-2">
                        {product.originalPrice > product.price && (
                          <span className="px-2 py-1 bg-red-500 text-white text-xs font-bold rounded-full">
                            SALE
                          </span>
                        )}
                        {!product.inStock && (
                          <span className="px-2 py-1 bg-surface-500 text-white text-xs font-bold rounded-full">
                            OUT OF STOCK
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Product Info */}
                    <div className={`p-6 ${viewMode === 'list' ? 'flex-1' : ''}`}>
                      <div className="space-y-3">
                        <div>
                          <h3 className="font-semibold text-surface-900 dark:text-surface-100 group-hover:text-primary-600 transition-colors line-clamp-2">
                            {product.name}
                          </h3>
                          <p className="text-sm text-surface-500 mt-1">{product.brand}</p>
                        </div>

                        {viewMode === 'list' && (
                          <p className="text-sm text-surface-600 dark:text-surface-400 line-clamp-2">
                            {product.description}
                          </p>
                        )}

                        {/* Rating */}
                        <div className="flex items-center space-x-2">
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <ApperIcon
                                key={i}
                                name="Star"
                                className={`h-4 w-4 ${
                                  i < Math.floor(product.rating)
                                    ? 'text-yellow-400 fill-current'
                                    : 'text-surface-300'
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-sm text-surface-500">
                            {product.rating} ({product.reviews})
                          </span>
                        </div>

                        {/* Features */}
                        <div className="flex flex-wrap gap-1">
                          {product.features.slice(0, 3).map(feature => (
                            <span
                              key={feature}
                              className="px-2 py-1 bg-surface-100 dark:bg-surface-700 text-xs text-surface-600 dark:text-surface-400 rounded-full"
                            >
                              {feature}
                            </span>
                          ))}
                        </div>

                        {/* Price and Actions */}
                        <div className="flex items-center justify-between pt-2">
                          <div className="space-y-1">
                            <div className="flex items-center space-x-2">
                              <span className="text-lg font-bold text-surface-900 dark:text-surface-100">
                                ${product.price}
                              </span>
                              {product.originalPrice > product.price && (
                                <span className="text-sm text-surface-500 line-through">
                                  ${product.originalPrice}
                                </span>
                              )}
                            </div>
                            {product.originalPrice > product.price && (
                              <span className="text-xs text-green-600 font-medium">
                                Save ${(product.originalPrice - product.price).toFixed(2)}
                              </span>
                            )}
                          </div>

                          <button
                            onClick={() => addToCart(product)}
                            disabled={!product.inStock}
                            className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${
                              product.inStock
                                ? 'bg-gradient-to-r from-primary-600 to-secondary-600 text-white hover:shadow-lg hover:-translate-y-0.5'
                                : 'bg-surface-300 text-surface-500 cursor-not-allowed'
                            }`}
                          >
                            {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>

            {filteredProducts.length === 0 && (
              <motion.div
                className="text-center py-12"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="flex h-24 w-24 items-center justify-center mx-auto mb-6 rounded-full bg-surface-100 dark:bg-surface-700">
                  <ApperIcon name="Search" className="h-12 w-12 text-surface-400" />
                </div>
                <h3 className="text-xl font-semibold text-surface-900 dark:text-surface-100 mb-2">
                  No products found
                </h3>
                <p className="text-surface-600 dark:text-surface-400 mb-4">
                  Try adjusting your filters or search terms
                </p>
                <button
                  onClick={clearFilters}
                  className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium"
                >
                  Clear Filters
                </button>
              </motion.div>
            )}
          </div>
        </div>

        {/* Product Details Modal */}
        <AnimatePresence>
          {selectedProduct && (
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProduct(null)}
            >
              <motion.div
                className="bg-white dark:bg-surface-800 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="grid md:grid-cols-2 gap-6 p-6">
                  <div className="space-y-4">
                    <img
                      src={selectedProduct.image}
                      alt={selectedProduct.name}
                      className="w-full aspect-square object-cover rounded-xl"
                    />
                    <div className="grid grid-cols-3 gap-2">
                      {[...Array(3)].map((_, i) => (
                        <img
                          key={i}
                          src={selectedProduct.image}
                          alt={`${selectedProduct.name} ${i + 1}`}
                          className="aspect-square object-cover rounded-lg opacity-60 hover:opacity-100 transition-opacity cursor-pointer"
                        />
                      ))}
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <h2 className="text-2xl font-bold text-surface-900 dark:text-surface-100 mb-2">
                        {selectedProduct.name}
                      </h2>
                      <p className="text-surface-600 dark:text-surface-400">
                        by {selectedProduct.brand}
                      </p>
                    </div>

                    <div className="flex items-center space-x-4">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <ApperIcon
                            key={i}
                            name="Star"
                            className={`h-5 w-5 ${
                              i < Math.floor(selectedProduct.rating)
                                ? 'text-yellow-400 fill-current'
                                : 'text-surface-300'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-surface-600">
                        {selectedProduct.rating} ({selectedProduct.reviews} reviews)
                      </span>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center space-x-3">
                        <span className="text-3xl font-bold text-surface-900 dark:text-surface-100">
                          ${selectedProduct.price}
                        </span>
                        {selectedProduct.originalPrice > selectedProduct.price && (
                          <span className="text-xl text-surface-500 line-through">
                            ${selectedProduct.originalPrice}
                          </span>
                        )}
                      </div>
                      {selectedProduct.originalPrice > selectedProduct.price && (
                        <span className="text-green-600 font-medium">
                          Save ${(selectedProduct.originalPrice - selectedProduct.price).toFixed(2)}
                        </span>
                      )}
                    </div>

                    <p className="text-surface-600 dark:text-surface-400">
                      {selectedProduct.description}
                    </p>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-surface-900 dark:text-surface-100 mb-2">
                          Size
                        </label>
                        <div className="flex flex-wrap gap-2">
                          {selectedProduct.sizes.map(size => (
                            <button
                              key={size}
                              className="px-3 py-2 border border-surface-300 dark:border-surface-600 rounded-lg text-sm hover:border-primary-500 hover:text-primary-600 transition-colors text-surface-900 dark:text-surface-100"
                            >
                              {size}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-surface-900 dark:text-surface-100 mb-2">
                          Color
                        </label>
                        <div className="flex space-x-2">
                          {selectedProduct.colors.map(color => (
                            <button
                              key={color}
                              className="w-8 h-8 rounded-full border-2 border-surface-300 dark:border-surface-600 hover:border-primary-500 transition-colors"
                              style={{ backgroundColor: color.toLowerCase() }}
                              title={color}
                            />
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="flex space-x-4">
                      <button
                        onClick={() => {
                          addToCart(selectedProduct)
                          setSelectedProduct(null)
                        }}
                        disabled={!selectedProduct.inStock}
                        className={`flex-1 py-3 rounded-lg font-medium transition-all ${
                          selectedProduct.inStock
                            ? 'bg-gradient-to-r from-primary-600 to-secondary-600 text-white hover:shadow-lg font-semibold'
                            : 'bg-surface-300 text-surface-500 cursor-not-allowed'
                        }`}
                      >
                        {selectedProduct.inStock ? 'Add to Cart' : 'Out of Stock'}
                      </button>
                      <button
                        onClick={() => toggleFavorite(selectedProduct.id)}
                        className={`px-4 py-3 rounded-lg border-2 transition-colors ${
                          favorites.includes(selectedProduct.id)
                            ? 'border-red-500 text-red-500 bg-red-50 dark:bg-red-900/20 font-medium'
                            : 'border-surface-300 dark:border-surface-600 hover:border-red-500 hover:text-red-500 text-surface-600 dark:text-surface-400'
                        }`}
                      >
                        <ApperIcon name="Heart" className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => setSelectedProduct(null)}
                  className="absolute top-4 right-4 flex h-8 w-8 items-center justify-center rounded-full bg-surface-100 dark:bg-surface-700 text-surface-600 dark:text-surface-400 hover:bg-surface-200 dark:hover:bg-surface-600 transition-colors font-medium"
                >
                  <ApperIcon name="X" className="h-4 w-4" />
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}

export default MainFeature