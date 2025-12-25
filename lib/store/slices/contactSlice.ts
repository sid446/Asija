import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

export interface ContactContent {
  _id: string;
  tagline: string;
  title: string;
  description: string;
  officeLocations: string;
  officeLocation1: string;
  officeLocation2: string;
  contactNo: string;
  phone1: string;
  phone2: string;
  emails: string;
  email1: string;
  email2: string;
  enquiryForm: string;
  imageAlt: string;
  image: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Location {
  _id: string;
  label: string;
  title: string;
  address: string;
  phones: string[];
  email: string;
  lat: number;
  lng: number;
  googleMapsUrl: string;
  order: number;
  createdAt?: string;
  updatedAt?: string;
}

interface ContactState {
  contactContent: ContactContent | null;
  locations: Location[];
  loading: boolean;
  error: string | null;
}

const initialState: ContactState = {
  contactContent: null,
  locations: [],
  loading: false,
  error: null,
};

export const fetchContactContent = createAsyncThunk(
  'contact/fetchContactContent',
  async () => {
    const response = await fetch('/api/admin/contact-content');
    if (!response.ok) {
      throw new Error('Failed to fetch contact content');
    }
    return await response.json();
  }
);

export const fetchLocations = createAsyncThunk(
  'contact/fetchLocations',
  async () => {
    const response = await fetch('/api/admin/locations');
    if (!response.ok) {
      throw new Error('Failed to fetch locations');
    }
    const data = await response.json();
    return Array.isArray(data) ? data : [];
  }
);

const contactSlice = createSlice({
  name: 'contact',
  initialState,
  reducers: {
    clearContactData: (state) => {
      state.contactContent = null;
      state.locations = [];
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchContactContent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchContactContent.fulfilled, (state, action: PayloadAction<ContactContent>) => {
        state.loading = false;
        state.contactContent = action.payload;
      })
      .addCase(fetchContactContent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch contact content';
      })
      .addCase(fetchLocations.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLocations.fulfilled, (state, action: PayloadAction<Location[]>) => {
        state.loading = false;
        state.locations = action.payload;
      })
      .addCase(fetchLocations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch locations';
      });
  },
});

export const { clearContactData } = contactSlice.actions;
export default contactSlice.reducer;