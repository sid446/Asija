import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

export interface GlobalServiceContent {
  _id: string;
  heroTitle: string;
  heroDescription: string;
  heroVideoUrl: string;
  introTitle: string;
  introDescription1: string;
  introDescription2: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface GlobalRegion {
  _id: string;
  name: string;
  slug: string;
  image: string;
  href: string;
  order: number;
  heroImage?: string;
  heroTitle?: string;
  heroDescription?: string;
  contentHeading?: string;
  contentDescription?: string;
  features?: string[];
  createdAt?: string;
  updatedAt?: string;
}

export interface GlobalOffering {
  _id: string;
  title: string;
  description: string;
  icon: string;
  order: number;
  createdAt?: string;
  updatedAt?: string;
}

interface GlobalServicesState {
  content: GlobalServiceContent | null;
  regions: GlobalRegion[];
  offerings: GlobalOffering[];
  loading: boolean;
  error: string | null;
}

const initialState: GlobalServicesState = {
  content: null,
  regions: [],
  offerings: [],
  loading: false,
  error: null,
};

export const fetchGlobalServiceContent = createAsyncThunk(
  'globalServices/fetchContent',
  async () => {
    const response = await fetch('/api/admin/global-service-content');
    if (!response.ok) {
      throw new Error('Failed to fetch global service content');
    }
    return await response.json();
  }
);

export const fetchGlobalRegions = createAsyncThunk(
  'globalServices/fetchRegions',
  async () => {
    const response = await fetch('/api/admin/global-regions');
    if (!response.ok) {
      throw new Error('Failed to fetch global regions');
    }
    const data = await response.json();
    return Array.isArray(data) ? data : [];
  }
);

export const fetchGlobalOfferings = createAsyncThunk(
  'globalServices/fetchOfferings',
  async () => {
    const response = await fetch('/api/admin/global-offerings');
    if (!response.ok) {
      throw new Error('Failed to fetch global offerings');
    }
    const data = await response.json();
    return Array.isArray(data) ? data : [];
  }
);

const globalServicesSlice = createSlice({
  name: 'globalServices',
  initialState,
  reducers: {
    clearGlobalServicesData: (state) => {
      state.content = null;
      state.regions = [];
      state.offerings = [];
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGlobalServiceContent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchGlobalServiceContent.fulfilled, (state, action: PayloadAction<GlobalServiceContent>) => {
        state.loading = false;
        state.content = action.payload;
      })
      .addCase(fetchGlobalServiceContent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch global service content';
      })
      .addCase(fetchGlobalRegions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchGlobalRegions.fulfilled, (state, action: PayloadAction<GlobalRegion[]>) => {
        state.loading = false;
        state.regions = action.payload;
      })
      .addCase(fetchGlobalRegions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch global regions';
      })
      .addCase(fetchGlobalOfferings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchGlobalOfferings.fulfilled, (state, action: PayloadAction<GlobalOffering[]>) => {
        state.loading = false;
        state.offerings = action.payload;
      })
      .addCase(fetchGlobalOfferings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch global offerings';
      });
  },
});

export const { clearGlobalServicesData } = globalServicesSlice.actions;
export default globalServicesSlice.reducer;