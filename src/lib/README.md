# Axios Configuration

Centralized axios instance with automatic token management, Jotai state sync, and refresh logic.

## Features

### 1. Automatic Access Token Injection
- Automatically adds `Authorization: Bearer <token>` header to all requests
- **Excludes auth endpoints** (login, forgot-password, reset-password)
- Token retrieved from Jotai authAtom (synced with localStorage)

### 2. Automatic Token Refresh
- Intercepts 401 (Unauthorized) responses
- Automatically calls refresh token endpoint with httpOnly cookies
- Retries failed requests with new token
- Queues multiple failed requests during refresh
- Syncs new tokens with Jotai authAtom

### 3. Token Storage
- **Access token**: Stored in localStorage via Jotai authAtom
- **Refresh token**: Stored in httpOnly cookies (managed by backend)
- **User role**: Stored in Jotai authAtom
- **Auth state**: Synced across all components using Jotai

### 4. Error Handling
- 401: Triggers token refresh
- 403: Logs access forbidden
- Failed refresh: Clears auth state and redirects to login

## Usage

### Basic API Call

```typescript
import axiosInstance from '../lib/axios';

const getMatches = async () => {
  const response = await axiosInstance.get('/matches');
  return response.data;
};

const createMatch = async (data) => {
  const response = await axiosInstance.post('/matches', data);
  return response.data;
};
```

### Using Auth Hook

```typescript
import { useAuth } from '../hooks/useAuth';

function MyComponent() {
  const { auth, login, logout, isAuthenticated, role } = useAuth();

  const handleLogin = async () => {
    const response = await authService.login(mobile, password);
    login(response.accessToken, response.role);
  };

  return (
    <div>
      {isAuthenticated ? (
        <div>
          <p>Role: {role}</p>
          <button onClick={logout}>Logout</button>
        </div>
      ) : (
        <button onClick={handleLogin}>Login</button>
      )}
    </div>
  );
}
```

### Login (Sets Tokens)

```typescript
import { setAuthTokens } from '../lib/axios';

const login = async (mobileNumber: string, password: string) => {
  const response = await axiosInstance.post('/auth/login', {
    mobileNumber,
    password,
  });

  const { accessToken, role } = response.data;
  setAuthTokens(accessToken, role);
};
```

### Logout (Clears Auth State)

```typescript
import { logout } from '../lib/axios';

const handleLogout = () => {
  logout();
};
```

## Configuration

### Base URL
Set in environment variable:
```env
VITE_API_BASE_URL=http://localhost:3000/api
```

### Timeout
Default: 30 seconds (30000ms)

### Credentials
`withCredentials: true` - Sends httpOnly cookies with every request

### Auth Endpoints (No Token)
- `/auth/login`
- `/auth/forgot-password`
- `/auth/reset-password`

These endpoints don't include the Authorization header.

## Token Refresh Flow

1. **Request fails with 401**
2. **Check if already refreshing**
   - If yes: Queue the request
   - If no: Start refresh process
3. **Call refresh token endpoint**
   - Endpoint: `POST /auth/refresh-token`
   - Refresh token sent via httpOnly cookies
4. **On success:**
   - Save new access token to authAtom
   - Update role in authAtom
   - Retry original request
   - Process queued requests
5. **On failure:**
   - Clear auth state
   - Redirect to login page

## Jotai Auth State

Auth state structure stored in localStorage:

```typescript
interface IAuthAtom {
  isAuthenticated: boolean;
  isLoading: boolean;
  accessToken: string | null;
  role: string | null;
}
```

### Auth Hook Methods

```typescript
const {
  auth,              // Full auth state
  login,             // Set authenticated state
  logout,            // Clear auth state
  setLoading,        // Update loading state
  isAuthenticated,   // Boolean shortcut
  isLoading,         // Boolean shortcut
  accessToken,       // Token shortcut
  role,              // Role shortcut
} = useAuth();
```

## Request Queue

When multiple requests fail with 401 simultaneously:
- First request triggers refresh
- Other requests are queued
- All queued requests retry after refresh completes

## Error Handling

```typescript
try {
  const response = await axiosInstance.get('/matches');
  return response.data;
} catch (error) {
  if (axios.isAxiosError(error)) {
    if (error.response?.status === 401) {
      // Token refresh handles this automatically
    } else if (error.response?.status === 403) {
      console.error('Access forbidden');
    } else if (error.response?.status === 404) {
      console.error('Resource not found');
    } else {
      console.error(error.response?.data?.message);
    }
  }
}
```

## TypeScript Types

```typescript
import { AxiosResponse } from 'axios';

interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

const getMatches = async (): Promise<Match[]> => {
  const response = await axiosInstance.get<ApiResponse<Match[]>>('/matches');
  return response.data.data;
};
```

## Interceptors

### Request Interceptor
- Adds Authorization header (except auth endpoints)
- Retrieves token from Jotai authAtom

### Response Interceptor
- Handles successful responses
- Intercepts 401 errors
- Triggers token refresh
- Syncs new tokens with authAtom
- Retries failed requests

## Storage

- **localStorage**: Auth state via Jotai atomWithStorage
- **httpOnly cookies**: Refresh token (secure, not accessible via JS)

## Security Notes

1. **Refresh token in httpOnly cookies**: Prevents XSS attacks
2. **Access token in localStorage**: Synced with Jotai for reactivity
3. **Token expiry**: Access tokens should have short expiry (15-30 minutes)
4. **Refresh tokens**: Should have longer expiry (7-30 days)
5. **HTTPS**: Always use HTTPS in production
6. **withCredentials**: Enabled to send cookies with requests

## Example Service

```typescript
import axiosInstance from '../lib/axios';

export const matchService = {
  getAll: async () => {
    const response = await axiosInstance.get('/matches');
    return response.data;
  },

  getById: async (id: string) => {
    const response = await axiosInstance.get(`/matches/${id}`);
    return response.data;
  },

  create: async (data: CreateMatchDto) => {
    const response = await axiosInstance.post('/matches', data);
    return response.data;
  },
};
```

## Troubleshooting

### Token not being sent
- Check if endpoint is in AUTH_ENDPOINTS list
- Verify token exists in authAtom
- Check browser console for errors

### Infinite refresh loop
- Verify refresh token endpoint returns valid tokens
- Check token expiry times
- Ensure refresh token cookie is valid

### Auth state not syncing
- Check localStorage for 'auth' key
- Verify Jotai provider wraps your app
- Check browser console for errors

## Environment Variables

```env
# .env.development
VITE_API_BASE_URL=http://localhost:3000/api

# .env.production
VITE_API_BASE_URL=https://api.yourdomain.com
```
