// Service for wishlist-related operations

// Initialize ApperClient
const getApperClient = () => {
  const { ApperClient } = window.ApperSDK;
  return new ApperClient({
    apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
    apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
  });
};

// Get all updateable fields for the wishlist_item table
const getUpdateableFields = () => [
  "Name",
  "Tags",
  "Owner",
  "user",
  "product"
];

// Get all fields for fetching wishlist items
const getAllFields = () => [
  "Name",
  "Tags",
  "Owner",
  "CreatedOn",
  "CreatedBy",
  "ModifiedOn",
  "ModifiedBy",
  "user",
  "product"
];

// Fetch wishlist items for a user
export const fetchWishlistItems = async (userId) => {
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
    
    const response = await apperClient.fetchRecords("wishlist_item", params);
    return response.data;
  } catch (error) {
    console.error("Error fetching wishlist items:", error);
    throw error;
  }
};

// Add item to wishlist
export const addToWishlist = async (userId, productId) => {
  try {
    const apperClient = getApperClient();
    
    // Check if the item already exists in the wishlist
    const existingItems = await fetchWishlistItems(userId);
    const existingItem = existingItems.find(item => item.product === productId);
    
    if (existingItem) {
      return existingItem; // Item already in wishlist
    } else {
      // Create new wishlist item
      const params = {
        records: [{
          Name: `Wishlist item for product ${productId}`,
          user: userId,
          product: productId
        }]
      };
      
      const response = await apperClient.createRecord("wishlist_item", params);
      return response.results[0].data;
    }
  } catch (error) {
    console.error("Error adding item to wishlist:", error);
    throw error;
  }
};

// Remove item from wishlist
export const removeFromWishlist = async (wishlistItemId) => {
  try {
    const apperClient = getApperClient();
    const params = { RecordIds: [wishlistItemId] };
    await apperClient.deleteRecord("wishlist_item", params);
    return true;
  } catch (error) {
    console.error("Error removing item from wishlist:", error);
    throw error;
  }
};

// Toggle item in wishlist (add if not present, remove if present)
export const toggleWishlistItem = async (userId, productId) => {
  try {
    const existingItems = await fetchWishlistItems(userId);
    const existingItem = existingItems.find(item => item.product === productId);
    
    if (existingItem) {
      return removeFromWishlist(existingItem.Id);
    } else {
      return addToWishlist(userId, productId);
    }
  } catch (error) {
    console.error("Error toggling wishlist item:", error);
    throw error;
  }
};

export default {
  fetchWishlistItems,
  addToWishlist,
  removeFromWishlist,
  toggleWishlistItem
};