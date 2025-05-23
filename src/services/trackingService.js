// Service for tracking-related operations

// Initialize ApperClient
const getApperClient = () => {
  const { ApperClient } = window.ApperSDK;
  return new ApperClient({
    apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
    apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
  });
};

// Get all updateable fields for the tracking table
const getUpdateableFields = () => [
  "Name",
  "Tags",
  "Owner",
  "trackingNumber",
  "shippingMethod",
  "estimatedDelivery",
  "currentStatus",
  "order"
];

// Get all fields for fetching tracking
const getAllFields = () => [
  "Name",
  "Tags",
  "Owner",
  "CreatedOn",
  "CreatedBy",
  "ModifiedOn",
  "ModifiedBy",
  "trackingNumber",
  "shippingMethod",
  "estimatedDelivery",
  "currentStatus",
  "order"
];

// Generate a tracking number
const generateTrackingNumber = () => {
  const prefix = 'SS';
  const timestamp = Date.now().toString().slice(-8);
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `${prefix}${timestamp}${random}`;
};

// Get delivery days based on shipping method
const getDeliveryDays = (shippingMethod) => {
  const days = {
    'standard': 7,
    'express': 3,
    'overnight': 1
  };
  return days[shippingMethod] || 5;
};

// Create tracking for an order
export const createTracking = async (orderData) => {
  try {
    const apperClient = getApperClient();
    
    const trackingNumber = generateTrackingNumber();
    const estimatedDelivery = new Date();
    estimatedDelivery.setDate(estimatedDelivery.getDate() + getDeliveryDays(orderData.shippingMethod));
    
    const params = {
      records: [{
        Name: `Tracking for order ${orderData.orderNumber}`,
        trackingNumber,
        shippingMethod: orderData.shippingMethod,
        estimatedDelivery: estimatedDelivery.toISOString(),
        currentStatus: 'processing',
        order: orderData.orderId
      }]
    };
    
    const response = await apperClient.createRecord("tracking", params);
    const createdTracking = response.results[0].data;
    
    // Create initial tracking event
    await createTrackingEvent(createdTracking.Id, {
      status: 'processing',
      title: 'Order Processing',
      description: 'Your order is being processed',
      timestamp: new Date().toISOString(),
      location: 'Processing Center'
    });
    
    // Create tracking location
    await createTrackingLocation(createdTracking.Id, {
      city: 'Processing Center',
      state: 'CA',
      country: 'USA',
      latitude: 37.7749,
      longitude: -122.4194
    });
    
    return createdTracking;
  } catch (error) {
    console.error("Error creating tracking:", error);
    throw error;
  }
};

// Create a tracking event
export const createTrackingEvent = async (trackingId, eventData) => {
  try {
    const apperClient = getApperClient();
    
    const params = {
      records: [{
        Name: `${eventData.title} - ${new Date().toISOString()}`,
        tracking: trackingId,
        status: eventData.status,
        title: eventData.title,
        description: eventData.description,
        timestamp: eventData.timestamp,
        location: eventData.location
      }]
    };
    
    const response = await apperClient.createRecord("tracking_event", params);
    return response.results[0].data;
  } catch (error) {
    console.error("Error creating tracking event:", error);
    throw error;
  }
};

// Create a tracking location
export const createTrackingLocation = async (trackingId, locationData) => {
  try {
    const apperClient = getApperClient();
    
    const params = {
      records: [{
        Name: `Location - ${locationData.city}`,
        tracking: trackingId,
        city: locationData.city,
        state: locationData.state,
        country: locationData.country,
        latitude: locationData.latitude,
        longitude: locationData.longitude
      }]
    };
    
    const response = await apperClient.createRecord("tracking_location", params);
    return response.results[0].data;
  } catch (error) {
    console.error("Error creating tracking location:", error);
    throw error;
  }
};

// Get tracking by tracking number
export const getTrackingByNumber = async (trackingNumber) => {
  try {
    const apperClient = getApperClient();
    
    const params = {
      fields: getAllFields(),
      where: [{
        fieldName: "trackingNumber",
        operator: "ExactMatch",
        values: [trackingNumber]
      }]
    };
    
    const response = await apperClient.fetchRecords("tracking", params);
    return response.data[0];
  } catch (error) {
    console.error("Error fetching tracking by number:", error);
    throw error;
  }
};

// Update tracking status
export const updateTrackingStatus = async (trackingId, status, location) => {
  try {
    const apperClient = getApperClient();
    
    const params = {
      records: [{
        Id: trackingId,
        currentStatus: status
      }]
    };
    
    const response = await apperClient.updateRecord("tracking", params);
    return response.results[0].data;
  } catch (error) {
    console.error("Error updating tracking status:", error);
    throw error;
  }
};

export default {
  createTracking,
  createTrackingEvent,
  createTrackingLocation,
  getTrackingByNumber,
  updateTrackingStatus
};