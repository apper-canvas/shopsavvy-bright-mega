import React, { createContext, useContext, useState, useEffect } from 'react'
import { toast } from 'react-hot-toast'
import { fetchProducts, getProductById } from '../services/productService'

const ProductsContext = createContext()

export const useProducts = () => {
  const context = useContext(ProductsContext)
  if (!context) {
    throw new Error('useProducts must be used within a ProductsProvider')
  }
  return context
}

export const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [favorites, setFavorites] = useState([])

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true)
        setError(null)
        const productsData = await fetchProducts()
        setProducts(productsData)
      } catch (error) {
        console.error("Error loading products:", error)
        setError("Failed to load products. Please try again later.")
        toast.error("Failed to load products")
      } finally {
        setLoading(false)
      }
    }

    loadProducts()
  }, [])

  const toggleFavorite = (productId) => {
    if (favorites.includes(productId)) {
      setFavorites(favorites.filter(id => id !== productId))
      toast.success('Removed from wishlist')
    } else {
      setFavorites([...favorites, productId]);
      toast.success('Added to wishlist');
    }
  }

  const getProductByIdFromApi = async (id) => {
    try {
      setLoading(true);
      const product = await getProductById(id);
      return product;
    } catch (error) {
      console.error(`Error getting product with ID ${id}:`, error);
      toast.error("Failed to load product details");
      return null;
    } finally {
      setLoading(false);
    }
  }

  const getProductByIdLocal = (id) => {
    return products.find(product => product.id === parseInt(id));
  }

  const getFavoriteProducts = () => {
    return products.filter(product => favorites.includes(product.id));
  }
  
  const value = {
    products,
    loading,
    error,
    favorites,
    toggleFavorite,
    getProductById: getProductByIdLocal,
    getProductByIdFromApi,
    getFavoriteProducts,
    refreshProducts: () => fetchProducts().then(data => setProducts(data))
  }

  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  )
}