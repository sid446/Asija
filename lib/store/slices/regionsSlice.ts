import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

export interface Region {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  imageUrl?: string;
  order?: number;
  createdAt?: string;
}

interface RegionsState {
  regions: Region[];
  loading: boolean;
  error: string | null;
}

const initialState: RegionsState = {
  regions: [],
  loading: false,
  error: null,
};

export const fetchRegions = createAsyncThunk(
  'regions/fetchRegions',
  async () => {
    const response = await fetch('/api/regions');
    if (!response.ok) {
      throw new Error('Failed to fetch regions');
    }
    const data = await response.json();
    return Array.isArray(data) ? data : data.regions || [];
  }
);

const regionsSlice = createSlice({
  name: 'regions',
  initialState,
  reducers: {
    clearRegions: (state) => {
      state.regions = [];
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRegions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRegions.fulfilled, (state, action: PayloadAction<Region[]>) => {
        state.loading = false;
        state.regions = action.payload;
      })
      .addCase(fetchRegions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch regions';
      });
  },
});

export const { clearRegions } = regionsSlice.actions;
export default regionsSlice.reducer;