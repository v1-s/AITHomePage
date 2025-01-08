"use client"; // Ensure this component is only rendered on the client side
import { useState, useEffect, useCallback } from "react";
import { useRouter } from 'next/navigation';
import { imageBasePath } from "@/utils/img.config";
import { useBlogContext } from "@/utils/BlogContext";
import Image from "next/image";

// Define interfaces for TypeScript
interface Blog {
  id: number; // Use unique identifier
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
      alt="Student"
      className="h-full w-full object-cover"
      loading="lazy"
      width={200}
      height={200}
    />
  );
};

interface CarouselProps {
  blogs: Blog[];
  showImage: boolean;
  showSlicedBlogs: boolean;
  showOverlayText: boolean;
  showNavigators: boolean;
  showIndicators: boolean; // Add this line
}

const Carousel: React.FC<CarouselProps> = ({
  blogs,
  showImage,
  showSlicedBlogs,
  showOverlayText,
  showNavigators,
}) => {
  const safeBlogs = blogs && blogs.length ? blogs : [];
  const { setSelectedBlog } = useBlogContext();

  // State for current blog index and slide
  const [currentBlogIndex, setCurrentBlogIndex] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);
  const intervalDuration = 5000; // Time between slide transitions in milliseconds
  const blogsPerBlock = 3; // Number of blogs to show per block
  const router = useRouter();

  // Handler for the 'Read More' click
  const handleReadMoreClick = (blog: Blog) => {
    setSelectedBlog(blog); // Set the selected blog in the context
    router.push(`/blog/${blog.baseurl}`);
  };

  // Next and Prev for main carousel
  const handleNext = useCallback(() => {
    setCurrentSlide((prevSlide) => (prevSlide === safeBlogs.length - 1 ? 0 : prevSlide + 1));
  }, [safeBlogs.length]);

  const handlePrev = useCallback(() => {
    setCurrentSlide((prevSlide) => (prevSlide === 0 ? safeBlogs.length - 1 : prevSlide - 1));
  }, [safeBlogs.length]);

  // Autoplay for sliced blogs (first 3 blogs)
  useEffect(() => {
    if (showSlicedBlogs) {
      const interval = setInterval(() => {
        setCurrentBlogIndex((prevIndex) =>
          prevIndex >= safeBlogs.length - blogsPerBlock ? 0 : prevIndex + 1
        );
      }, intervalDuration);

      return () => clearInterval(interval); // Cleanup on unmount
    }
  }, [showSlicedBlogs, safeBlogs.length, blogsPerBlock, intervalDuration]);

  // Autoplay functionality for main carousel
  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, intervalDuration);

    return () => clearInterval(interval); // Cleanup on unmount
  }, [handleNext, intervalDuration]);

  // Update current slide when currentBlogIndex changes
  useEffect(() => {
    setCurrentSlide(Math.floor(currentBlogIndex / blogsPerBlock)); // Track the current block
  }, [currentBlogIndex, blogsPerBlock]);

  // Function to handle changing slides manually
  const handleSlideChange = (index: number) => {
    setCurrentSlide(index);
    const newBlogIndex = index * blogsPerBlock;
    setCurrentBlogIndex(newBlogIndex);
  };

  return (
    <div className="relative h-full w-full lg:overflow-hidden">
      {/* Image for main carousel */}
      {showImage && safeBlogs[currentSlide]?.baseurl && (
        <div className="w-full h-64">
          <ImageComponent imagePath={`${safeBlogs[currentSlide]?.image}` || "assets/images/ai.jpg"} />
        </div>
      )}

      {/* Overlay Text for main carousel */}
      {showOverlayText && safeBlogs[currentSlide] && (
        <div className=" w-full bg-white bg-opacity-80 p-4 rounded-md">
          <h1 className="text-3xl font-bold text-gray-800 pt-2">
            {safeBlogs[currentSlide]?.blog_name}
          </h1>
          <p className="text-sm text-gray-500 mt-2">
            By<span className="capitalize font-bold"> {safeBlogs[currentSlide]?.blog_writter}</span> on  {new Date(safeBlogs[currentSlide]?.created_at).toISOString().split('T')[0]}
          </p>
          <p className="text-gray-700 mt-3" dangerouslySetInnerHTML={{ __html: safeBlogs[currentSlide]?.blog_content.slice(0, 800) }} />
          <div className="flex justify-end mt-2">
            <a
              onClick={() => handleReadMoreClick(safeBlogs[currentSlide])}
              className="btn-hover-bg-transition btn-hover-bg-transition-og px-14 text-black py-1 px-5 border border-gray-500 px-10 cursor-pointer"
            >
              <span> Read More</span>
            </a>
          </div>
        </div>
      )}

      {/* Carousel Navigation */}
      {showNavigators && (
        <>
          <button
            onClick={handlePrev}
            className="absolute left-2 top-1/3 transform -translate-y-1/2 bg-maincolor_1 text-white p-2 rounded-full shadow-lg hover:bg-gray-600"
          >
            &#8592;
          </button>
          <button
            onClick={handleNext}
            className="absolute right-2 top-1/3 transform -translate-y-1/2 bg-maincolor_1 text-white p-2 rounded-full shadow-lg hover:bg-gray-600"
          >
            &#8594;
          </button>
        </>
      )}

      {/* Display Only First 3 Blog Posts (Sliced Blogs) */}
      {showSlicedBlogs && safeBlogs.length > 0 && (
        <div className="space-y-6">
          {/* Display blogs in blocks of 3 */}
          {safeBlogs.slice(currentBlogIndex, currentBlogIndex + blogsPerBlock).map((blog) => (
            <div key={blog.baseurl} className="rounded-md px-0 w-full">
              <h1 className="text-sm font-semibold text-gray-800 text-wrap overflow-hidden text-ellipsis whitespace-nowrap">{blog.blog_name}</h1>
              <p className="text-xs text-maincolor_1 mt-2 capitalize font-bold text-wrap overflow-hidden text-ellipsis whitespace-nowrap">
              <span className="text-black font-bold">  By {""}</span> {blog.blog_writter} on
                <span className="text-yellow-500 text-sm">
                  {new Date(blog.created_at).toISOString().split('T')[0]}
                </span>
              </p>
              <button
                className="text-maincolor_1 border border-black rounded-full px-3 hover:text-blue-700 hover:underline my-2"
                onClick={() => handleReadMoreClick(blog)}
              >
                {blog.blog_category}
              </button>
              <hr className="bg-gray-800 w-full" />
            </div>
          ))}

          {/* Show indicators only after all blogs (3 blogs per block) */}
          {safeBlogs.length > 0 && (
            <div className="flex justify-center space-x-2 mt-4">
              {/* Only show indicators for the blocks (not for every blog) */}
              {Array.from({ length: Math.ceil(safeBlogs.length / blogsPerBlock) }).map((_, blockIndex) => {
                // Show only 4 indicators, corresponding to the first 4 blocks
                if (blockIndex < 4) {
                  return (
                    <button
                      key={blockIndex}
                      onClick={() => handleSlideChange(blockIndex)} // Update the active block on click
                      className={`w-3 h-3 rounded-full ${
                        currentSlide === blockIndex
                          ? "bg-maincolor_1" // Active indicator color
                          : "bg-gray-400" // Inactive indicator color
                      }`}
                    ></button>
                  );
                }
                return null;
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Carousel;


