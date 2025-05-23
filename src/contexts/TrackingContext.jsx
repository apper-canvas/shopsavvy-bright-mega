import { createContext, useContext, useState, useEffect } from 'react'
import toast from 'react-hot-toast'
import { 
  createTracking, 
  getTrackingByNumber, 
  updateTrackingStatus, 
  createTrackingEvent } from '../services/trackingService'

const TrackingContext = createContext()

export const useTracking = () => {
  const context = useContext(TrackingContext)
  if (!context) {
    throw new Error('useTracking must be used within a TrackingProvider')
  }
  return context
}

export const TrackingProvider = ({ children }) => {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [selectedOrder, setSelectedOrder] = useState(null)
  const [notifications, setNotifications] = useState({
    email: true,
    sms: false,
    push: true
  })

  // Load orders from localStorage on mount
  useEffect(() => {
    const savedOrders = localStorage.getItem('trackingOrders')
    if (savedOrders) {
      setOrders(JSON.parse(savedOrders))
    }
  }, [])

  // Save orders to localStorage whenever orders change
  useEffect(() => {
    localStorage.setItem('trackingOrders', JSON.stringify(orders))
  }, [orders])

  // Create new order tracking
  const createOrderTracking = async (orderData) => {
    try {
      setLoading(true)
      setError(null)
      
      const trackingData = await createTracking(orderData)
      const newOrder = formatTrackingData(trackingData, orderData)
      
      setOrders(prev => [newOrder, ...prev])
      toast.success(`Order ${orderData.orderNumber} is now being tracked!`)
      
      return newOrder
    } catch (error) {
      console.error("Error creating order tracking:", error)
      setError("Failed to create tracking for this order")
      toast.error("Failed to create tracking for this order")
      return null
    } finally {
      setLoading(false)
    }
  }

  // Get order by tracking number
  const getOrderByTrackingNumber = async (trackingNumber) => {
    try {
      setLoading(true)
      setError(null)
      
      // First check local state
      const localOrder = orders.find(order => order.trackingNumber === trackingNumber)
      if (localOrder) return localOrder
      
      // Then check the API
      const trackingData = await getTrackingByNumber(trackingNumber)
      if (!trackingData) return null
      
      // Format the tracking data and add to state
      const formattedTracking = formatTrackingData(trackingData)
      setOrders(prev => [formattedTracking, ...prev])
      
      return formattedTracking
    } catch (error) {
      console.error("Error getting tracking by number:", error)
      setError("Failed to find tracking information")
      return null
    } finally {
      setLoading(false)
    }
  }

  // Update order status
  const updateOrderStatus = async (trackingId, newStatus, location = null) => {
    try {
      setLoading(true)
      setError(null)
      
      // Update tracking status in database
      await updateTrackingStatus(trackingId, newStatus)
      
      // Create new tracking event
      const statusConfig = getStatusConfig(newStatus)
      await createTrackingEvent(trackingId, {
        status: newStatus,
        title: statusConfig.title,
        description: statusConfig.description,
        timestamp: new Date().toISOString(),
        location: location || 'Distribution Center'
      })
      
      // Update local state
      setOrders(prev => prev.map(order => {
        if (order.id === trackingId) {
          const newTimelineEvent = {
            id: order.timeline.length + 1,
            status: newStatus,
            title: statusConfig.title,
            description: statusConfig.description,
            timestamp: new Date().toISOString(),
            completed: true,
            location: location || order.currentLocation?.city || 'Distribution Center'
          }

          const updatedOrder = {
            ...order,
            status: newStatus,
            timeline: [...order.timeline, newTimelineEvent],
            currentLocation: location ? {
              ...order.currentLocation,
              city: location,
              ...getLocationCoordinates(location)
            } : order.currentLocation
          }

          // Send notification
          if (notifications.push) {
            toast.success(`📦 ${statusConfig.title}: ${statusConfig.description}`)
          }

          return updatedOrder
        }
        return order
      }))
      
      return true
    } catch (error) {
      console.error("Error updating order status:", error)
      setError("Failed to update order status")
      toast.error("Failed to update order status")
      return false
    } finally {
      setLoading(false)
      }
  }

  // Update notification preferences
  const updateNotifications = (newNotifications) => {
    setNotifications(newNotifications)
    localStorage.setItem('trackingNotifications', JSON.stringify(newNotifications))
    toast.success('Notification preferences updated!')
  }

  // Search orders
  const searchOrders = (query) => {
    if (!query.trim()) return orders
    
    return orders.filter(order => 
      order.trackingNumber.toLowerCase().includes(query.toLowerCase()) ||
      order.orderNumber.toLowerCase().includes(query.toLowerCase()) ||
      order.items.some(item => item.name.toLowerCase().includes(query.toLowerCase()))
    )
  }

  // Get pending shipments count
  const getPendingShipmentsCount = () => {
    return orders.filter(order => 
      ['processing', 'shipped', 'in_transit'].includes(order.status)
    ).length
  }

  // Format tracking data from API to match local state format
  const formatTrackingData = (trackingData, orderData = {}) => {
    return {
      id: trackingData.Id,
      orderNumber: orderData.orderNumber || trackingData.order,
      trackingNumber: trackingData.trackingNumber,
      status: trackingData.currentStatus,
      estimatedDelivery: trackingData.estimatedDelivery,
      items: orderData.items || [],
      shippingMethod: trackingData.shippingMethod,
      shippingAddress: orderData.shippingAddress || {},
      customerInfo: orderData.customerInfo || {},
      timeline: [],
      createdAt: trackingData.CreatedOn
    }
  }

  // Helper functions
  const generateTrackingNumber = () => {
    const prefix = 'SS'
    const timestamp = Date.now().toString().slice(-8)
    const random = Math.random().toString(36).substring(2, 6).toUpperCase()
    return `${prefix}${timestamp}${random}`
  }

  const getDeliveryDays = (shippingMethod) => {
    const days = {
      'standard': 7,
      'express': 3,
      'overnight': 1
    }
    return days[shippingMethod] || 5
  }

  const getStatusConfig = (status) => {
    const configs = {
      'processing': { title: 'Order Processing', description: 'Your order is being prepared' },
      'shipped': { title: 'Order Shipped', description: 'Your package is on its way' },
      'in_transit': { title: 'In Transit', description: 'Package is moving to destination' },
      'out_for_delivery': { title: 'Out for Delivery', description: 'Package will be delivered today' },
      'delivered': { title: 'Delivered', description: 'Package has been delivered successfully' },
      'exception': { title: 'Delivery Exception', description: 'There was an issue with delivery' }
    }
    return configs[status] || { title: 'Unknown Status', description: 'Status update' }
  }

  const getLocationCoordinates = (location) => {
    const coordinates = {
      'Los Angeles': { lat: 34.0522, lng: -118.2437 },
      'Phoenix': { lat: 33.4484, lng: -112.0740 },
      'Denver': { lat: 39.7392, lng: -104.9903 },
      'Chicago': { lat: 41.8781, lng: -87.6298 },
      'New York': { lat: 40.7128, lng: -74.0060 }
    }
    return coordinates[location] || { lat: 37.7749, lng: -122.4194 }
  }

  const value = {
    orders,
    selectedOrder,
    notifications,
    loading,
    error,
    setSelectedOrder,
    createOrderTracking,
    getOrderByTrackingNumber,
    updateOrderStatus,
    updateNotifications,
    searchOrders,
    getPendingShipmentsCount
  }

  return (
    <TrackingContext.Provider value={value}>
      {children}
    </TrackingContext.Provider>
  )
}

export { TrackingContext, TrackingProvider as default }