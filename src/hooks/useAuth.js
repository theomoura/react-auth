import React, {
  createContext,
  useContext,
  useCallback,
  useState,
  useEffect,
} from 'react';

import CONFIG from '../config/localStorage';
import { callPostMethod } from '../middleware/_axios';
import { useDispatch } from 'react-redux';
import { fetchUserData } from '../redux/actions/authAction';

const AuthContext = createContext({});

const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    function getStorageToken() {
      const tokenStorage = localStorage.getItem(CONFIG.TOKEN);
      if (tokenStorage) {
        const tokenStorage = localStorage.getItem(CONFIG.TOKEN);
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

      const { accessToken, userInfo } = response.data;
      localStorage.setItem(CONFIG.TOKEN, accessToken);
      setIsLoggedIn(true);
      setLoading(false);
      dispatch(fetchUserData(userInfo));
    } catch (error) {
      throw new Error(`error when trying to login: ${error}`);
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
    throw new Error('useAuth must be used with AuthProvider');
  }

  return context;
};

const authenticate = async (username, password) => {
  return await callPostMethod('http://demo5531637.mockable.io/login', {
    username,
    password,
  });
};

const getAccessToken = () => {
  return localStorage.getItem(CONFIG.TOKEN);
};

export { AuthProvider, useAuth, getAccessToken };
