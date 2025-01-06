
import { createSlice } from '@reduxjs/toolkit';

const searchSlice = createSlice({
  name: 'search',
  initialState: {
    query: '',
  },
  reducers: {
    setQuery: (state, action) => {
      state.query = action.payload; // Update the query state
    },
  },
});

export const { setQuery } = searchSlice.actions;
export default searchSlice.reducer;
