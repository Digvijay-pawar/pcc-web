# Services with React Query

This directory contains API service layers using React Query (TanStack Query) for data fetching, caching, and state management.

## Structure

Each service module follows this pattern:

```
services/
├── auth/
│   ├── auth.queries.ts    # React Query hooks
│   └── auth.types.ts      # TypeScript types
├── match/
│   ├── match.queries.ts
│   └── match.types.ts
└── README.md
```

## React Query Setup

### Query Client Configuration

Located in `src/lib/query.client.ts`:

```typescript
import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,                      // Retry failed requests once
      refetchOnWindowFocus: false,   // Don't refetch on window focus
      staleTime: 5 * 60 * 1000,     // Data fresh for 5 minutes
    },
    mutations: {
      retry: 0,                      // Don't retry mutations
    },
  },
});
```

### Provider Setup

In `src/App.tsx`:

```typescript
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { queryClient } from './lib/query.client';

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      {/* Your app */}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
```

## Usage Examples

### Mutations (POST, PUT, DELETE)

#### Login Example

```typescript
// services/auth/auth.queries.ts
import { useMutation } from '@tanstack/react-query';
import api from '../../lib/axios';

const loginApi = (payload: ILoginPayload): Promise<ILoginResponse> => {
  return api.post('/auth/login', payload);
};

export const useLogin = () => {
  return useMutation({
    mutationFn: loginApi,
    onSuccess: (data) => {
      setAuthTokens(data.accessToken, data.user.role);
    },
    onError: (error) => {
      console.error('Login failed:', error);
    },
  });
};

// In component
import { useLogin } from './services/auth/auth.queries';

function LoginForm() {
  const { mutate: login, isPending, isError, error } = useLogin();

  const handleSubmit = (values) => {
    login(values, {
      onSuccess: () => {
        navigate('/');
      },
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* form fields */}
      <button type="submit" disabled={isPending}>
        {isPending ? 'Logging in...' : 'Login'}
      </button>
      {isError && <p>{error.message}</p>}
    </form>
  );
}
```

### Queries (GET)

#### Fetch Matches Example

```typescript
// services/match/match.queries.ts
import { useQuery } from '@tanstack/react-query';
import api from '../../lib/axios';

const getMatchesApi = (): Promise<IMatch[]> => {
  return api.get('/matches');
};

export const useMatches = () => {
  return useQuery({
    queryKey: ['matches'],
    queryFn: getMatchesApi,
  });
};

// In component
import { useMatches } from './services/match/match.queries';

function MatchList() {
  const { data: matches, isLoading, isError, error } = useMatches();

  if (isLoading) return <CircularProgress />;
  if (isError) return <p>Error: {error.message}</p>;

  return (
    <div>
      {matches?.map(match => (
        <MatchCard key={match.id} match={match} />
      ))}
    </div>
  );
}
```

#### Fetch Single Match

```typescript
// services/match/match.queries.ts
const getMatchByIdApi = (id: string): Promise<IMatch> => {
  return api.get(`/matches/${id}`);
};

export const useMatch = (id: string) => {
  return useQuery({
    queryKey: ['match', id],
    queryFn: () => getMatchByIdApi(id),
    enabled: !!id, // Only fetch if id exists
  });
};

// In component
function MatchDetail() {
  const { id } = useParams();
  const { data: match, isLoading } = useMatch(id!);

  if (isLoading) return <CircularProgress />;

  return <div>{match?.title}</div>;
}
```

### Mutations with Cache Updates

```typescript
// services/match/match.queries.ts
import { useMutation, useQueryClient } from '@tanstack/react-query';

const createMatchApi = (payload: ICreateMatch): Promise<IMatch> => {
  return api.post('/matches', payload);
};

export const useCreateMatch = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createMatchApi,
    onSuccess: (newMatch) => {
      // Update cache with new match
      queryClient.setQueryData(['matches'], (old: IMatch[] = []) => {
        return [...old, newMatch];
      });
      
      // Or invalidate to refetch
      queryClient.invalidateQueries({ queryKey: ['matches'] });
    },
  });
};
```

### Optimistic Updates

```typescript
export const useUpdateMatch = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateMatchApi,
    onMutate: async (updatedMatch) => {
      // Cancel outgoing refetches
      await queryClient.cancelQueries({ queryKey: ['match', updatedMatch.id] });

      // Snapshot previous value
      const previousMatch = queryClient.getQueryData(['match', updatedMatch.id]);

      // Optimistically update
      queryClient.setQueryData(['match', updatedMatch.id], updatedMatch);

      return { previousMatch };
    },
    onError: (err, updatedMatch, context) => {
      // Rollback on error
      queryClient.setQueryData(
        ['match', updatedMatch.id],
        context?.previousMatch
      );
    },
    onSettled: (updatedMatch) => {
      // Refetch after error or success
      queryClient.invalidateQueries({ queryKey: ['match', updatedMatch?.id] });
    },
  });
};
```

## Query Keys

Query keys should be descriptive and hierarchical:

```typescript
// Good
['matches']                          // All matches
['match', id]                        // Single match
['matches', { city: 'Mumbai' }]      // Filtered matches
['player', playerId, 'matches']      // Player's matches

// Bad
['data']
['match']
['getMatches']
```

## Best Practices

### 1. Separate API Functions

```typescript
// ✅ Good
const getMatchesApi = (): Promise<IMatch[]> => {
  return api.get('/matches');
};

export const useMatches = () => {
  return useQuery({
    queryKey: ['matches'],
    queryFn: getMatchesApi,
  });
};

// ❌ Bad
export const useMatches = () => {
  return useQuery({
    queryKey: ['matches'],
    queryFn: () => api.get('/matches'),
  });
};
```

### 2. Type Safety

```typescript
// Define types
interface IMatch {
  id: string;
  title: string;
  date: string;
}

// Use in API function
const getMatchesApi = (): Promise<IMatch[]> => {
  return api.get('/matches');
};

// Hook is automatically typed
export const useMatches = () => {
  return useQuery({
    queryKey: ['matches'],
    queryFn: getMatchesApi,
  });
};
```

### 3. Error Handling

```typescript
export const useMatches = () => {
  return useQuery({
    queryKey: ['matches'],
    queryFn: getMatchesApi,
    retry: 2,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
};

// In component
const { data, isError, error } = useMatches();

if (isError) {
  return <Alert severity="error">{error.message}</Alert>;
}
```

### 4. Loading States

```typescript
function MatchList() {
  const { data, isLoading, isFetching } = useMatches();

  return (
    <div>
      {isFetching && <LinearProgress />}
      {isLoading ? (
        <CircularProgress />
      ) : (
        <div>{/* render matches */}</div>
      )}
    </div>
  );
}
```

### 5. Dependent Queries

```typescript
function PlayerMatches({ playerId }: { playerId: string }) {
  // First query
  const { data: player } = usePlayer(playerId);

  // Second query depends on first
  const { data: matches } = usePlayerMatches(player?.id, {
    enabled: !!player?.id,
  });

  return <div>{/* render */}</div>;
}
```

## React Query Devtools

The devtools are included in development mode:

- Press the React Query icon in the bottom corner
- View all queries and their states
- Inspect query data
- Manually trigger refetches
- See query timings

## Common Patterns

### Pagination

```typescript
export const useMatches = (page: number = 1) => {
  return useQuery({
    queryKey: ['matches', page],
    queryFn: () => getMatchesApi(page),
    keepPreviousData: true,
  });
};
```

### Infinite Scroll

```typescript
import { useInfiniteQuery } from '@tanstack/react-query';

export const useInfiniteMatches = () => {
  return useInfiniteQuery({
    queryKey: ['matches'],
    queryFn: ({ pageParam = 1 }) => getMatchesApi(pageParam),
    getNextPageParam: (lastPage, pages) => {
      return lastPage.hasMore ? pages.length + 1 : undefined;
    },
  });
};
```

### Polling

```typescript
export const useLiveMatch = (matchId: string) => {
  return useQuery({
    queryKey: ['match', matchId],
    queryFn: () => getMatchApi(matchId),
    refetchInterval: 5000, // Refetch every 5 seconds
  });
};
```

## Migration from Old Code

### Before (without React Query)

```typescript
function MatchList() {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        setLoading(true);
        const data = await api.get('/matches');
        setMatches(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMatches();
  }, []);

  if (loading) return <CircularProgress />;
  if (error) return <p>Error</p>;

  return <div>{/* render matches */}</div>;
}
```

### After (with React Query)

```typescript
function MatchList() {
  const { data: matches, isLoading, isError } = useMatches();

  if (isLoading) return <CircularProgress />;
  if (isError) return <p>Error</p>;

  return <div>{/* render matches */}</div>;
}
```

## Resources

- [React Query Docs](https://tanstack.com/query/latest/docs/react/overview)
- [React Query Examples](https://tanstack.com/query/latest/docs/react/examples/react/simple)
- [Query Keys Guide](https://tanstack.com/query/latest/docs/react/guides/query-keys)
