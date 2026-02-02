# Auth Hook

Custom React hook for managing authentication state using Jotai.

## Overview

The `useAuth` hook provides a simple interface to manage authentication state across your application. It uses Jotai's `atomWithStorage` to persist auth state in localStorage and keep it synced across all components.

## Features

- Centralized auth state management
- Automatic localStorage persistence
- Reactive updates across all components
- Type-safe auth operations
- Simple login/logout methods

## Usage

### Basic Usage

```typescript
import { useAuth } from '../hooks/useAuth';

function MyComponent() {
  const { isAuthenticated, role, logout } = useAuth();

  if (!isAuthenticated) {
    return <div>Please login</div>;
  }

  return (
    <div>
      <p>Welcome! Your role: {role}</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
}
```

### Login Flow

```typescript
import { useAuth } from '../hooks/useAuth';
import { authService } from '../services/auth.service';

function LoginForm() {
  const { login, setLoading } = useAuth();

  const handleLogin = async (mobileNumber: string, password: string) => {
    try {
      setLoading(true);
      const response = await authService.login(mobileNumber, password);
      login(response.accessToken, response.role || response.user.role);
      navigate('/');
    } catch (error) {
      console.error('Login failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return <form onSubmit={handleLogin}>...</form>;
}
```

### Protected Routes

```typescript
import { useAuth } from '../hooks/useAuth';
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children }) {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return children;
}
```

### Role-Based Access

```typescript
import { useAuth } from '../hooks/useAuth';

function AdminPanel() {
  const { role } = useAuth();

  if (role !== 'admin' && role !== 'super-admin') {
    return <div>Access denied</div>;
  }

  return <div>Admin Panel</div>;
}
```

## API Reference

### Return Values

```typescript
{
  auth: IAuthAtom;              // Full auth state object
  login: (token, role) => void; // Set authenticated state
  logout: () => void;           // Clear auth state and redirect
  setLoading: (bool) => void;   // Update loading state
  isAuthenticated: boolean;     // Shortcut for auth.isAuthenticated
  isLoading: boolean;           // Shortcut for auth.isLoading
  accessToken: string | null;   // Shortcut for auth.accessToken
  role: string | null;          // Shortcut for auth.role
}
```

### Auth State Structure

```typescript
interface IAuthAtom {
  isAuthenticated: boolean;
  isLoading: boolean;
  accessToken: string | null;
  role: string | null;
}
```

## Methods

### login(accessToken, role)

Sets the user as authenticated and stores the access token and role.

```typescript
const { login } = useAuth();
login('eyJhbGc...', 'player');
```

### logout()

Clears the auth state and redirects to the login page.

```typescript
const { logout } = useAuth();
logout();
```

### setLoading(isLoading)

Updates the loading state (useful during async operations).

```typescript
const { setLoading } = useAuth();
setLoading(true);
// ... perform async operation
setLoading(false);
```

## Integration with Axios

The auth hook works seamlessly with the axios instance:

1. **Login**: Call `login()` after successful authentication
2. **Requests**: Axios automatically reads token from authAtom
3. **Token Refresh**: Axios updates authAtom when token is refreshed
4. **Logout**: Call `logout()` to clear state and redirect

## Storage

Auth state is stored in localStorage under the key `'auth'`:

```json
{
  "isAuthenticated": true,
  "isLoading": false,
  "accessToken": "eyJhbGc...",
  "role": "player"
}
```

## Best Practices

1. **Always use the hook**: Don't access localStorage directly
2. **Check isLoading**: Show loading states during auth operations
3. **Handle errors**: Wrap auth operations in try-catch blocks
4. **Use shortcuts**: Use `isAuthenticated` instead of `auth.isAuthenticated`
5. **Protect routes**: Use auth state to guard protected routes

## Example: Complete Login Component

```typescript
import { useAuth } from '../hooks/useAuth';
import { authService } from '../services/auth.service';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  const { login, setLoading, isLoading } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const mobile = formData.get('mobile');
    const password = formData.get('password');

    try {
      setError('');
      setLoading(true);
      const response = await authService.login(mobile, password);
      login(response.accessToken, response.user.role);
      navigate('/');
    } catch (err) {
      setError('Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="mobile" type="tel" required />
      <input name="password" type="password" required />
      {error && <p>{error}</p>}
      <button type="submit" disabled={isLoading}>
        {isLoading ? 'Logging in...' : 'Login'}
      </button>
    </form>
  );
}
```

## Troubleshooting

### Auth state not persisting
- Check if localStorage is enabled in browser
- Verify Jotai provider wraps your app
- Check browser console for errors

### Token not being sent with requests
- Ensure axios instance is configured correctly
- Verify token exists in authAtom
- Check if endpoint is excluded from auth

### Logout not working
- Check if logout function is called correctly
- Verify redirect URL is correct
- Check browser console for navigation errors
