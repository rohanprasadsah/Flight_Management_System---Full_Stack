/**
 * Enhanced Authentication Utilities
 * 
 * Provides consistent authentication state checking and debugging
 */

/**
 * Get complete authentication state for debugging
 * @returns {object} Complete auth state information
 */
export const getAuthState = () => {
  const token = localStorage.getItem('token');
  const user = localStorage.getItem('user');
  const role = localStorage.getItem('role');

  let parsedUser = null;
  try {
    parsedUser = user ? JSON.parse(user) : null;
  } catch (error) {
  }

  return {
    hasToken: !!token,
    hasUser: !!user,
    hasRole: !!role,
    parsedUser,
    role,
    isComplete: !!(token && user && role),
    debug: {
      tokenLength: token ? token.length : 0,
      tokenPrefix: token ? token.substring(0, 20) + '...' : null,
      userEmail: parsedUser?.email || null,
      userName: parsedUser?.name || null,
      userRole: parsedUser?.role || null,
      roleInStorage: role
    }
  };
};

/**
 * Check if user is fully authenticated with all required data
 * @returns {boolean} True if fully authenticated
 */
export const isFullyAuthenticated = () => {
  const state = getAuthState();
  return state.isComplete;
};

/**
 * Debug authentication state to console
 */
export const debugAuthState = () => {
  const state = getAuthState();
  console.group('🔐 Authentication State Debug');
  console.groupEnd();

  return state;
};

/**
 * Repair authentication session if possible
 * @returns {boolean} True if repair was attempted
 */
export const repairAuthSession = () => {
  const state = getAuthState();
  if (state.hasToken && state.hasUser && !state.hasRole && state.parsedUser?.role) {
    localStorage.setItem('role', state.parsedUser.role);
    return true;
  }

  return false;
};
