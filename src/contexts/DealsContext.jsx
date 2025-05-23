import { createContext, useContext, useState } from 'react'

const DealsContext = createContext()

export const useDeals = () => {
  const context = useContext(DealsContext)
  if (!context) {
    throw new Error('useDeals must be used within a DealsProvider')
  }
  return context
}

const sampleDeals = [
  {
    id: 1,
    title: "Premium Wireless Headphones",
    originalPrice: 299.99,
    discountedPrice: 199.99,
    discountPercentage: 33,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    featured: true
  },
  {
    id: 2,
    title: "Smart Fitness Watch",
    originalPrice: 249.99,
    discountedPrice: 149.99,
    discountPercentage: 40,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    expiresAt: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
    featured: true
  },
  {
    id: 3,
    title: "Designer Sunglasses",
    originalPrice: 159.99,
    discountedPrice: 79.99,
    discountPercentage: 50,
    category: "Fashion",
    image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    expiresAt: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
    featured: false
  },
  {
    id: 4,
    title: "Organic Skincare Set",
    originalPrice: 89.99,
    discountedPrice: 54.99,
    discountPercentage: 39,
    category: "Beauty",
    image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    expiresAt: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000),
    featured: true
  }
]

export const DealsProvider = ({ children }) => {
  const [deals] = useState(sampleDeals)
  const [filteredDeals, setFilteredDeals] = useState(sampleDeals)
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [minDiscount, setMinDiscount] = useState(0)
  const [sortBy, setSortBy] = useState('featured')

  const filterDeals = (category, discount) => {
    let filtered = deals.filter(deal => {
      const categoryMatch = category === 'All' || deal.category === category
      const discountMatch = deal.discountPercentage >= discount
      return categoryMatch && discountMatch
    })

    if (sortBy === 'featured') {
      filtered = filtered.sort((a, b) => b.featured - a.featured)
    } else if (sortBy === 'discount') {
      filtered = filtered.sort((a, b) => b.discountPercentage - a.discountPercentage)
    } else if (sortBy === 'price') {
      filtered = filtered.sort((a, b) => a.discountedPrice - b.discountedPrice)
    }

    setFilteredDeals(filtered)
  }

  const getFeaturedDeals = () => deals.filter(deal => deal.featured).slice(0, 3)

  const value = {
    deals,
    filteredDeals,
    selectedCategory,
    setSelectedCategory,
    minDiscount,
    setMinDiscount,
    sortBy,
    setSortBy,
    filterDeals,
    getFeaturedDeals
  }

  return (
    <DealsContext.Provider value={value}>
      {children}
    </DealsContext.Provider>
  )
}