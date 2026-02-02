import axios, { AxiosError, type InternalAxiosRequestConfig } from 'axios';

const api = axios.create({
  baseURL: '/api/v1',
  timeout: 30000,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

const AUTH_ENDPOINTS = ['/auth/login', '/auth/forgot-password', '/auth/reset-password'];

let isRefreshing = false;
let failedQueue: Array<{
  resolve: (value?: unknown) => void;
  reject: (reason?: unknown) => void;
}> = [];

const processQueue = (error: AxiosError | null, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });

  failedQueue = [];
};

const getAuthState = () => {
  try {
    const authData = localStorage.getItem('auth');
    if (authData) {
      return JSON.parse(authData);
    }
  } catch (error) {
    console.error('Error reading auth state:', error);
  }
  return null;
};

const updateAuthState = (updates: {
  accessToken?: string | null;
  role?: string | null;
  isAuthenticated?: boolean;
}) => {
  try {
    const currentAuth = getAuthState() || {
      isAuthenticated: false,
      isLoading: false,
      accessToken: null,
      role: null,
    };

    const updatedAuth = {
      ...currentAuth,
      ...updates,
      isLoading: false,
    };

    localStorage.setItem('auth', JSON.stringify(updatedAuth));
  } catch (error) {
    console.error('Error updating auth state:', error);
  }
};

const clearAuthState = (): void => {
  try {
    const clearedAuth = {
      isAuthenticated: false,
      isLoading: false,
      accessToken: null,
      role: null,
    };
    localStorage.setItem('auth', JSON.stringify(clearedAuth));
  } catch (error) {
    console.error('Error clearing auth state:', error);
  }
};

const isAuthEndpoint = (url: string | undefined): boolean => {
  if (!url) return false;
  return AUTH_ENDPOINTS.some((endpoint) => url.includes(endpoint));
};

api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    if (!isAuthEndpoint(config.url)) {
      const authState = getAuthState();
      const token = authState?.accessToken;
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response.data;
  },
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };

    if (!originalRequest) {
      return Promise.reject(error);
    }

    if (error.response?.status === 401 && !originalRequest._retry && !isAuthEndpoint(originalRequest.url)) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            if (originalRequest.headers) {
              originalRequest.headers.Authorization = `Bearer ${token}`;
            }
            return api(originalRequest);
          })
          .catch((err) => {
            return Promise.reject(err);
          });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const response = await axios.post(`/api/v1/auth/refresh-token`, {}, {
          withCredentials: true,
        });

        const { accessToken, role } = response.data.data;

        updateAuthState({
          accessToken,
          role,
          isAuthenticated: true,
        });

        if (originalRequest.headers) {
          originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        }

        processQueue(null, accessToken);
        isRefreshing = false;

        return api(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError as AxiosError, null);
        isRefreshing = false;
        clearAuthState();
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }

    if (error.response?.status === 403) {
      console.error('Access forbidden');
    }

    return Promise.reject(error);
  }
);

export const setAuthTokens = (accessToken: string, role: string) => {
  updateAuthState({
    accessToken,
    role,
    isAuthenticated: true,
  });
};

export const logout = () => {
  clearAuthState();
  window.location.href = '/login';
};

export default api;
