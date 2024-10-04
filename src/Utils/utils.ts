import { FieldError } from "react-hook-form";

// Function to get error message of input field
export const getFieldErrorMessage = (error: FieldError | undefined) => {
  if (!error) return undefined;
  return error.message;
};

// Function to generate unique IDs
export const generateUniqueId = () => {
  return `id-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
};