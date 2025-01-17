// apiSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Fetch categories
export const fetchCategories = createAsyncThunk('api/fetchCategories', async (_, { getState }) => {
  const { region } = getState(); // Access the region from the Redux store
  const regionValue = region.region; // Access the actual string value of the region
  
  console.log('Region:', region);  // This will log the object { region: 'global' }
  console.log('Region Value:', regionValue);  // This will log 'global'

  if (typeof regionValue !== 'string') {
    console.error('Region is not a string:', regionValue);
    return []; // Return an empty array or handle the error as needed
  }

  // Now, pass the correct region value to the API request
  const response = await fetch(`http://13.235.70.111:3000/common/getCoursesPerCategory?region=${regionValue}`);
  
  console.log('Raw Response:', response);
  

  if (!response.ok) {
    throw new Error('Failed to fetch categories');
  }

  const data = await response.json();
  console.log('Fetched Data:', data);

  const categories = [...new Set(data.map(course => course.category))];
  console.log('Unique Categories:', categories);
  return categories;
});


// Fetch courses
export const fetchCourses = createAsyncThunk('api/fetchCourses', async (_, { getState }) => {
  const { region } = getState(); // Access the region from the Redux store
  const regionValue = region.region; // Access the actual string value of the region
  
  console.log('Region:', region);  // This will log the object { region: 'global' }
  console.log('Region Value:', regionValue);  // This will log 'global'

  if (typeof regionValue !== 'string') {
    console.error('Region is not a string:', regionValue);
    return []; // Return an empty array or handle the error as needed
  }
  const response = await fetch(`http://13.235.70.111:3000/common/getCoursesPerCategory?region=${regionValue}`);

  if (!response.ok) {
    throw new Error('Failed to fetch courses');
  }

  const data = await response.json();
  console.log('Fetched Courses:', data);
  return data;
});

// Fetch blogs
export const fetchBlogs = createAsyncThunk('api/fetchBlogs', async () => {
  const response = await fetch('http://13.235.70.111:3000/common/getHomePageBlogsLists');
  if (!response.ok) {
    throw new Error('Failed to fetch blogs');
  }
  return response.json();
});

// Create slice
const apiSlice = createSlice({
  name: 'api',
  initialState: {
    categories: [],
    courses: [],
    blogs: [],
    loading: false,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.categories = action.payload; // Store categories
      })
      .addCase(fetchCourses.fulfilled, (state, action) => {
        state.courses = action.payload; // Store courses
      })
      .addCase(fetchBlogs.fulfilled, (state, action) => {
        state.blogs = action.payload; // Store blogs
      });
  },
});

export default apiSlice.reducer;
