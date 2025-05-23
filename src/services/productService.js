// Service for product-related operations

// Initialize ApperClient
const getApperClient = () => {
  const { ApperClient } = window.ApperSDK;
  return new ApperClient({
    apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
    apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
  });
};

// Get all updateable fields for the product table
const getUpdateableFields = () => [
  "Name",
  "Tags",
  "Owner",
  "description",
  "price",
  "originalPrice",
  "category",
  "brand",
  "rating",
  "reviews",
  "inStock",
  "image"
];

// Get all fields for fetching products
const getAllFields = () => [
  "Name",
  "Tags",
  "Owner",
  "CreatedOn",
  "CreatedBy",
  "ModifiedOn",
  "ModifiedBy",
  "description",
  "price",
  "originalPrice",
  "category",
  "brand",
  "rating",
  "reviews",
  "inStock",
  "image"
];

// Fetch all products with optional filtering
export const fetchProducts = async (filters = {}) => {
  try {
    const apperClient = getApperClient();
    
    const params = {
      fields: getAllFields(),
      where: [],
      orderBy: [{ fieldName: "Name", SortType: "ASC" }]
    };
    
    // Add filters if provided
    if (filters.category && filters.category !== 'all') {
      params.where.push({
        fieldName: "category",
        operator: "ExactMatch",
        values: [filters.category]
      });
    }
    
    if (filters.priceRange) {
      params.where.push({
        fieldName: "price",
        operator: "GreaterThanOrEqualTo",
        values: [filters.priceRange[0]]
      });
      params.where.push({
        fieldName: "price",
        operator: "LessThanOrEqualTo",
        values: [filters.priceRange[1]]
      });
    }
    
    const response = await apperClient.fetchRecords("product", params);
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

// Get a product by ID
export const getProductById = async (productId) => {
  try {
    const apperClient = getApperClient();
    const params = {
      fields: getAllFields()
    };
    
    const response = await apperClient.getRecordById("product", productId, params);
    return response.data;
  } catch (error) {
    console.error(`Error fetching product with ID ${productId}:`, error);
    throw error;
  }
};

// Get products by category
export const getProductsByCategory = async (categoryId) => {
  return fetchProducts({ category: categoryId });
};

export default {
  fetchProducts,
  getProductById,
  getProductsByCategory
};