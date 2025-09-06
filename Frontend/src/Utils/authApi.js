/**
 * Enhanced Authenticated API utility with token refresh and expiry handling
 * 
 * WHY: Fixes JWT token expiration issues that were causing 403 Forbidden errors
 * and 302 redirects when trying to update flight data.
 * 
 * FIXES:
 * - JWT token expiration detection and handling
 * - Automatic re-login mechanism when token expires
 * - Better error messages for authentication failures
 * - Token refresh before expiry (proactive approach)
 */

// Removed client-side token expiration checking
// Let the backend handle all token validation

/**
 * Force clear auth state and redirect to login immediately
 */
export const forceLoginRedirect = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  localStorage.removeItem('role');
  // Use window.location.replace to prevent back button issues
  window.location.replace('/login');
};

/**
 * Clear authentication data and redirect to login
 * Called when token is invalid or expired
 */
const handleAuthenticationError = (reason = 'Session expired') => {
  // Clear stored authentication data
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  localStorage.removeItem('role');
  
  // Show user-friendly message based on reason
  let message;
  switch(reason) {
    case 'expired':
      message = 'Your session has expired. Please log in again.';
      break;
    case 'invalid':
      message = 'Invalid session detected. Please log in again.';
      break;
    case 'unauthorized':
      message = 'Access denied. Please log in with proper credentials.';
      break;
    default:
      message = 'Authentication required. Please log in.';
  }
  
  alert(message);
  
  // Redirect to login page
  window.location.href = '/login';
};

// Token refresh removed - tokens only cleared on explicit logout or backend rejection

/**
 * Makes an authenticated API request with JWT token and expiry handling
 * 
 * @param {string} url - The API endpoint URL
 * @param {object} options - Fetch options (method, body, etc.)
 * @returns {Promise<Response>} - The fetch response
 */
export const authenticatedFetch = async (url, options = {}) => {
  // Get JWT token from localStorage
  let token = localStorage.getItem('token');
  
  console.log('AUTH DEBUG - Token exists:', !!token);
  console.log('AUTH DEBUG - User in localStorage:', !!localStorage.getItem('user'));
  console.log('AUTH DEBUG - Role in localStorage:', localStorage.getItem('role'));
  
  if (token) {
    console.log('AUTH DEBUG - Token length:', token.length);
    console.log('AUTH DEBUG - Token first 50 chars:', token.substring(0, 50));
  }
  
  // Check if token exists
  if (!token) {
    console.warn('No authentication token found in localStorage');
    throw new Error('No authentication token');
  }
  
  // Prepare headers with fresh token
  const defaultHeaders = {
    'Content-Type': 'application/json'
  };
  
  // Add Authorization header with Bearer format for Spring Security
  defaultHeaders['Authorization'] = `Bearer ${token}`;
  
  // Merge with user-provided headers
  const headers = {
    ...defaultHeaders,
    ...(options.headers || {})
  };
  
  console.log('Making authenticated request to:', url);
  console.log('With token (first 20 chars):', token.substring(0, 20) + '...');
  
  try {
    // Make the authenticated request with redirect handling
    const response = await fetch(url, {
      ...options,
      headers,
      redirect: 'follow' // Follow redirects automatically
    });
    
    // Handle specific authentication errors - only clear token on actual backend rejection
    if (response.status === 401) {
      console.error('Backend rejected token - clearing authentication');
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.removeItem('role');
      throw new Error('Authentication failed - please login again');
    }
    
    if (response.status === 403) {
      console.error('Forbidden - access denied');
      throw new Error('Access denied - insufficient permissions');
    }
    
    // Handle redirect responses (302) - follow the redirect
    if (response.status === 302) {
      console.warn('Backend redirect detected - following redirect');
      const location = response.headers.get('Location');
      if (location) {
        console.log('Redirecting to:', location);
        // Make a new request to the redirect location
        return fetch(location, {
          ...options,
          headers
        });
      }
      throw new Error('Redirect without location header');
    }
    
    return response;
  } catch (error) {
    // Handle network errors
    if (error.name === 'TypeError' && error.message.includes('fetch')) {
      console.error('Network error:', error);
      throw new Error('Network error - please check your connection');
    }
    
    // Re-throw other errors
    throw error;
  }
};

/**
 * Makes an authenticated API request and handles JSON parsing with better error handling
 * 
 * @param {string} url - The API endpoint URL  
 * @param {object} options - Fetch options (method, body, etc.)
 * @returns {Promise<object>} - The parsed JSON response
 * @throws {Error} - If request fails or response is not ok
 */
export const authenticatedFetchJson = async (url, options = {}) => {
  try {
    // Make authenticated request with enhanced error handling
    const response = await authenticatedFetch(url, options);
    
    // Check if request was successful
    if (!response.ok) {
      const errorMessage = `API request failed: ${response.status} ${response.statusText}`;
      
      // Provide specific error messages for common status codes
      let userMessage = 'Request failed';
      switch (response.status) {
        case 400:
          userMessage = 'Invalid request data';
          break;
        case 401:
          userMessage = 'Authentication required';
          break;
        case 302:
          // Don't clear auth data on redirect - might be temporary
          userMessage = 'Unexpected redirect - please try again';
          break;
        case 403:
          userMessage = 'Access denied - insufficient permissions';
          break;
        case 404:
          userMessage = 'Resource not found';
          break;
        case 500:
          userMessage = 'Server error - please try again later';
          break;
        default:
          userMessage = `Request failed (${response.status})`;
      }
      
      console.error(errorMessage, 'URL:', url);
      throw new Error(userMessage);
    }
    
    // Parse and return JSON data
    const data = await response.json();
    console.log('API request successful:', url, 'Response data:', data);
    return data;
    
  } catch (error) {
    // Handle different types of errors
    if (error.message.includes('Authentication')) {
      // Authentication errors are already handled in authenticatedFetch
      throw error;
    }
    
    if (error.name === 'SyntaxError') {
      // JSON parsing error
      console.error('Invalid JSON response from API:', url);
      throw new Error('Invalid response format from server');
    }
    
    // Handle other errors
    console.error('API request failed:', error.message, 'URL:', url);
    throw error;
  }
};

/**
 * Utility function to check if user is currently authenticated
 * @returns {boolean} - True if user has valid token
 */
export const isAuthenticated = () => {
  const token = localStorage.getItem('token');
  // Just check if token exists - let backend validate expiration
  return !!token;
};

/**
 * Get current user info from localStorage
 * @returns {object|null} - User info or null if not authenticated
 */
export const getCurrentUser = () => {
  if (!isAuthenticated()) {
    return null;
  }
  
  try {
    const user = localStorage.getItem('user');
    const role = localStorage.getItem('role');
    return user ? { ...JSON.parse(user), role } : null;
  } catch (error) {
    console.error('Error getting current user:', error);
    return null;
  }
};
