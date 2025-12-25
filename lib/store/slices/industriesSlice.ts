import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

export interface Industry {
  _id: string;
  title: string;
  description: string;
  image?: string;
  details?: string;
  imageUrl?: string;
  slug?: string;
  order?: number;
  createdAt?: string;
  updatedAt?: string;
}

interface IndustriesState {
  industries: Industry[];
  loading: boolean;
  error: string | null;
  fetched: boolean;
}

const initialState: IndustriesState = {
  industries: [],
  loading: false,
  error: null,
  fetched: false,
};

export const fetchIndustries = createAsyncThunk(
  'industries/fetchIndustries',
  async () => {
    const response = await fetch('/api/industries');
    if (!response.ok) {
      throw new Error('Failed to fetch industries');
    }
    const data = await response.json();
    return Array.isArray(data.industries) ? data.industries : [];
  }
);

const industriesSlice = createSlice({
  name: 'industries',
  initialState,
  reducers: {
    clearIndustries: (state) => {
      state.industries = [];
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchIndustries.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchIndustries.fulfilled, (state, action: PayloadAction<Industry[]>) => {
        state.loading = false;
        state.industries = action.payload;
        state.fetched = true;
      })
      .addCase(fetchIndustries.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch industries';
      });
  },
});

export const { clearIndustries } = industriesSlice.actions;
export default industriesSlice.reducer;