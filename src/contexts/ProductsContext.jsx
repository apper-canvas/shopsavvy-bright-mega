import React, { createContext, useContext, useState, useEffect } from 'react'

const ProductsContext = createContext()

export const useProducts = () => {
  const context = useContext(ProductsContext)
  if (!context) {
    throw new Error('useProducts must be used within a ProductsProvider')
  }
  return context
}

export const ProductsProvider = ({ children }) => {
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
    },
    {
      id: 7,
      name: "Gaming Mechanical Keyboard",
      description: "RGB backlit mechanical gaming keyboard with customizable keys and ultra-responsive switches.",
      price: 129.99,
      originalPrice: 179.99,
      category: "electronics",
      brand: "GameTech",
      sizes: ["One Size"],
      colors: ["Black", "White"],
      image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400&h=400&fit=crop",
      rating: 4.7,
      reviews: 203,
      inStock: true,
      features: ["RGB Backlit", "Mechanical Switches", "Customizable"]
    }
  ])

  const [favorites, setFavorites] = useState([])

  const toggleFavorite = (productId) => {
    if (favorites.includes(productId)) {
      setFavorites(favorites.filter(id => id !== productId))
    } else {
      setFavorites([...favorites, productId])
    }
  }

  const value = {
    products,
    favorites,
    toggleFavorite
  }

  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  )
}