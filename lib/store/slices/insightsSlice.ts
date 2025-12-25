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
}

const initialState: InsightsState = {
  insights: [],
  fullInsights: [],
  loading: false,
  error: null,
  fetched: false,
  fullFetched: false,
};

export const fetchInsights = createAsyncThunk(
  'insights/fetchInsights',
  async () => {
    const response = await fetch('/api/insights');
    if (!response.ok) {
      throw new Error('Failed to fetch insights');
    }
    const data = await response.json();
    return data;
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
      .addCase(fetchInsights.fulfilled, (state, action: PayloadAction<Insight[]>) => {
        state.loading = false;
        state.fullInsights = action.payload;
        // Get featured insights or latest 3 insights
        const featuredOrLatest = action.payload
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
      })
      .addCase(fetchInsights.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch insights';
      });
  },
});

export const { clearInsights } = insightsSlice.actions;
export default insightsSlice.reducer;