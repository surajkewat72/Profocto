// URL validation utility
export const isValidUrl = (string) => {
  if (!string || string.trim() === '') return true; // Allow empty URLs
  
  try {
    const url = new URL(string);
    // Only allow http and https protocols for security
    return url.protocol === 'http:' || url.protocol === 'https:';
  } catch (error) {
    return false;
  }
};

// Sanitize URL to prevent malicious protocols
export const sanitizeUrl = (url) => {
  if (!url || url.trim() === '') return '';
  
  const trimmedUrl = url.trim();
  
  // If URL doesn't start with http:// or https://, prepend https://
  if (!trimmedUrl.startsWith('http://') && !trimmedUrl.startsWith('https://')) {
    return `https://${trimmedUrl}`;
  }
  
  return trimmedUrl;
};

// Phone number validation (international format)
export const isValidPhoneNumber = (phone) => {
  if (!phone || phone.trim() === '') return true; // Allow empty phone
  
  // International phone number regex (supports +country code and various formats)
  const phoneRegex = /^\+?[1-9]\d{1,14}$/;
  
  // Remove all non-digit characters except + for validation
  const cleanPhone = phone.replace(/[^\d+]/g, '');
  
  return phoneRegex.test(cleanPhone) && cleanPhone.length >= 10 && cleanPhone.length <= 15;
};

// Email validation (more robust than default HTML5)
export const isValidEmail = (email) => {
  if (!email || email.trim() === '') return true; // Allow empty email
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email.trim());
};