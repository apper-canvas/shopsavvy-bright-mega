// Service for category-related operations

// Initialize ApperClient
const getApperClient = () => {
  const { ApperClient } = window.ApperSDK;
  return new ApperClient({
    apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
    apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
  });
};

// Get all updateable fields for the category table
const getUpdateableFields = () => [
  "Name",
  "Tags",
  "Owner",
  "icon",
  "color"
];

// Get all fields for fetching categories
const getAllFields = () => [
  "Name",
  "Tags",
  "Owner",
  "CreatedOn",
  "CreatedBy",
  "ModifiedOn",
  "ModifiedBy",
  "icon",
  "color"
];

// Fetch all categories
export const fetchCategories = async () => {
  try {
    const apperClient = getApperClient();
    
    const params = {
      fields: getAllFields(),
      orderBy: [{ fieldName: "Name", SortType: "ASC" }]
    };
    
    const response = await apperClient.fetchRecords("category", params);
    return response.data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
};

export default {
  fetchCategories
};