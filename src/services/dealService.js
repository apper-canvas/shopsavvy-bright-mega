// Service for deals-related operations

// Initialize ApperClient
const getApperClient = () => {
  const { ApperClient } = window.ApperSDK;
  return new ApperClient({
    apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
    apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
  });
};

// Get all updateable fields for the deal2 table
const getUpdateableFields = () => [
  "Name",
  "Tags",
  "Owner",
  "title",
  "originalPrice",
  "discountedPrice",
  "discountPercentage",
  "category",
  "image",
  "expiresAt",
  "featured"
];

// Get all fields for fetching deals
const getAllFields = () => [
  "Name",
  "Tags",
  "Owner",
  "CreatedOn",
  "CreatedBy",
  "ModifiedOn",
  "ModifiedBy",
  "title",
  "originalPrice",
  "discountedPrice",
  "discountPercentage",
  "category",
  "image",
  "expiresAt",
  "featured"
];

// Fetch all deals with optional filtering
export const fetchDeals = async (filters = {}) => {
  try {
    const apperClient = getApperClient();
    
    const params = {
      fields: getAllFields(),
      where: [],
      orderBy: [{ fieldName: "featured", SortType: "DESC" }]
    };
    
    // Add filters if provided
    if (filters.category && filters.category !== 'All') {
      params.where.push({
        fieldName: "category",
        operator: "ExactMatch",
        values: [filters.category]
      });
    }
    
    if (filters.minDiscount) {
      params.where.push({
        fieldName: "discountPercentage",
        operator: "GreaterThanOrEqualTo",
        values: [filters.minDiscount]
      });
    }
    
    const response = await apperClient.fetchRecords("deal2", params);
    return response.data;
  } catch (error) {
    console.error("Error fetching deals:", error);
    throw error;
  }
};

// Get featured deals
export const getFeaturedDeals = async () => {
  try {
    const apperClient = getApperClient();
    const params = {
      fields: getAllFields(),
      where: [{ fieldName: "featured", operator: "ExactMatch", values: [true] }],
      orderBy: [{ fieldName: "discountPercentage", SortType: "DESC" }]
    };
    
    const response = await apperClient.fetchRecords("deal2", params);
    return response.data;
  } catch (error) {
    console.error("Error fetching featured deals:", error);
    throw error;
  }
};

export default {
  fetchDeals,
  getFeaturedDeals
};