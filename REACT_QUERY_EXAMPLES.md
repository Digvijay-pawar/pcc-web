# React Query Examples

Practical examples of using React Query in the PCC Web application.

## Installation

```bash
npm install @tanstack/react-query
npm install -D @tanstack/react-query-devtools
```

## Setup Complete ✅

- QueryClient configured in `src/lib/query.client.ts`
- QueryClientProvider added to `src/App.tsx`
- React Query Devtools enabled in development

## Example 1: Login with React Query

### Using the Hook

```typescript
import { useLogin } from '../services/auth/auth.queries';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

function LoginForm() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { mutate: loginMutation, isPending, isError, error } = useLogin();

  const handleSubmit = (values: { mobileNumber: string; password: string }) => {
    loginMutation(values, {
      onSuccess: (data) => {
        login(data.accessToken, data.user.role);
        navigate('/');
      },
      onError: (error) => {
        console.error('Login failed:', error);
      },
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* form fields */}
      <button type="submit" disabled={isPending}>
        {isPending ? 'Logging in...' : 'Login'}
      </button>
      {isError && <Alert severity="error">{error.message}</Alert>}
    </form>
  );
}
```

## Example 2: Fetch and Display Matches

### Using the Hook

```typescript
import { useMatches } from '../services/match/match.queries';
import { CircularProgress, Alert } from '@mui/material';

function MatchList() {
  const { data: matches, isLoading, isError, error } = useMatches();

  if (isLoading) {
    return <CircularProgress />;
  }

  if (isError) {
    return <Alert severity="error">{error.message}</Alert>;
  }

  return (
    <div>
      {matches?.map((match) => (
        <MatchCard key={match.id} match={match} />
      ))}
    </div>
  );
}
```

## Example 3: Fetch Match with Filters

```typescript
import { useMatches } from '../services/match/match.queries';
import { useState } from 'react';

function FilteredMatchList() {
  const [filters, setFilters] = useState({
    city: 'Mumbai',
    date: 'upcoming',
  });

  const { data: matches, isLoading, isFetching } = useMatches(filters);

  return (
    <div>
      {isFetching && <LinearProgress />}
      
      <FilterBar filters={filters} onChange={setFilters} />
      
      {isLoading ? (
        <CircularProgress />
      ) : (
        <div>
          {matches?.map((match) => (
            <MatchCard key={match.id} match={match} />
          ))}
        </div>
      )}
    </div>
  );
}
```

## Example 4: Fetch Single Match Detail

```typescript
import { useMatch } from '../services/match/match.queries';
import { useParams } from 'react-router-dom';

function MatchDetailPage() {
  const { matchId } = useParams();
  const { data: match, isLoading, isError } = useMatch(matchId!);

  if (isLoading) return <CircularProgress />;
  if (isError) return <Alert severity="error">Match not found</Alert>;

  return (
    <div>
      <h1>{match?.title}</h1>
      <p>{match?.description}</p>
      <p>Date: {match?.date}</p>
      <p>Time: {match?.time}</p>
      <p>Venue: {match?.venue}</p>
      <p>Players: {match?.joinedPlayers}/{match?.maxPlayers}</p>
    </div>
  );
}
```

## Example 5: Create Booking

```typescript
import { useCreateBooking } from '../services/booking/booking.queries';
import { useNavigate } from 'react-router-dom';

function BookingForm({ matchId }: { matchId: string }) {
  const navigate = useNavigate();
  const { mutate: createBooking, isPending } = useCreateBooking();

  const handleSubmit = (values: any) => {
    createBooking(
      {
        matchId,
        ...values,
      },
      {
        onSuccess: (booking) => {
          navigate(`/booking-confirmation/${booking.id}`);
        },
        onError: (error) => {
          alert('Booking failed: ' + error.message);
        },
      }
    );
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* form fields */}
      <button type="submit" disabled={isPending}>
        {isPending ? 'Processing...' : 'Complete Payment'}
      </button>
    </form>
  );
}
```

## Example 6: Update Player Profile

```typescript
import { useUpdatePlayer } from '../services/player/player.queries';
import { useAuth } from '../hooks/useAuth';

function EditProfileForm() {
  const { auth } = useAuth();
  const { mutate: updatePlayer, isPending } = useUpdatePlayer();

  const handleSubmit = (values: any) => {
    updatePlayer(
      {
        id: auth.userId,
        ...values,
      },
      {
        onSuccess: () => {
          alert('Profile updated successfully!');
        },
      }
    );
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* form fields */}
      <button type="submit" disabled={isPending}>
        {isPending ? 'Saving...' : 'Save Changes'}
      </button>
    </form>
  );
}
```

## Example 7: Dependent Queries

```typescript
import { usePlayer, usePlayerMatches } from '../services/player/player.queries';

function PlayerProfile({ playerId }: { playerId: string }) {
  // First query
  const { data: player, isLoading: playerLoading } = usePlayer(playerId);

  // Second query depends on first
  const { data: matches, isLoading: matchesLoading } = usePlayerMatches(
    player?.id || '',
    {
      enabled: !!player?.id, // Only fetch if player exists
    }
  );

  if (playerLoading) return <CircularProgress />;

  return (
    <div>
      <h1>{player?.name}</h1>
      
      <h2>Match History</h2>
      {matchesLoading ? (
        <CircularProgress />
      ) : (
        <div>
          {matches?.map((match) => (
            <MatchCard key={match.id} match={match} />
          ))}
        </div>
      )}
    </div>
  );
}
```

## Example 8: Optimistic Updates

```typescript
import { useUpdateMatch } from '../services/match/match.queries';
import { useQueryClient } from '@tanstack/react-query';

function MatchEditor({ matchId }: { matchId: string }) {
  const queryClient = useQueryClient();
  const { mutate: updateMatch } = useUpdateMatch();

  const handleUpdate = (updates: any) => {
    updateMatch(
      {
        id: matchId,
        ...updates,
      },
      {
        onMutate: async (updatedMatch) => {
          // Cancel outgoing refetches
          await queryClient.cancelQueries({ queryKey: ['match', matchId] });

          // Snapshot previous value
          const previousMatch = queryClient.getQueryData(['match', matchId]);

          // Optimistically update
          queryClient.setQueryData(['match', matchId], (old: any) => ({
            ...old,
            ...updatedMatch,
          }));

          return { previousMatch };
        },
        onError: (err, updatedMatch, context) => {
          // Rollback on error
          queryClient.setQueryData(['match', matchId], context?.previousMatch);
        },
        onSettled: () => {
          // Refetch after error or success
          queryClient.invalidateQueries({ queryKey: ['match', matchId] });
        },
      }
    );
  };

  return <form onSubmit={handleUpdate}>{/* form fields */}</form>;
}
```

## Example 9: Manual Refetch

```typescript
import { useMatches } from '../services/match/match.queries';

function MatchList() {
  const { data: matches, refetch, isFetching } = useMatches();

  return (
    <div>
      <button onClick={() => refetch()} disabled={isFetching}>
        {isFetching ? 'Refreshing...' : 'Refresh Matches'}
      </button>
      
      {matches?.map((match) => (
        <MatchCard key={match.id} match={match} />
      ))}
    </div>
  );
}
```

## Example 10: Polling (Live Updates)

```typescript
import { useMatch } from '../services/match/match.queries';

function LiveMatchScore({ matchId }: { matchId: string }) {
  const { data: match } = useMatch(matchId, {
    refetchInterval: 5000, // Refetch every 5 seconds
    refetchIntervalInBackground: true, // Continue polling in background
  });

  return (
    <div>
      <h1>{match?.title}</h1>
      <p>Score: {match?.score}</p>
      <p>Status: {match?.status}</p>
    </div>
  );
}
```

## React Query Devtools

The devtools are automatically included in development mode. Look for the React Query icon in the bottom-left corner of your browser.

### Features:
- View all queries and their states
- Inspect query data
- Manually trigger refetches
- See query timings
- Debug cache behavior

## Best Practices

1. **Use query keys consistently**
   ```typescript
   ['matches']              // All matches
   ['match', id]            // Single match
   ['matches', filters]     // Filtered matches
   ```

2. **Handle loading and error states**
   ```typescript
   if (isLoading) return <CircularProgress />;
   if (isError) return <Alert severity="error">{error.message}</Alert>;
   ```

3. **Invalidate related queries after mutations**
   ```typescript
   onSuccess: () => {
     queryClient.invalidateQueries({ queryKey: ['matches'] });
   }
   ```

4. **Use enabled option for dependent queries**
   ```typescript
   const { data } = usePlayerMatches(playerId, {
     enabled: !!playerId,
   });
   ```

5. **Separate API functions from hooks**
   ```typescript
   // Good
   const getMatchesApi = () => api.get('/matches');
   export const useMatches = () => useQuery({ queryFn: getMatchesApi });
   ```

## Migration Guide

### Before (useState + useEffect)

```typescript
function MatchList() {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const data = await api.get('/matches');
        setMatches(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchMatches();
  }, []);

  if (loading) return <CircularProgress />;
  return <div>{/* render */}</div>;
}
```

### After (React Query)

```typescript
function MatchList() {
  const { data: matches, isLoading } = useMatches();

  if (isLoading) return <CircularProgress />;
  return <div>{/* render */}</div>;
}
```

## Summary

React Query is now fully set up and ready to use! All service files have been created with example queries and mutations. Start using them in your components for better data fetching and state management.
