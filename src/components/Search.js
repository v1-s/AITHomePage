"use client";
import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { fetchCategories, fetchCourses } from "../redux/apiSlice";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/router";

const Search = () => {
   const router = useRouter();
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.api.categories);
  const courses = useSelector((state) => state.api.courses);

  const [showResults, setShowResults] = useState(false);
  const [filterQuery, setFilterQuery] = useState(""); // For filtering inside results
  const [selectedCategory, setSelectedCategory] = useState(""); // Track selected category
  const [popularSearches, setPopularSearches] = useState([]); // Track last search inputs
  const [timeoutId, setTimeoutId] = useState(null); // Timer for popular searches

  const dropdownRef = useRef(null);

  // Prevent SSR hydration issues
  const [isHydrated, setIsHydrated] = useState(false);
  useEffect(() => setIsHydrated(true), []);

  // Handle top search bar click
  const handleOpenSearch = () => {
    setShowResults(true);
    setFilterQuery(""); // Clear query when opening the search results
    setSelectedCategory(""); // Reset selected category
  };
  const handleCourseSearch = (courseUrl) => {
    router.push(courseUrl); // Navigate to the course URL
  };

  // Handle inner search bar input change
  const handleFilterChange = (e) => {
    const value = e.target.value;
    setFilterQuery(value);
    setSelectedCategory("");
    // Clear previous timeout and set a new one for popular searches
    if (timeoutId) clearTimeout(timeoutId);
    const newTimeoutId = setTimeout(() => {
      if (value && !popularSearches.includes(value)) {
        setPopularSearches((prev) => [value, ...prev].slice(0, 5)); // Limit to last 5 searches
      }
    }, 2000); // Wait 5 seconds before adding to popular searches
    setTimeoutId(newTimeoutId);
  };

  // Close results when clicking outside or back button
  const handleCloseSearch = () => {
    setShowResults(false);
    setFilterQuery(""); // Clear filter query
    setSelectedCategory(""); // Reset selected category
  };

  // Fetch categories and courses on mount
  useEffect(() => {
    if (isHydrated) {
      dispatch(fetchCategories());
      dispatch(fetchCourses());
    }
  }, [dispatch, isHydrated]);

  // Handle category click
  const handleCategoryClick = (category) => {
    setSelectedCategory(category); // Set selected category
    setFilterQuery(""); // Clear query
    setShowResults(true);
  };

  // Filter results based on query or selected category
  const filteredCourses = courses.filter((course) => {
    if (selectedCategory) {
      return course.category?.toLowerCase() === selectedCategory.toLowerCase();
    }
    return course.course_name.toLowerCase().includes(filterQuery.toLowerCase());
  });

  // Prevent rendering until hydration is complete
  if (!isHydrated) return null;

  return (
    <div className="search-container relative w-full">
      {/* Top Search Bar */}
      <div
        className="flex items-center border border-maincolor_1 rounded overflow-hidden border-2 "
        onClick={handleOpenSearch}
      >
        <input
          type="text"
          placeholder="Search courses"
          className="p-2 outline-none w-full transition-all duration-300"
          readOnly
        />
        <button className="bg-maincolor_1 p-2 text-white">
          <FontAwesomeIcon icon={faSearch} className="px-3 font-bold" />
        </button>
      </div>

      {/* Full-Screen Search Results */}
      {showResults && (
        <div
          ref={dropdownRef}
          className="fixed top-0 left-0 w-screen h-screen bg-gray-50 z-50 overflow-auto"
        >
          {/* Back Button */}
          <div className="p-4 bg-white shadow-md sticky top-0 flex items-center justify-between">
          <button
  className="flex items-center justify-center w-12 h-12 rounded-full border border-grey-500 text-maincolor_1 shadow-glassShadow hover:bg-maincolor_1 hover:text-white transition-all duration-300"
  onClick={handleCloseSearch}
>
  <FontAwesomeIcon icon={faChevronLeft} className="text-lg" />
</button>

<div className="relative w-full">
  <input
    type="text"
    value={filterQuery}
    onChange={handleFilterChange}
    placeholder="Search courses"
    className="w-full px-4 py-2 pl-10 block border rounded-full focus:outline-none focus:ring-2 focus:ring-maincolor_1 focus:border-transparent transition-all duration-300"
  />
  <FontAwesomeIcon
    icon={faSearch}
    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
  />
</div>

          </div>

          <div className="flex flex-col md:flex-row px-6 py-8">
            {/* Left Sidebar */}
            <div className="w-full md:w-1/4 space-y-6">
              {/* Popular Searches */}
              <div>
                <h2 className="text-lg font-semibold mb-2">Popular Searches</h2>
                <ul className="space-y-2">
                  {popularSearches.length > 0 ? (
                    popularSearches.map((item, index) => (
                      <li key={index}>
                        <button
                          onClick={() => setFilterQuery(item)}
                          className="text-blue-500 hover:underline"
                        >
                          {item}
                        </button>
                      </li>
                    ))
                  ) : (
                    <li className="text-gray-500">No popular searches found</li>
                  )}
                </ul>
              </div>

              {/* Course Categories */}
              <div>
                <h2 className="text-lg font-semibold mb-2">Popular Course Categories</h2>
                <div className="flex flex-wrap gap-2">
                  {categories.length > 0 ? (
                    categories.map((category, index) => (
                      <button
                        key={index}
                        onClick={() => handleCategoryClick(category)}
                        className="px-4 py-2 bg-white rounded-full border border-gray-300 text-sm hover:bg-gray-100 cursor-pointer"
                      >
                        {category}
                      </button>
                    ))
                  ) : (
                    <span className="text-gray-500">No categories found</span>
                  )}
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="w-full md:w-3/4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCourses.length > 0 ? (
                filteredCourses.map((course, index) => (
                  <div
                    key={index}
                    className="flex flex-col justify-between p-4 bg-white rounded-lg shadow hover:shadow-lg transition h-full"
                    style={{ maxHeight: "300px" }} 
                  >
                    {/* Course Title */}
                    <div>
                      <h3 className="text-sm text-orange-500">
                        {course.provider}
                      </h3>
                      <h2 className="text-lg font-semibold my-2 h-14 uppercase">
                        {course.course_name}
                      </h2>
                    </div>

                    {/* Course Description */}
                    <div>
                      <p
                        className="text-sm text-gray-600 h-14"
                        dangerouslySetInnerHTML={{
                          __html:
                            course.courseShortDesc?.slice(0, 70) +
                            (course.courseShortDesc?.length > 70
                              ? "..."
                              : ""),
                        }}
                      ></p>
                      <p className="text-sm text-gray-500 flex items-center">
                        <span className="mr-1">😊</span>{" "}
                        {course.course} Satisfied Learners
                      </p>
                    </div>

                    {/* Know More Button */}
                    <div className="flex items-end justify-end mt-4">
                      <button 
                        
                        className="text-blue-500 text-sm font-medium hover:text-maincolor_1 bg-maincolor_1 text-white  px-4 py-2 rounded-md transition-all duration-300 hover:text-white"
                        onClick={() => handleCourseSearch(course.course_url)}
                      >
                        KNOW MORE →
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-500">No courses found</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;
