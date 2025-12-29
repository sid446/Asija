import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

export interface Policy {
  _id: string;
  title: string;
  slug: string;
  content: string;
  order: number;
  createdAt: string;
  updatedAt: string;
}

interface PoliciesState {
  policies: Policy[];
  loading: boolean;
  error: string | null;
  fetched: boolean;
}

const initialState: PoliciesState = {
  policies: [],
  loading: false,
  error: null,
  fetched: false,
};

export const fetchPolicies = createAsyncThunk(
  'policies/fetchPolicies',
  async () => {
    const response = await fetch('/api/admin/policies');
    if (!response.ok) {
      throw new Error('Failed to fetch policies');
    }
    const data = await response.json();
    return data;
  }
);

const policiesSlice = createSlice({
  name: 'policies',
  initialState,
  reducers: {
    clearPolicies: (state) => {
      state.policies = [];
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPolicies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPolicies.fulfilled, (state, action: PayloadAction<Policy[]>) => {
        state.loading = false;
        state.policies = action.payload;
        state.fetched = true;
      })
      .addCase(fetchPolicies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch policies';
      });
  },
});

export const { clearPolicies } = policiesSlice.actions;
export default policiesSlice.reducer;