// // src/reducer.js
// import { SET_QUERY, SET_COURSES, SET_CATEGORIES, SET_BLOGS, SET_REGION } from '@/redux/action';

// const initialState = {
//   query: '',
//   courses: [],
//   categories: [],
//   blogs: [],
//   region: 'global', // Add region to the initial state
// };

// const reducer = (state = initialState, action) => {
//   switch (action.type) {
//     case SET_QUERY:
//       return {
//         ...state,
//         query: action.payload,
//       };
//     case SET_COURSES:
//       return {
//         ...state,
//         courses: action.payload,
//       };
//     case SET_CATEGORIES:
//       return {
//         ...state,
//         categories: action.payload,
//       };
//     case SET_BLOGS:
//       return {
//         ...state,
//         blogs: action.payload,
//       };
//     case SET_REGION: // Add a case for updating region
//       return {
//         ...state,
//         region: action.payload,
//       };
//     default:
//       return state;
//   }
// };

// export default reducer;
// reducer.js
import { SET_QUERY, SET_COURSES, SET_CATEGORIES, SET_BLOGS, SET_REGION } from './actionTypes';

const initialState = {
  query: '',
  courses: [],
  categories: [],
  blogs: [],
  region: 'global', // Default region
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_QUERY:
      return {
        ...state,
        query: action.payload,
      };
    case SET_COURSES:
      return {
        ...state,
        courses: action.payload,
      };
    case SET_CATEGORIES:
      return {
        ...state,
        categories: action.payload,
      };
    case SET_BLOGS:
      return {
        ...state,
        blogs: action.payload,
      };
    case SET_REGION: // Update the region in the state
      return {
        ...state,
        region: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;

