# Authentication System

Complete authentication system with Jotai state management, axios interceptors, and automatic token refresh.

## Architecture

### Components

1. **Jotai Auth Atom** (`src/atom/auth.ts`)
   - Stores auth state in localStorage
   - Syncs across all components
   - Structure: `{ isAuthenticated, isLoading, accessToken, role }`

2. **Axios Instance** (`src/lib/axios.ts`)
   - Automatic token injection
   - Token refresh on 401 errors
   - Request queuing during refresh
   - Syncs with Jotai authAtom

3. **Auth Hook** (`src/hooks/useAuth.ts`)
   - Simple interface for auth operations
   - Methods: `login()`, `logout()`, `setLoading()`
   - Shortcuts: `isAuthenticated`, `role`, `accessToken`

4. **Auth Service** (`src/services/auth.service.ts`)
   - API calls for login, logout, forgot password, etc.
   - Uses axios instance

## Token Storage

### Access Token
- **Location**: localStorage via Jotai authAtom
- **Purpose**: Authenticate API requests
- **Expiry**: Short-lived (15-30 minutes)
- **Format**: JWT Bearer token

### Refresh Token
- **Location**: httpOnly cookies (set by backend)
- **Purpose**: Get new access tokens
- **Expiry**: Long-lived (7-30 days)
- **Security**: Not accessible via JavaScript

## Authentication Flow

### 1. Login

```typescript
// User submits login form
const response = await authService.login(mobile, password);

// Backend returns:
// - accessToken (in response body)
// - refreshToken (in httpOnly cookie)
// - user info and role

// Frontend stores access token in authAtom
login(response.accessToken, response.user.role);

// Navigate to home
navigate('/');
```

### 2. Making API Requests

```typescript
// Axios automatically adds Authorization header
const matches = await axiosInstance.get('/matches');

// Request headers:
// Authorization: Bearer eyJhbGc...
// Cookie: refreshToken=xyz... (sent automatically)
```

### 3. Token Refresh (Automatic)

```typescript
// When access token expires:
// 1. Request fails with 401
// 2. Axios intercepts the error
// 3. Calls /auth/refresh-token with cookies
// 4. Backend validates refresh token from cookie
// 5. Returns new access token
// 6. Axios updates authAtom
// 7. Retries original request
// 8. User doesn't notice anything
```

### 4. Logout

```typescript
// User clicks logout
logout();

// This:
// 1. Clears authAtom (localStorage)
// 2. Redirects to /login
// 3. Backend should clear refresh token cookie
```

## Implementation Examples

### Protected Route

```typescript
import { useAuth } from './hooks/useAuth';
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children }) {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <CircularProgress />;
  }

  return isAuthenticated ? children : <Navigate to="/login" />;
}

// Usage in routes
<Route path="/" element={
  <ProtectedRoute>
    <HomePage />
  </ProtectedRoute>
} />
```

### Role-Based Access

```typescript
import { useAuth } from './hooks/useAuth';

function AdminDashboard() {
  const { role } = useAuth();

  if (role !== 'admin' && role !== 'super-admin') {
    return <Navigate to="/" />;
  }

  return <div>Admin Dashboard</div>;
}
```

### Login Form

```typescript
import { useAuth } from './hooks/useAuth';
import { authService } from './services/auth.service';

function LoginForm() {
  const { login, setLoading, isLoading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    try {
      setLoading(true);
      const response = await authService.login(
        values.mobileNumber,
        values.password
      );
      login(response.accessToken, response.user.role);
      navigate('/');
    } catch (error) {
      console.error('Login failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return <form onSubmit={handleSubmit}>...</form>;
}
```

### Logout Button

```typescript
import { useAuth } from './hooks/useAuth';

function LogoutButton() {
  const { logout } = useAuth();

  return (
    <Button onClick={logout}>
      Logout
    </Button>
  );
}
```

### API Service

```typescript
import axiosInstance from './lib/axios';

export const matchService = {
  getAll: async () => {
    const response = await axiosInstance.get('/matches');
    return response.data;
  },

  getById: async (id: string) => {
    const response = await axiosInstance.get(`/matches/${id}`);
    return response.data;
  },

  create: async (data) => {
    const response = await axiosInstance.post('/matches', data);
    return response.data;
  },
};
```

## Security Best Practices

### Frontend

1. **Access token in localStorage**: Acceptable for SPAs with proper XSS protection
2. **Refresh token in httpOnly cookies**: Prevents XSS attacks
3. **withCredentials: true**: Sends cookies with requests
4. **Short access token expiry**: Limits damage if token is stolen
5. **Automatic token refresh**: Seamless user experience

### Backend Requirements

1. **Set httpOnly cookies**: `Set-Cookie: refreshToken=...; HttpOnly; Secure; SameSite=Strict`
2. **Validate refresh tokens**: Check expiry, signature, and revocation
3. **CORS configuration**: Allow credentials from frontend domain
4. **HTTPS only**: Never send tokens over HTTP
5. **Token rotation**: Issue new refresh token on each refresh

## Troubleshooting

### Token not being sent
- Check if axios instance is used (not plain axios)
- Verify token exists in authAtom
- Check if endpoint is in AUTH_ENDPOINTS exclusion list

### Infinite refresh loop
- Verify refresh token endpoint returns valid tokens
- Check token expiry times
- Ensure refresh token cookie is valid

### CORS errors
- Backend must allow credentials: `Access-Control-Allow-Credentials: true`
- Backend must specify origin: `Access-Control-Allow-Origin: https://yourdomain.com`
- Cannot use wildcard (*) with credentials

### Auth state not persisting
- Check if localStorage is enabled
- Verify Jotai provider wraps app
- Check browser console for errors

### Logout not clearing cookies
- Backend must clear cookie: `Set-Cookie: refreshToken=; Max-Age=0`
- Frontend can only clear localStorage

## Testing

### Manual Testing

1. **Login**: Verify token stored in authAtom
2. **API Request**: Check Authorization header in Network tab
3. **Token Expiry**: Wait for expiry, verify auto-refresh
4. **Logout**: Verify authAtom cleared and redirect

### Browser DevTools

```javascript
// Check auth state
localStorage.getItem('auth')

// Check cookies
document.cookie

// Clear auth state
localStorage.removeItem('auth')
```

## Environment Variables

```env
# .env.development
VITE_API_BASE_URL=http://localhost:3000/api/v1

# .env.production
VITE_API_BASE_URL=https://api.yourdomain.com/api/v1
```

## File Structure

```
src/
├── atom/
│   └── auth.ts              # Jotai auth atom
├── hooks/
│   └── useAuth.ts           # Auth hook
├── lib/
│   ├── axios.ts             # Axios instance with interceptors
│   └── README.md            # Axios documentation
├── services/
│   └── auth.service.ts      # Auth API calls
├── types/
│   └── api.types.ts         # TypeScript types
└── pages/
    └── Login/
        └── hook/
            └── useLoginForm.tsx  # Login form logic
```

## Summary

This authentication system provides:
- ✅ Secure token storage (httpOnly cookies for refresh token)
- ✅ Automatic token refresh (seamless UX)
- ✅ Request queuing (no duplicate refresh calls)
- ✅ State management (Jotai with localStorage)
- ✅ Type safety (TypeScript)
- ✅ Simple API (useAuth hook)
- ✅ Production ready (security best practices)
