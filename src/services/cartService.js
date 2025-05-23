// Service for cart-related operations

// Initialize ApperClient
const getApperClient = () => {
  const { ApperClient } = window.ApperSDK;
  return new ApperClient({
    apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
    apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
  });
};

// Get all updateable fields for the cart_item table
const getUpdateableFields = () => [
  "Name",
  "Tags",
  "Owner",
  "user",
  "quantity",
  "product"
];

// Get all fields for fetching cart items
const getAllFields = () => [
  "Name",
  "Tags",
  "Owner",
  "CreatedOn",
  "CreatedBy",
  "ModifiedOn",
  "ModifiedBy",
  "user",
  "quantity",
  "product"
];

// Fetch cart items for a user
export const fetchCartItems = async (userId) => {
  try {
    const apperClient = getApperClient();
    
    const params = {
      fields: getAllFields(),
      where: [{
        fieldName: "user",
        operator: "ExactMatch",
        values: [userId]
      }]
    };
    
    const response = await apperClient.fetchRecords("cart_item", params);
    return response.data;
  } catch (error) {
    console.error("Error fetching cart items:", error);
    throw error;
  }
};

// Add item to cart
export const addToCart = async (userId, productId, quantity = 1) => {
  try {
    const apperClient = getApperClient();
    
    // Check if the item already exists in the cart
    const existingItems = await fetchCartItems(userId);
    const existingItem = existingItems.find(item => item.product === productId);
    
    if (existingItem) {
      // Update quantity if item exists
      return updateCartItemQuantity(existingItem.Id, existingItem.quantity + quantity);
    } else {
      // Create new cart item
      const params = {
        records: [{
          Name: `Cart item for product ${productId}`,
          user: userId,
          product: productId,
          quantity
        }]
      };
      
      const response = await apperClient.createRecord("cart_item", params);
      return response.results[0].data;
    }
  } catch (error) {
    console.error("Error adding item to cart:", error);
    throw error;
  }
};

// Update cart item quantity
export const updateCartItemQuantity = async (cartItemId, quantity) => {
  try {
    const apperClient = getApperClient();
    
    if (quantity <= 0) {
      // Remove item if quantity is 0 or negative
      return removeFromCart(cartItemId);
    }
    
    const params = {
      records: [{
        Id: cartItemId,
        quantity
      }]
    };
    
    const response = await apperClient.updateRecord("cart_item", params);
    return response.results[0].data;
  } catch (error) {
    console.error("Error updating cart item quantity:", error);
    throw error;
  }
};

// Remove item from cart
export const removeFromCart = async (cartItemId) => {
  try {
    const apperClient = getApperClient();
    const params = { RecordIds: [cartItemId] };
    await apperClient.deleteRecord("cart_item", params);
    return true;
  } catch (error) {
    console.error("Error removing item from cart:", error);
    throw error;
  }
};

// Clear all items from a user's cart
export const clearCart = async (userId) => {
  try {
    const cartItems = await fetchCartItems(userId);
    const cartItemIds = cartItems.map(item => item.Id);
    
    if (cartItemIds.length > 0) {
      const apperClient = getApperClient();
      const params = { RecordIds: cartItemIds };
      await apperClient.deleteRecord("cart_item", params);
    }
    
    return true;
  } catch (error) {
    console.error("Error clearing cart:", error);
    throw error;
  }
};

export default {
  fetchCartItems,
  addToCart,
  updateCartItemQuantity,
  removeFromCart,
  clearCart
};