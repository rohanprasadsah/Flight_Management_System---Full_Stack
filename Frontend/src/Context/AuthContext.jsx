import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    
    if (storedUser && token) {
      try {
        const parsedUser = JSON.parse(storedUser);
        if (role && !parsedUser.role) {
          parsedUser.role = role;
        }
        setUser(parsedUser);
        setIsLoggedIn(true);
      } catch (error) {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        setUser(null);
        setIsLoggedIn(false);
      }
    } else {
      setUser(null);
      setIsLoggedIn(false);
    }
  }, []);

  const login = (userData, token) => {
    setUser(userData);
    setIsLoggedIn(true);
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('token', token);
    localStorage.setItem('role', userData.role);
  };

  const logout = () => {
    setUser(null);
    setIsLoggedIn(false);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('role');
  };

  const value = {
    user,
    isLoggedIn,
    login,
    logout
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
