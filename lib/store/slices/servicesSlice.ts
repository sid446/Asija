import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

export interface Service {
  _id: string;
  title: string;
  translationKey: string;
  items: string[];
  insights: boolean;
  description?: string;
  detailedDescription?: string;
  benefits?: string[];
  subItems?: any;
  deepSubItems?: any;
  order?: number;
  createdAt?: string;
}

interface ServicesState {
  services: Service[];
  loading: boolean;
  error: string | null;
  fetched: boolean;
}

const initialState: ServicesState = {
  services: [],
  loading: false,
  error: null,
  fetched: false,
};

export const fetchServices = createAsyncThunk(
  'services/fetchServices',
  async () => {
    const response = await fetch('/api/services');
    if (!response.ok) {
      throw new Error('Failed to fetch services');
    }
    const data = await response.json();
    // Handle different response formats
    return Array.isArray(data) ? data : data.services || [];
  }
);

const servicesSlice = createSlice({
  name: 'services',
  initialState,
  reducers: {
    clearServices: (state) => {
      state.services = [];
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchServices.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchServices.fulfilled, (state, action: PayloadAction<Service[]>) => {
        state.loading = false;
        state.services = action.payload;
        state.fetched = true;
      })
      .addCase(fetchServices.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch services';
      });
  },
});

export const { clearServices } = servicesSlice.actions;
export default servicesSlice.reducer;