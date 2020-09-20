import React, {
  createContext,
  useContext,
  useCallback,
  useState,
  useEffect,
} from 'react';

import CONFIG from '../config/localStorage';
import { callPostMethod } from '../middleware/_axios';

const AuthContext = createContext({});

const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    function getStorageToken() {
      const tokenStorage = localStorage.getItem(CONFIG.TOKEN);
      if (tokenStorage) {
        setIsLoggedIn(true);
      }
      setLoading(false);
    }
    getStorageToken();
  }, []);

  const signIn = useCallback(async ({ username, password }) => {
    try {
      setLoading(true);
      const response = await authenticate(username, password);

      const { accessToken } = response.data;
      localStorage.setItem(CONFIG.TOKEN, accessToken);
      setIsLoggedIn(true);
      setLoading(false);
    } catch (error) {
      console.error('error trying to login', error);
    }
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem(CONFIG.TOKEN);
    setIsLoggedIn(false);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        loading,
        isLoggedIn,
        signIn,
        signOut,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth deve ser usado com AuthProvider');
  }

  return context;
};

const authenticate = async (username, password) => {
  return await callPostMethod('http://demo5531637.mockable.io/login', {
    username,
    password,
  });
};

export { AuthProvider, useAuth };
