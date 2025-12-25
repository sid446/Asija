import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

export interface HeroContent {
  tagline: string;
  title: string;
  description: string;
  learnMore: string;
  contactUs: string;
  videoPoster: string;
  videoWebm: string;
  videoMp4: string;
  showFAQ: boolean;
}

interface HeroState {
  content: HeroContent | null;
  loading: boolean;
  error: string | null;
}

const initialState: HeroState = {
  content: null,
  loading: false,
  error: null,
};

export const fetchHeroContent = createAsyncThunk(
  'hero/fetchContent',
  async () => {
    const response = await fetch('/api/admin/hero-content');
    if (!response.ok) {
      throw new Error('Failed to fetch hero content');
    }
    const data = await response.json();
    return data;
  }
);

const heroSlice = createSlice({
  name: 'hero',
  initialState,
  reducers: {
    clearHeroContent: (state) => {
      state.content = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchHeroContent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchHeroContent.fulfilled, (state, action: PayloadAction<HeroContent>) => {
        state.loading = false;
        state.content = action.payload;
      })
      .addCase(fetchHeroContent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch hero content';
      });
  },
});

export const { clearHeroContent } = heroSlice.actions;
export default heroSlice.reducer;