import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

export interface AboutCard {
  _id: string;
  image: string;
  title: string;
  description: string;
  buttonContent: string;
  link: string;
  order: number;
}

interface AboutCardsState {
  cards: AboutCard[];
  loading: boolean;
  error: string | null;
  fetched: boolean;
}

const initialState: AboutCardsState = {
  cards: [],
  loading: false,
  error: null,
  fetched: false,
};

export const fetchAboutCards = createAsyncThunk(
  'aboutCards/fetchCards',
  async () => {
    const response = await fetch('/api/admin/about-cards');
    if (!response.ok) {
      throw new Error('Failed to fetch about cards');
    }
    const data = await response.json();
    return data.items || [];
  }
);

const aboutCardsSlice = createSlice({
  name: 'aboutCards',
  initialState,
  reducers: {
    clearAboutCards: (state) => {
      state.cards = [];
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAboutCards.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAboutCards.fulfilled, (state, action: PayloadAction<AboutCard[]>) => {
        state.loading = false;
        state.cards = action.payload;
        state.fetched = true;
      })
      .addCase(fetchAboutCards.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch about cards';
      });
  },
});

export const { clearAboutCards } = aboutCardsSlice.actions;
export default aboutCardsSlice.reducer;