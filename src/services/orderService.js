// Service for order-related operations

// Initialize ApperClient
const getApperClient = () => {
  const { ApperClient } = window.ApperSDK;
  return new ApperClient({
    apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
    apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
  });
};

// Get all updateable fields for the order table
const getUpdateableFields = () => [
  "Name",
  "Tags",
  "Owner",
  "orderNumber",
  "orderDate",
  "status",
  "subtotal",
  "shipping",
  "tax",
  "total",
  "paymentMethod",
  "cardLastFour",
  "customer"
];

// Get all fields for fetching orders
const getAllFields = () => [
  "Name",
  "Tags",
  "Owner",
  "CreatedOn",
  "CreatedBy",
  "ModifiedOn",
  "ModifiedBy",
  "orderNumber",
  "orderDate",
  "status",
  "subtotal",
  "shipping",
  "tax",
  "total",
  "paymentMethod",
  "cardLastFour",
  "customer"
];

// Fetch orders for a customer
export const fetchCustomerOrders = async (customerId) => {
  try {
    const apperClient = getApperClient();
    
    const params = {
      fields: getAllFields(),
      where: [{
        fieldName: "customer",
        operator: "ExactMatch",
        values: [customerId]
      }],
      orderBy: [{ fieldName: "orderDate", SortType: "DESC" }]
    };
    
    const response = await apperClient.fetchRecords("order", params);
    return response.data;
  } catch (error) {
    console.error("Error fetching customer orders:", error);
    throw error;
  }
};

// Create a new order
export const createOrder = async (orderData) => {
  try {
    const apperClient = getApperClient();
    
    // Format the orderDate
    const orderDate = new Date().toISOString();
    
    const params = {
      records: [{
        Name: `Order ${orderData.orderNumber}`,
        orderNumber: orderData.orderNumber,
        orderDate,
        status: 'processing',
        subtotal: orderData.subtotal,
        shipping: orderData.shipping,
        tax: orderData.tax,
        total: orderData.total,
        paymentMethod: orderData.paymentMethod,
        cardLastFour: orderData.cardLastFour,
        customer: orderData.customerId
      }]
    };
    
    const response = await apperClient.createRecord("order", params);
    const createdOrder = response.results[0].data;
    
    // Create order items
    if (orderData.items && orderData.items.length > 0) {
      await createOrderItems(createdOrder.Id, orderData.items);
    }
    
    return createdOrder;
  } catch (error) {
    console.error("Error creating order:", error);
    throw error;
  }
};

// Create order items for an order
export const createOrderItems = async (orderId, items) => {
  try {
    const apperClient = getApperClient();
    
    const recordsToCreate = items.map(item => ({
      Name: `Order item - ${item.name}`,
      order: orderId,
      product: item.id,
      quantity: item.quantity,
      price: item.price
    }));
    
    const params = { records: recordsToCreate };
    
    const response = await apperClient.createRecord("order_item", params);
    return response.results.map(result => result.data);
  } catch (error) {
    console.error("Error creating order items:", error);
    throw error;
  }
};

export default {
  fetchCustomerOrders,
  createOrder
};