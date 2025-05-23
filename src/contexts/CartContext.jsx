import { createContext, useContext, useReducer, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import toast from 'react-hot-toast'
import { fetchCartItems, addToCart as addToCartService, 
         updateCartItemQuantity, removeFromCart as removeFromCartService, 
         clearCart as clearCartService } from '../services/cartService'

const CartContext = createContext()

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'SET_CART_ITEMS':
      return {
        ...state,
        items: action.payload
      }
    case 'ADD_TO_CART': {
      const existingItem = state.items.find(item => item.product === action.payload.id)
      if (existingItem) {
        return {
          ...state,
          items: state.items.map(item =>
            item.product === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        }
      }
      
      // Create a new cart item
      const newItem = {
        Id: `temp-${Date.now()}`, // Temporary ID until we get the real one from the server
        product: action.payload.id,
        Name: action.payload.name,
        price: action.payload.price,
        image: action.payload.image,
        quantity: 1
      }
      
      return {
        ...state,
        items: [...state.items, newItem]
      }
    }
    case 'REMOVE_FROM_CART':
      return {
        ...state,
        items: state.items.filter(item => item.Id !== action.payload)
      }
    case 'UPDATE_QUANTITY':
      return {
        ...state,
        items: state.items.map(item =>
          item.Id === action.payload.id
            ? { ...item, quantity: Math.max(0, action.payload.quantity) }
            : item
        ).filter(item => item.quantity > 0)
      }
    case 'CLEAR_CART':
      return {
        ...state,
        items: []
      }
    default:
      return state
  }
}

export const CartProvider = ({ children }) => {
  const [cart, dispatch] = useReducer(cartReducer, { items: [] })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const { user, isAuthenticated } = useSelector((state) => state.user)

  // Load cart items when user is authenticated
  useEffect(() => {
    const loadCartItems = async () => {
      if (!isAuthenticated || !user) return

      try {
        setLoading(true)
        setError(null)
        const cartItems = await fetchCartItems(user.userId)
        dispatch({ type: 'SET_CART_ITEMS', payload: cartItems })
      } catch (err) {
        console.error("Error loading cart items:", err)
        setError("Failed to load your shopping cart")
        toast.error("Failed to load your shopping cart")
      } finally {
        setLoading(false)
      }
    }

    loadCartItems()
  }, [isAuthenticated, user])

  const addToCart = async (product) => {
    try {
      // First update local state for immediate feedback
      dispatch({ type: 'ADD_TO_CART', payload: product })

      if (isAuthenticated && user) {
        // Then update server state
        setLoading(true)
        const result = await addToCartService(user.userId, product.id)
        toast.success(`${product.name} added to cart`)
        
        // Refresh cart after server update
        const cartItems = await fetchCartItems(user.userId)
        dispatch({ type: 'SET_CART_ITEMS', payload: cartItems })
      }
    } catch (err) {
      console.error("Error adding to cart:", err)
      toast.error("Failed to add item to cart")
    } finally {
      setLoading(false)
    }
  }

  const removeFromCart = async (cartItemId) => {
    try {
      // First update local state
      dispatch({ type: 'REMOVE_FROM_CART', payload: cartItemId })

      if (isAuthenticated && user) {
        // Then update server state
        setLoading(true)
        await removeFromCartService(cartItemId)
        toast.success("Item removed from cart")
      }
    } catch (err) {
      console.error("Error removing from cart:", err)
      toast.error("Failed to remove item from cart")
    } finally {
      setLoading(false)
    }
  }

  const updateQuantity = async (cartItemId, quantity) => {
    try {
      // First update local state
      dispatch({ type: 'UPDATE_QUANTITY', payload: { id: cartItemId, quantity } })

      if (isAuthenticated && user) {
        // Then update server state
        setLoading(true)
        if (quantity > 0) {
          await updateCartItemQuantity(cartItemId, quantity)
        } else {
          await removeFromCartService(cartItemId)
        }
      }
    } catch (err) {
      console.error("Error updating cart quantity:", err)
      toast.error("Failed to update item quantity")
    } finally {
      setLoading(false)
    }
  }

  const clearCart = async () => {
    try {
      // First update local state
      dispatch({ type: 'CLEAR_CART' })

      if (isAuthenticated && user) {
        // Then update server state
        setLoading(true)
        await clearCartService(user.userId)
        toast.success("Cart cleared")
      }
    } catch (err) {
      console.error("Error clearing cart:", err)
      toast.error("Failed to clear cart")
    } finally {
      setLoading(false)
    }
  }
  const getTotalItems = () => Array.isArray(cart?.items) ? cart.items.reduce((sum, item) => sum + (item?.quantity || 0), 0) : 0
  const getTotalPrice = () => Array.isArray(cart?.items) ? cart.items.reduce((sum, item) => sum + ((item?.price || 0) * (item?.quantity || 0)), 0) : 0

  return (
    <CartContext.Provider value={{ 
      cart, 
      loading,
      error,
      addToCart, 
      removeFromCart, 
      updateQuantity, 
      clearCart, 
      getTotalItems, 
      getTotalPrice 
    }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => useContext(CartContext)