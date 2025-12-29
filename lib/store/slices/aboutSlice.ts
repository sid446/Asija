import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

export interface AboutContent {
  title: string;
  quote: string;
  description1: string;
  description2: string;
  description3: string;
  description4: string;
  peopleTitle: string;
  peopleDescription1: string;
  peopleDescription2: string;
  peopleStats: Array<{
    label: string;
    percentage: number;
  }>;
  futureTitle: string;
  futureSubtitle: string;
  futureDescription1: string;
  futureDescription2: string;
  futureDescription3: string;
  futureDescription4: string;
}

interface AboutState {
  content: AboutContent | null;
  loading: boolean;
  error: string | null;
  fetched: boolean;
}

const initialState: AboutState = {
  content: null,
  loading: false,
  error: null,
  fetched: false,
};

export const fetchAboutContent = createAsyncThunk(
  'about/fetchContent',
  async () => {
    const response = await fetch('/api/admin/about-content');
    if (!response.ok) {
      throw new Error('Failed to fetch about content');
    }
    const data = await response.json();
    return data;
  }
);

const aboutSlice = createSlice({
  name: 'about',
  initialState,
  reducers: {
    clearAboutContent: (state) => {
      state.content = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAboutContent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAboutContent.fulfilled, (state, action: PayloadAction<AboutContent>) => {
        state.loading = false;
        state.content = action.payload;
        state.fetched = true;
      })
      .addCase(fetchAboutContent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch about content';
      });
  },
});

export const { clearAboutContent } = aboutSlice.actions;
export default aboutSlice.reducer;