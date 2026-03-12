import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import { combineReducers } from '@reduxjs/toolkit';

// Create a storage wrapper that handles SSR and missing localStorage
const createNoopStorage = () => {
  return {
    getItem(_key: string) {
      return Promise.resolve(null);
    },
    setItem(_key: string, value: any) {
      return Promise.resolve(value);
    },
    removeItem(_key: string) {
      return Promise.resolve();
    },
  };
};

const storage = typeof window !== 'undefined' ? require('redux-persist/lib/storage').default : createNoopStorage();

// Import slices
import heroReducer from './slices/heroSlice';
import servicesReducer from './slices/servicesSlice';
import insightsReducer from './slices/insightsSlice';
import regionsReducer from './slices/regionsSlice';
import faqsReducer from './slices/faqsSlice';
import industriesReducer from './slices/industriesSlice';
import contactReducer from './slices/contactSlice';
import globalServicesReducer from './slices/globalServicesSlice';
import aboutReducer from './slices/aboutSlice';
import aboutCardsReducer from './slices/aboutCardsSlice';
import policiesReducer from './slices/policiesSlice';

// Persist configuration
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['hero', 'services', 'insights', 'regions', 'faqs', 'contact', 'globalServices', 'about', 'aboutCards', 'policies'], // Only persist these slices
};

// Combine reducers
const rootReducer = combineReducers({
  hero: heroReducer,
  services: servicesReducer,
  insights: insightsReducer,
  regions: regionsReducer,
  faqs: faqsReducer,
  industries: industriesReducer,
  contact: contactReducer,
  globalServices: globalServicesReducer,
  about: aboutReducer,
  aboutCards: aboutCardsReducer,
  policies: policiesReducer,
});

// Create persisted reducer with error handling
let persistedReducer: any;
try {
  persistedReducer = persistReducer(persistConfig, rootReducer);
} catch (error) {
  console.warn('Redux persist failed to create persisted reducer, falling back to regular reducer:', error);
  persistedReducer = rootReducer;
}

// Configure store
// Auto-clear old cache if cacheVersion is missing (for insights)
if (typeof window !== 'undefined') {
  try {
    const persisted = localStorage.getItem('persist:root');
    if (persisted) {
      const parsed = JSON.parse(persisted);
      // If insights slice exists and cacheVersion is missing, clear cache
      if (parsed.insights) {
        const insightsState = JSON.parse(parsed.insights);
        if (!insightsState.cacheVersion) {
          localStorage.removeItem('persist:root');
        }
      }
    }
  } catch (e) {
    // Ignore errors
  }
}

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE', 'persist/REGISTER'],
      },
    }),
});

// Create persistor with error handling
export let persistor: any;
try {
  persistor = persistStore(store);
} catch (error) {
  console.warn('Redux persist failed to create persistor, continuing without persistence:', error);
  persistor = null;
}

// Export types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;