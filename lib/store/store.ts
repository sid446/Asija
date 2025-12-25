import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from '@reduxjs/toolkit';

// Import slices
import heroReducer from './slices/heroSlice';
import servicesReducer from './slices/servicesSlice';
import insightsReducer from './slices/insightsSlice';
import regionsReducer from './slices/regionsSlice';
import faqsReducer from './slices/faqsSlice';
import industriesReducer from './slices/industriesSlice';
import contactReducer from './slices/contactSlice';
import globalServicesReducer from './slices/globalServicesSlice';

// Persist configuration
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['hero', 'services', 'insights', 'regions', 'faqs', 'industries', 'contact', 'globalServices'], // Only persist these slices
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
});

// Create persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
});

// Create persistor
export const persistor = persistStore(store);

// Export types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;