"use client";
import { useEffect, useState, useCallback } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBook, faEye } from "@fortawesome/free-solid-svg-icons";
import { useBlogContext } from "@/utils/BlogContext";
import { useRouter } from "next/navigation";
import { imageBasePath } from "@/utils/img.config";

import Image from "next/image";

interface Blog {
  id: number;
  blog_name: string;
  blog_content: string;
  baseurl: string;
  blog_writter: string;
  blog_category: string;
  no_of_views: number;
  created_at: string;
  image: string;
}

const ImageComponent = ({ imagePath }: { imagePath: string }) => {
  const fullImagePath = imageBasePath + imagePath;
  return (
    <Image
      src={fullImagePath}
      alt="Blog"
      className="h-full w-full object-cover rounded-t-lg"
      loading="lazy"
      width={200}
      height={200}
    />
  );
};

const BlogPage = () => {
  const { setSelectedBlog } = useBlogContext();
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");
  const router = useRouter();
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const scrollContainer = document.querySelector(".animate-scroll") as HTMLElement;
    if (scrollContainer) {
      scrollContainer.style.animationPlayState = isPaused ? "paused" : "running";
    }
  }, [isPaused]);

  const fetchBlogs = useCallback(async () => {
    const sessionKey = "blogsData"; // Key for session storage
  
    // Check for cached data in session storage
    const cachedData = sessionStorage.getItem(sessionKey);
  
    if (cachedData) {
      try {
        const parsedData = JSON.parse(cachedData);
        console.log("Loaded data from session storage:", parsedData);
        setBlogs(parsedData); // Update state with cached data
        setLoading(false); // Data is already loaded
        return;
      } catch (error) {
        console.error("Error parsing cached data. Removing corrupted cache.");
        sessionStorage.removeItem(sessionKey); // Remove corrupted data
      }
    }
  
    // Fetch data from the API
    try {
      console.log("Fetching data from API...");
      const response = await fetch("http://13.235.70.111:3000/common/getHomePageBlogsLists");
      if (!response.ok) {
        throw new Error(`Error fetching blogs: ${response.statusText}`);
      }
      const apiData = await response.json();
  
      console.log("Fetched data from API:", apiData);
  
      // Duplicate blogs for seamless looping
      const updatedData = [...apiData, ...apiData, ...apiData];
  
      // Store the API data in session storage
      sessionStorage.setItem(sessionKey, JSON.stringify(updatedData));
      console.log("Data saved to session storage:", updatedData);
  
      setBlogs(updatedData); // Update state with API data
    } catch (err: unknown) {
      console.error("Error fetching blogs from API:", err);
  
      // If the API fails, attempt to use cached data
      if (cachedData) {
        const fallbackData = JSON.parse(cachedData);
        console.log("Using fallback data from session storage:", fallbackData);
        setBlogs(fallbackData); // Use cached data
      } else {
        console.error("No cached data available. Unable to render blogs.");
        setBlogs([]); // Set to empty state if no data is available
      }
  
      if (err instanceof Error) {
        setError(err.message); // Set error message for display
      } else {
        setError("An unknown error occurred");
      }
    } finally {
      setLoading(false); // Ensure loading state is updated
    }
  }, []);
  

  useEffect(() => {
    fetchBlogs();
  }, [fetchBlogs]);

  const handleReadMoreClick = (blog: Blog) => {
    setSelectedBlog(blog);
    router.push(`/blog/${blog.baseurl}`);
  };

  const handleMouseEnter = () => {
    setIsPaused(true);
  };

  const handleMouseLeave = () => {
    setIsPaused(false);
  };

  if (loading) return <div>Loading blogs, please wait...</div>;
  if (error) return <div>Error: {error}</div>;
  if (blogs.length === 0) return <div>No blogs available.</div>;

  return (
    <div className="my-20">
      <h1 className="font-bold mb-12 w-full md:w-4/5 text-center mx-auto glitter_text elementl relative pb-4 text-2xl md:text-3xl">Trending Blogs</h1>
      <div className="overflow-hidden relative w-full pb-12">
        <div
          className="flex animate-scroll whitespace-nowrap"
          style={{
            animation: "scroll 20s linear infinite", // infinite scroll animation
            willChange: "transform",
          }}
        >
          {blogs.map((blog, index) => (
            <div
              key={`${blog.id}-${index}`}
              className="relative inline-block w-[300px] md:w-[350px] rounded-lg shadow-md mx-4 cursor-pointer"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <span
                className="absolute top-1 right-1 bg-maincolor_1 text-white text-xs font-semibold px-3 py-1 z-10"
                style={{ clipPath: 'polygon(0 0, 100% 0, 100% 51%, 100% 99%, 0 99%, 5% 50%)' }}
              >
                {blog.blog_category}
              </span>
              <div className="w-full h-[150px]">
                <ImageComponent imagePath={`${blog.image}` || "assets/images/ai.jpg"} />
              </div>
              <div className="p-4 pb-2 flex flex-col w-[300px]">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-yellow-500 text-sm">
                    <FontAwesomeIcon icon={faEye} className="mr-1 text-yellow-500 text-md" />
                    {blog.no_of_views}
                  </span>
                </div>
                <div className="flex-grow overflow-hidden h-25">
                  <h2 className="text-lg font-bold text-gray-800 mb-2 lg:h-10 1024-1200:h-14 text-wrap overflow-hidden text-ellipsis whitespace-nowrap">
                    {blog.blog_name}
                  </h2>
                  <p className="text-gray-700 line-clamp-3 mb-3 text-wrap text-sm md:text-xl" dangerouslySetInnerHTML={{ __html: blog.blog_content }}></p>
                </div>
                <hr className="bg-gray-600 w-full mb-0" />
                <p className="text-sm mt-2 text-gray-500">
                  on <span className="text-yellow-500 text-sm">{new Date(blog.created_at).toISOString().split('T')[0]}</span>
                </p>
                <div className="flex pt-0 justify-between items-center">
                  <span className="text-maincolor_1 font-bold capitalize text-wrap overflow-hidden text-ellipsis whitespace-nowrap">
                    <span className="text-black"> By{" "}</span>
                    {blog.blog_writter}
                  </span>
                  <button
                    className="btn-solid-bg-transition btn-solid-bg-transition-orange px-2 py-1 flex items-center"
                    onClick={() => handleReadMoreClick(blog)}
                  >
                    <span className="flex items-center text-nowrap gap-2">Read More
                      <FontAwesomeIcon icon={faBook} className="fa fa-arrow-right animate-pulse" /></span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-33.33%);
          }
        }

        .animate-scroll {
          display: flex;
          animation: scroll 20s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default BlogPage;