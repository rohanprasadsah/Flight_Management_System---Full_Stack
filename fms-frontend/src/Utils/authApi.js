export const forceLoginRedirect = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  localStorage.removeItem('role');
  window.location.replace('/login');
};

const handleAuthenticationError = (reason = 'Session expired') => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  localStorage.removeItem('role');
  
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
  window.location.href = '/login';
};

export const authenticatedFetch = async (url, options = {}) => {
  let token = localStorage.getItem('token');
  
  if (!token) {
    throw new Error('No authentication token');
  }
  
  const defaultHeaders = {
    'Content-Type': 'application/json'
  };
  
  defaultHeaders['Authorization'] = `Bearer ${token}`;
  
  const headers = {
    ...defaultHeaders,
    ...(options.headers || {})
  };
  
  try {
    const response = await fetch(url, {
      ...options,
      headers,
      redirect: 'manual'
    });
    
    if (response.status === 302) {
      const locationHeader = response.headers.get('Location');
      if (locationHeader && locationHeader.includes('/FMS/')) {
        return await authenticatedFetch(locationHeader, options);
      } else {
        throw new Error('Unexpected redirect - please try again');
      }
    }
    
    if (response.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.removeItem('role');
      throw new Error('Authentication failed - please login again');
    }
    
    if (response.status === 403) {
      throw new Error('Access denied - insufficient permissions');
    }
    
    return response;
  } catch (error) {
    if (error.name === 'TypeError' && error.message.includes('fetch')) {
      throw new Error('Network error - please check your connection');
    }
    throw error;
  }
};

export const authenticatedFetchJson = async (url, options = {}) => {
  try {
    const response = await authenticatedFetch(url, options);
    
    if (!response.ok) {
      let userMessage = 'Request failed';
      switch (response.status) {
        case 400:
          userMessage = 'Invalid request data';
          break;
        case 401:
          userMessage = 'Authentication required';
          break;
        case 302:
          const locationHeader = response.headers.get('Location');
          if (locationHeader && locationHeader.includes('/FMS/')) {
            return await authenticatedFetchJson(locationHeader, options);
          }
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
      throw new Error(userMessage);
    }
    
    const data = await response.json();
    return data;
    
  } catch (error) {
    if (error.message.includes('Authentication')) {
      throw error;
    }
    
    if (error.name === 'SyntaxError') {
      throw new Error('Invalid response format from server');
    }
    
    throw error;
  }
};

export const isAuthenticated = () => {
  const token = localStorage.getItem('token');
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
    return null;
  }
};

/**
 * Validate if user has required role for flight updates
 * @returns {boolean} - True if user can update flights
 */
export const canUpdateFlights = () => {
  const role = localStorage.getItem('role');
  return role === 'ADMIN' || role === 'STAFF';
};

/**
 * Debug function to log authentication state
 */
export const debugAuthState = () => {
  const token = localStorage.getItem('token');
  if (token) {
  }
};
