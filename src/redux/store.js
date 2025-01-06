import { createStore, applyMiddleware } from 'redux';
import { combineReducers } from 'redux';
import { thunk } from 'redux-thunk';

import searchSlice from '@/redux/searchSlice';
import apiSlice from '@/redux/apiSlice';
import regionSlice from '@/redux/regionSlice'; // Assuming you have a region slice

// Combine reducers into rootReducer
const rootReducer = combineReducers({
  region: regionSlice,  // Use your region slice here instead of directly referencing `reducer`
  search: searchSlice,
  api: apiSlice,
});

// Create the store with redux-thunk middleware
const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
