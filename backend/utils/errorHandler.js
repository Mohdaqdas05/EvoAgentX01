// Error handling utilities - sanitize sensitive information

const handleError = (error, operation = 'operation') => {
  // Log the full error internally for debugging
  console.error(`Error during ${operation}:`, error.message);
  
  // Return safe error message to client
  const safeMessage = 'An error occurred. Please try again later.';
  return { message: safeMessage, status: 500 };
};

const logSecurityEvent = (event, details) => {
  // Log security-relevant events without exposing sensitive data
  const timestamp = new Date().toISOString();
  console.log(`[SECURITY] ${timestamp} - ${event}`, { ...details, password: '***' });
};

module.exports = { handleError, logSecurityEvent };
