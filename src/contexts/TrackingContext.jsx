import { createContext, useContext, useState, useEffect } from 'react'
import toast from 'react-hot-toast'

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
  const createOrderTracking = (orderData) => {
    const trackingNumber = generateTrackingNumber()
    const estimatedDelivery = new Date()
    estimatedDelivery.setDate(estimatedDelivery.getDate() + getDeliveryDays(orderData.shippingMethod))

    const newOrder = {
      id: Date.now().toString(),
      orderNumber: orderData.orderNumber,
      trackingNumber,
      status: 'processing',
      estimatedDelivery: estimatedDelivery.toISOString(),
      items: orderData.items,
      shippingMethod: orderData.shippingMethod,
      shippingAddress: orderData.shippingAddress,
      customerInfo: orderData.customerInfo,
      timeline: [
        {
          id: 1,
          status: 'processing',
          title: 'Order Processing',
          description: 'Your order is being processed',
          timestamp: new Date().toISOString(),
          completed: true,
          location: 'Processing Center'
        }
      ],
      currentLocation: {
        city: 'Processing Center',
        state: 'CA',
        country: 'USA',
        coordinates: { lat: 37.7749, lng: -122.4194 }
      },
      createdAt: new Date().toISOString()
    }

    setOrders(prev => [newOrder, ...prev])
    toast.success(`Order ${orderData.orderNumber} is now being tracked!`)
    
    // Simulate status updates
    simulateDeliveryProgress(newOrder.id)
    
    return newOrder
  }

  // Get order by tracking number
  const getOrderByTrackingNumber = (trackingNumber) => {
    return orders.find(order => order.trackingNumber === trackingNumber)
  }

  // Update order status
  const updateOrderStatus = (orderId, newStatus, location = null) => {
    setOrders(prev => prev.map(order => {
      if (order.id === orderId) {
        const statusConfig = getStatusConfig(newStatus)
        const newTimelineEvent = {
          id: order.timeline.length + 1,
          status: newStatus,
          title: statusConfig.title,
          description: statusConfig.description,
          timestamp: new Date().toISOString(),
          completed: true,
          location: location || order.currentLocation.city
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

  const simulateDeliveryProgress = (orderId) => {
    const statuses = ['shipped', 'in_transit', 'out_for_delivery', 'delivered']
    const locations = ['Los Angeles', 'Phoenix', 'Denver', 'Chicago', 'New York']
    
    statuses.forEach((status, index) => {
      setTimeout(() => {
        const location = locations[index] || 'Distribution Center'
        updateOrderStatus(orderId, status, location)
      }, (index + 1) * 10000) // Update every 10 seconds for demo
    })
  }

  const value = {
    orders,
    selectedOrder,
    notifications,
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