import Axios from 'axios';
import { getAccessToken } from '../hooks/useAuth';

export const callGetMethod = (endpoint, signOut = () => {}, header = null) => {
  const headers = header || process.env.HEADERS;
  return Axios.get(`${endpoint}`, { headers })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.error('erro no callGetMethod', error);
      return handleError(error, signOut);
    });
};

export const callPostMethod = (
  endpoint,
  body,
  signOut = () => {},
  header = null,
) => {
  const headers = header || process.env.HEADERS;
  return Axios.post(`${endpoint}`, body, { headers })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.error('erro no callPostMethod', error);
      return handleError(error, signOut);
    });
};

export const callDeleteMethod = (
  endpoint,
  body,
  signOut = () => {},
  header = null,
) => {
  const headers = header || process.env.HEADERS;
  return Axios.delete(`${endpoint}`, {
    data: body,
    headers: headers,
  })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.error('erro no callDeleteMethod', error);
      return handleError(error, signOut);
    });
};

export const callPutMethod = (
  endpoint,
  body,
  signOut = () => {},
  header = null,
) => {
  const headers = header || process.env.HEADERS;
  return Axios.put(`${endpoint}`, body, { headers })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.error('erro no callPatchMethod', error);
      return handleError(error, signOut);
    });
};

const handleError = (error, signOut) => {
  if (error.response.status === 401) {
    console.error('Token expired, redirecting user to login');
    signOut();
  }
  return error.response;
};

Axios.interceptors.request.use(async (config) => {
  const token = getAccessToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
