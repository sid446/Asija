import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

export interface FAQ {
  _id: string;
  question: string;
  answer: string;
  category?: string;
  order?: number;
  isActive: boolean;
  createdAt?: string;
}

interface FAQsState {
  faqs: FAQ[];
  loading: boolean;
  error: string | null;
}

const initialState: FAQsState = {
  faqs: [],
  loading: false,
  error: null,
};

export const fetchFAQs = createAsyncThunk(
  'faqs/fetchFAQs',
  async () => {
    const response = await fetch('/api/admin/faq');
    if (!response.ok) {
      throw new Error('Failed to fetch FAQs');
    }
    const data = await response.json();
    return Array.isArray(data) ? data : data.faqs || [];
  }
);

const faqsSlice = createSlice({
  name: 'faqs',
  initialState,
  reducers: {
    clearFAQs: (state) => {
      state.faqs = [];
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFAQs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFAQs.fulfilled, (state, action: PayloadAction<FAQ[]>) => {
        state.loading = false;
        state.faqs = action.payload;
      })
      .addCase(fetchFAQs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch FAQs';
      });
  },
});

export const { clearFAQs } = faqsSlice.actions;
export default faqsSlice.reducer;