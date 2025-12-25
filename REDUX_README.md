# Redux State Management Implementation

This project now uses Redux Toolkit with Redux Persist for efficient state management and data caching to avoid repeated API calls.

## Features

- **Data Caching**: API responses are cached in Redux store and persisted in localStorage
- **Automatic Rehydration**: Cached data is restored on app reload
- **Optimized Performance**: No repeated API calls for the same data
- **Type Safety**: Full TypeScript support with proper typing

## Store Structure

```
store/
├── slices/
│   ├── heroSlice.ts      # Hero content state management
│   ├── servicesSlice.ts  # Services data state management
│   ├── insightsSlice.ts  # Insights data state management
│   ├── regionsSlice.ts   # Regions data state management
│   └── faqsSlice.ts      # FAQs data state management
├── store.ts              # Main store configuration with persistence
├── hooks.ts              # Typed Redux hooks
└── useInitializeAppData.ts # App data initialization hook
```

## Usage

### Using Redux State in Components

```tsx
import { useAppSelector, useAppDispatch } from "@/lib/store/hooks";
import { fetchHeroContent } from "@/lib/store/slices/heroSlice";

function MyComponent() {
  const dispatch = useAppDispatch();
  const { content, loading, error } = useAppSelector((state) => state.hero);

  useEffect(() => {
    if (!content && !loading) {
      dispatch(fetchHeroContent());
    }
  }, [dispatch, content, loading]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return <div>{content?.title}</div>;
}
```

### Automatic Data Initialization

The `useInitializeAppData` hook automatically loads all required data when the app starts:

```tsx
import { useInitializeAppData } from "@/lib/store/useInitializeAppData";

function App() {
  const { isLoading, hasData } = useInitializeAppData();

  if (isLoading && !hasData) {
    return <Loader />;
  }

  return <MainContent />;
}
```

## Data Persistence

- Data is automatically persisted to localStorage
- Survives page refreshes and browser restarts
- Reduces server load and improves user experience
- Fresh data is fetched only when needed or on errors

## Benefits

1. **Performance**: Eliminates redundant API calls
2. **User Experience**: Faster loading times
3. **Server Load**: Reduced API requests
4. **Offline Support**: Cached data works offline
5. **Type Safety**: Full TypeScript support

## Migration Notes

Components have been updated to use Redux instead of direct API calls:

- `Hero.tsx`: Now uses `heroSlice`
- `Services.tsx`: Now uses `servicesSlice`
- `Insights.tsx`: Now uses `insightsSlice`
- `FaqInteractable.tsx`: Now uses `faqsSlice`
- `page.tsx`: Uses `useInitializeAppData` for preloading

Additional slices created for future use:

- `regionsSlice`: For regions data (used in Navbar, Footer)
- `faqsSlice`: For FAQs data (already implemented in FaqInteractable)
