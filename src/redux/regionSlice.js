import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  region: 'global',  // Default region state
};

const regionSlice = createSlice({
  name: 'region',
  initialState,
  reducers: {
    setRegion: (state, action) => {
      state.region = action.payload;
    },
  },
});

export const { setRegion } = regionSlice.actions;
export default regionSlice.reducer;
