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
import { fetchUserData, clearUserData } from '../redux/actions/authAction';
import { persistor } from '../redux/store';

const AuthContext = createContext({});

const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    function getStorageToken() {
      const tokenStorage = sessionStorage.getItem(CONFIG.TOKEN);
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

      if (response) {
        const { accessToken, userInfo } = response.data;
        sessionStorage.setItem(CONFIG.TOKEN, accessToken);
        setIsLoggedIn(true);
        dispatch(fetchUserData(userInfo));
      }
      setLoading(false);
    } catch (error) {
      throw new Error(`error when trying to login: ${error}`);
    }
  }, []);

  const signOut = useCallback(() => {
    sessionStorage.removeItem(CONFIG.TOKEN);
    persistor.purge();
    dispatch(clearUserData());
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
  const response = await callPostMethod(
    'https://demo5531637.mockable.io/login',
    {
      username,
      password,
    },
  );
  if (response.status === 201) {
    return response;
  }
  console.error('Error authenticating user');
  return null;
};

const getAccessToken = () => {
  return sessionStorage.getItem(CONFIG.TOKEN);
};

export { AuthProvider, useAuth, getAccessToken };
