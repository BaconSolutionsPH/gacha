# User Store

This directory contains the user store implementation using Zustand for state management.

## Files

- `user-store.ts` - Main store implementation with user state and actions
- `index.ts` - Export file for clean imports

## Features

- **Persistent State**: User data is persisted to localStorage
- **Authentication State**: Tracks if user is authenticated
- **Loading States**: Manages loading states for API calls
- **Error Handling**: Centralized error state management
- **Auto-fetch**: Automatically fetches user data when token is available

## Usage

### Using the Store Directly

```typescript
import { useUserStore } from '@/lib/store/user-store'

const MyComponent = () => {
  const { user, isLoading, error, fetchUser, clearUser } = useUserStore()

  // Your component logic
}
```

### Using the Hook

```typescript
import { useUser } from '@/hooks/auth-hooks'

const MyComponent = () => {
  const { user, isLoading, error, isAuthenticated, refetch } = useUser()

  // Your component logic
}
```

## Store Actions

- `setUser(user)` - Set user data
- `setLoading(loading)` - Set loading state
- `setError(error)` - Set error state
- `setAuthToken(token)` - Set authentication token (automatically persisted)
- `fetchUser(token?)` - Fetch user data from `/auth/me` endpoint (uses stored token if none provided)
- `clearUser()` - Clear user data, token, and reset state
- `reset()` - Reset to initial state

## Store State

- `user` - Current user data (null if not authenticated)
- `isLoading` - Loading state for API calls
- `error` - Error message if any
- `isAuthenticated` - Boolean indicating if user is authenticated
- `authToken` - Current authentication token (persisted)

## Integration with Auth

The store integrates seamlessly with the existing auth system:

1. When a user logs in, the token is stored in localStorage
2. The store automatically fetches user data using the token
3. When a user logs out, the store is cleared
4. The store persists user data across browser sessions
