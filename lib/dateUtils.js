// Date utilities for form inputs
import { useMemo } from 'react';

// Get today's date in YYYY-MM-DD format (memoized)
export const useTodayDate = () => {
  return useMemo(() => {
    return new Date().toISOString().split('T')[0];
  }, []);
};

// Get minimum date (1950-01-01) - static since it never changes
export const MIN_DATE = '1950-01-01';

// Format date for display (e.g., "Jan 2024")
export const formatDisplayDate = (dateString) => {
  if (!dateString) return 'Present';
  
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return 'Present';
  
  const months = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];
  
  return `${months[date.getMonth()]}, ${date.getFullYear()}`;
};

// Validate date is not in the future
export const validateDateNotFuture = (dateString) => {
  if (!dateString) return true;
  
  const inputDate = new Date(dateString);
  const today = new Date();
  
  return inputDate <= today;
};