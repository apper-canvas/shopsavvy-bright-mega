// Service for customer-related operations

// Initialize ApperClient
const getApperClient = () => {
  const { ApperClient } = window.ApperSDK;
  return new ApperClient({
    apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
    apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
  });
};

// Get all updateable fields for the Customer1 table
const getUpdateableFields = () => [
  "Name",
  "Tags",
  "Owner",
  "firstName",
  "lastName",
  "email",
  "phone"
];

// Get all fields for fetching customers
const getAllFields = () => [
  "Name",
  "Tags",
  "Owner",
  "CreatedOn",
  "CreatedBy",
  "ModifiedOn",
  "ModifiedBy",
  "firstName",
  "lastName",
  "email",
  "phone"
];

// Create a new customer
export const createCustomer = async (customerData) => {
  try {
    const apperClient = getApperClient();
    
    const params = {
      records: [{
        Name: `${customerData.firstName} ${customerData.lastName}`,
        firstName: customerData.firstName,
        lastName: customerData.lastName,
        email: customerData.email,
        phone: customerData.phone || ''
      }]
    };
    
    const response = await apperClient.createRecord("Customer1", params);
    return response.results[0].data;
  } catch (error) {
    console.error("Error creating customer:", error);
    throw error;
  }
};

// Get customer by email
export const getCustomerByEmail = async (email) => {
  try {
    const apperClient = getApperClient();
    
    const params = {
      fields: getAllFields(),
      where: [{
        fieldName: "email",
        operator: "ExactMatch",
        values: [email]
      }]
    };
    
    const response = await apperClient.fetchRecords("Customer1", params);
    return response.data[0]; // Return first matching customer or undefined
  } catch (error) {
    console.error("Error fetching customer by email:", error);
    throw error;
  }
};

// Get or create customer by email
export const getOrCreateCustomer = async (customerData) => {
  try {
    const existingCustomer = await getCustomerByEmail(customerData.email);
    
    if (existingCustomer) {
      return existingCustomer;
    }
    
    return createCustomer(customerData);
  } catch (error) {
    console.error("Error getting or creating customer:", error);
    throw error;
  }
};

export default {
  createCustomer,
  getCustomerByEmail,
  getOrCreateCustomer
};