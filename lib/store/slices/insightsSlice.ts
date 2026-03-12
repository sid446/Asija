import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

export interface Insight {
  _id: string;
  title: string;
  description: string;
  slug: string;
  content: string;
  category: string;
  published: boolean;
  featured: boolean;
  image?: string;
  createdAt: string;
  updatedAt: string;
}

interface InsightsState {
  insights: Insight[];
  fullInsights: Insight[];
  loading: boolean;
  error: string | null;
  fetched: boolean;
  fullFetched: boolean;
  cacheVersion: string | null;
}

const initialState: InsightsState = {
  insights: [],
  fullInsights: [],
  loading: false,
  error: null,
  fetched: false,
  fullFetched: false,
  cacheVersion: null,
};

export const fetchInsights = createAsyncThunk(
  'insights/fetchInsights',
  async (_, { getState }) => {
    // Fetch version from backend (admin route)
    const versionRes = await fetch('/api/admin/insights/version');
    let backendVersion = null;
    if (versionRes.ok) {
      const versionData = await versionRes.json();
      backendVersion = versionData.version;
    }
    const state: any = getState();
    const cachedVersion = state.insights.cacheVersion;
    // If cache version matches backend, return cached insights
    if (cachedVersion && backendVersion && cachedVersion === backendVersion) {
      return { cached: true };
    }
    // Otherwise, fetch fresh insights
    const response = await fetch('/api/insights');
    if (!response.ok) {
      throw new Error('Failed to fetch insights');
    }
    const data = await response.json();
    return { insights: data, version: backendVersion };
  }
);

const insightsSlice = createSlice({
  name: 'insights',
  initialState,
  reducers: {
    clearInsights: (state) => {
      state.insights = [];
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchInsights.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchInsights.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        // If cached, do not update
        if (action.payload && action.payload.cached) {
          state.fetched = true;
          return;
        }
        const insights = action.payload.insights || [];
        state.fullInsights = insights;
        // Get featured insights or latest 3 insights
        const featuredOrLatest = insights
          .filter((insight: Insight) => insight.published)
          .sort((a: Insight, b: Insight) => {
            // Prioritize featured insights, then by creation date
            if (a.featured && !b.featured) return -1;
            if (!a.featured && b.featured) return 1;
            return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
          })
          .slice(0, 3);
        state.insights = featuredOrLatest;
        state.fetched = true;
        state.fullFetched = true;
        state.cacheVersion = action.payload.version || null;
      })
      .addCase(fetchInsights.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch insights';
      });
  },
});

export const { clearInsights } = insightsSlice.actions;
export default insightsSlice.reducer;