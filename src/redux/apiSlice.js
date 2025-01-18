// // apiSlice.js
// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// // Fetch categories
// export const fetchCategories = createAsyncThunk('api/fetchCategories', async (_, { getState }) => {
//   const { region } = getState(); // Access the region from the Redux store
//   const regionValue = region.region; // Access the actual string value of the region
  
//   console.log('Region:', region);  // This will log the object { region: 'global' }
//   console.log('Region Value:', regionValue);  // This will log 'global'

//   if (typeof regionValue !== 'string') {
//     console.error('Region is not a string:', regionValue);
//     return []; // Return an empty array or handle the error as needed
//   }

//   // Now, pass the correct region value to the API request
//   const response = await fetch(`http://13.235.70.111:3000/common/getCoursesPerCategory?region=${regionValue}`);
  
//   console.log('Raw Response:', response);
  

//   if (!response.ok) {
//     throw new Error('Failed to fetch categories');
//   }

//   const data = await response.json();
//   console.log('Fetched Data:', data);

//   const categories = [...new Set(data.map(course => course.category))];
//   console.log('Unique Categories:', categories);
//   return categories;
// });


// // Fetch courses
// export const fetchCourses = createAsyncThunk('api/fetchCourses', async (_, { getState }) => {
//   const { region } = getState(); // Access the region from the Redux store
//   const regionValue = region.region; // Access the actual string value of the region
  
//   console.log('Region:', region);  // This will log the object { region: 'global' }
//   console.log('Region Value:', regionValue);  // This will log 'global'

//   if (typeof regionValue !== 'string') {
//     console.error('Region is not a string:', regionValue);
//     return []; // Return an empty array or handle the error as needed
//   }
//   const response = await fetch(`http://13.235.70.111:3000/common/getCoursesPerCategory?region=${regionValue}`);

//   if (!response.ok) {
//     throw new Error('Failed to fetch courses');
//   }

//   const data = await response.json();
//   console.log('Fetched Courses:', data);
//   return data;
// });

// // Fetch blogs
// export const fetchBlogs = createAsyncThunk('api/fetchBlogs', async () => {
//   const response = await fetch('http://13.235.70.111:3000/common/getHomePageBlogsLists');
//   if (!response.ok) {
//     throw new Error('Failed to fetch blogs');
//   }
//   return response.json();
// });

// // Create slice
// const apiSlice = createSlice({
//   name: 'api',
//   initialState: {
//     categories: [],
//     courses: [],
//     blogs: [],
//     loading: false,
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchCategories.fulfilled, (state, action) => {
//         state.categories = action.payload; // Store categories
//       })
//       .addCase(fetchCourses.fulfilled, (state, action) => {
//         state.courses = action.payload; // Store courses
//       })
//       .addCase(fetchBlogs.fulfilled, (state, action) => {
//         state.blogs = action.payload; // Store blogs
//       });
//   },
// });


// export default apiSlice.reducer;
// apiSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Fetch categories
export const fetchCategories = createAsyncThunk('api/fetchCategories', async (_, { getState }) => {
  const { region } = getState(); // Access the region from the Redux store
  const regionValue = region.region; // Access the actual string value of the region

  if (typeof regionValue !== 'string') {
    console.error('Region is not a string:', regionValue);
    return []; // Return an empty array or handle the error as needed
  }

  // Check if data is available in sessionStorage
  const cachedCategories = sessionStorage.getItem(`categories-${regionValue}`);
  if (cachedCategories) {
    return JSON.parse(cachedCategories); // Return cached categories
  }

  // Fetch data from API
  const response = await fetch(`http://13.235.70.111:3000/common/getCoursesPerCategory?region=${regionValue}`);
  if (!response.ok) {
    throw new Error('Failed to fetch categories');
  }

  const data = await response.json();
  const categories = [...new Set(data.map(course => course.category))];

  // Store the fetched data in sessionStorage for future use
  sessionStorage.setItem(`categories-${regionValue}`, JSON.stringify(categories));

  return categories;
});

// Fetch courses
export const fetchCourses = createAsyncThunk('api/fetchCourses', async (_, { getState }) => {
  const { region } = getState(); // Access the region from the Redux store
  const regionValue = region.region; // Access the actual string value of the region

  if (typeof regionValue !== 'string') {
    console.error('Region is not a string:', regionValue);
    return []; // Return an empty array or handle the error as needed
  }

  // Check if data is available in sessionStorage
  const cachedCourses = sessionStorage.getItem(`courses-${regionValue}`);
  if (cachedCourses) {
    return JSON.parse(cachedCourses); // Return cached courses
  }

  // Fetch data from API
  const response = await fetch(`http://13.235.70.111:3000/common/getCoursesPerCategory?region=${regionValue}`);
  if (!response.ok) {
    throw new Error('Failed to fetch courses');
  }

  const data = await response.json();

  // Store the fetched data in sessionStorage for future use
  sessionStorage.setItem(`courses-${regionValue}`, JSON.stringify(data));

  return data;
});

// Fetch blogs
export const fetchBlogs = createAsyncThunk('api/fetchBlogs', async () => {
  // Check if blog data is available in sessionStorage
  const cachedBlogs = sessionStorage.getItem('blogs');
  if (cachedBlogs) {
    return JSON.parse(cachedBlogs); // Return cached blogs
  }

  // Fetch data from API
  const response = await fetch('http://13.235.70.111:3000/common/getHomePageBlogsLists');
  if (!response.ok) {
    throw new Error('Failed to fetch blogs');
  }

  const blogs = await response.json();

  // Store the fetched data in sessionStorage for future use
  sessionStorage.setItem('blogs', JSON.stringify(blogs));

  return blogs;
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
      })
      .addCase(fetchCategories.rejected, (state) => {
        // Handle the case when the API request for categories fails
        const cachedCategories = sessionStorage.getItem('categories');
        if (cachedCategories) {
          state.categories = JSON.parse(cachedCategories);
        }
      })
      .addCase(fetchCourses.rejected, (state) => {
        // Handle the case when the API request for courses fails
        const cachedCourses = sessionStorage.getItem('courses');
        if (cachedCourses) {
          state.courses = JSON.parse(cachedCourses);
        }
      })
      .addCase(fetchBlogs.rejected, (state) => {
        // Handle the case when the API request for blogs fails
        const cachedBlogs = sessionStorage.getItem('blogs');
        if (cachedBlogs) {
          state.blogs = JSON.parse(cachedBlogs);
        }
      });
  },
});

export default apiSlice.reducer;

