import { createContext, useContext, useState, useEffect } from 'react'
import { fetchDeals, getFeaturedDeals } from '../services/dealService'
import toast from 'react-hot-toast'

const DealsContext = createContext()

export const useDeals = () => {
  const context = useContext(DealsContext)
  if (!context) {
    throw new Error('useDeals must be used within a DealsProvider')
  }
  return context
}

export const DealsProvider = ({ children }) => {
  const [deals, setDeals] = useState([])
  const [filteredDeals, setFilteredDeals] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [minDiscount, setMinDiscount] = useState(0)
  const [sortBy, setSortBy] = useState('featured')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  // Load deals on mount
  useEffect(() => {
    const loadDeals = async () => {
      try {
        setLoading(true)
        setError(null)
        const dealsData = await fetchDeals()
        setDeals(dealsData)
        setFilteredDeals(dealsData)
      } catch (err) {
        console.error("Error loading deals:", err)
        setError("Failed to load deals")
        toast.error("Failed to load deals")
      } finally {
        setLoading(false)
      }
    }

    loadDeals()
  }, [])

  const filterDeals = async (category, discount) => {
    try {
      setLoading(true)
      setError(null)

      // Get deals with filters from API
      const filters = {
        category: category,
        minDiscount: discount
      }
      
      const dealsData = await fetchDeals(filters)
      
      // Apply sorting locally
      let filtered = [...dealsData]
      
      if (sortBy === 'featured') {
        filtered = filtered.sort((a, b) => b.featured - a.featured)
      } else if (sortBy === 'discount') {
        filtered = filtered.sort((a, b) => b.discountPercentage - a.discountPercentage)
      } else if (sortBy === 'price') {
        filtered = filtered.sort((a, b) => a.discountedPrice - b.discountedPrice)
      }

      setFilteredDeals(filtered)
    } catch (err) {
      console.error("Error filtering deals:", err)
      setError("Failed to filter deals")
      toast.error("Failed to filter deals")
    } finally {
      setLoading(false)
    }
  }

  const getFeaturedDealsFromApi = async () => {
    try {
      setLoading(true)
      setError(null)
      const featuredDeals = await getFeaturedDeals()
      return featuredDeals.slice(0, 3)
    } catch (err) {
      console.error("Error getting featured deals:", err)
      setError("Failed to load featured deals")
      toast.error("Failed to load featured deals")
      return []
    } finally {
      setLoading(false)
    }
  }

  const value = {
    deals,
    filteredDeals,
    loading,
    error,
    selectedCategory,
    setSelectedCategory,
    minDiscount,
    setMinDiscount,
    sortBy,
    setSortBy,
    filterDeals,
    getFeaturedDeals: getFeaturedDealsFromApi
  }

  return (
    <DealsContext.Provider value={value}>
      {children}
    </DealsContext.Provider>
  )
}