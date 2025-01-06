// "use client";
// import React, { useState, useRef } from "react";
// import { useBlogContext } from "@/utils/BlogContext"; // Import context
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faEye } from '@fortawesome/free-solid-svg-icons';
// import Image from "next/image";
// import { useRouter } from 'next/navigation';
// import { imageBasePath } from "@/utils/img.config";
// // Define Blog type
// interface Blog {
//   id: number; // Change to number
//   blog_name: string;
//   blog_content: string;
//   baseurl: string;
//   blog_writter: string;
//   blog_category: string;
//   no_of_views: number;
//   created_at: string;
//   image:string;
// }
// const ImageComponent = ({ imagePath }: { imagePath: string }) => {
//   const fullImagePath = imageBasePath + imagePath;

//   return (
//     <Image
//       src={fullImagePath}
//       alt="Student"
//       className="h-full w-full object-cover"
//       loading="lazy"
//       width={200}
//       height={200}
//       onLoad={() => {
//         // You can add any actions that should happen when the image is loaded here
//       }}
//     />
//   );
// };
// // Define Props type
// interface BlogsProps {
//   blogs: Blog[]; // Array of blog objects
//   showBlogCard?: boolean; // Optional prop to control visibility of the blog card
//   cardClassName?: string;
// }

// const CardCarousel = ({ blogs, showBlogCard, cardClassName }: BlogsProps) => {
//   if (!blogs || blogs.length === 0) {
//     return <div>No blogs available</div>; // Fallback if no blogs
//   }
//   const totalSlides = blogs ? blogs.length : 0; // Check if blogs is defined

//   const { setSelectedBlog } = useBlogContext();
//   const [isPaused, setIsPaused] = useState(false);
//   const carouselRef = useRef<HTMLDivElement>(null);
//   const router = useRouter();
//   // Handler for the 'Read More' click
//   const handleReadMoreClick = (blog: Blog) => {
//     setSelectedBlog(blog); // Set the selected blog in the context
//     router.push(`/Blog/${blog.baseurl}`);
//   };

//   // Handlers to pause and resume animation
//   const handleMouseEnter = () => {
//     setIsPaused(true);
//   };

//   const handleMouseLeave = () => {
//     setIsPaused(false);
//   };

//   return (
//     <div className="relative w-full overflow-hidden container-fluid mx-auto">
//       <div
//         className={`flex ${isPaused ? "animate-none" : "animate-Marquee"}`}
//         ref={carouselRef}
//       >
//         {/* Duplicate cards for seamless infinite loop */}
//         {[...blogs, ...blogs].map(
//           (blog, index) =>
//             showBlogCard && (
//               <div
//                 key={index}
//                 className={`flex-shrink-0 ${cardClassName} p-4`}
//                 onMouseEnter={handleMouseEnter}
//                 onMouseLeave={handleMouseLeave}
//               >
//                 {/* Individual card */}
//                 <div className="bg-white rounded-lg shadow-lg overflow-hidden lg:h-[65vh] flex flex-col p-3">
//                   {/* Image */}
//                   <div className="w-full h-40 ">
//                   <ImageComponent imagePath={`${blog.image}`|| "assets/images/ai.jpg"} />
//                     {/* <img
//                       src={blog.baseurl}
//                       alt={blog.blog_name}
//                       className="w-full h-40 object-cover"
//                     /> */}
//                   </div>

//                   {/* Content */}
//                   <div className="p-4 flex flex-col justify-between flex-grow h-full">
//                     {/* Category and Views */}
//                     <div className="mb-0 flex justify-between">
//                       <span className="text-sm text-gray-700 border border-gray-500 rounded-full px-3 text-center py-0">
//                         {blog.blog_category}
//                       </span>
//                       <span className="text-yellow-500 text-sm">
//                         <FontAwesomeIcon
//                           icon={faEye}
//                           className="mr-1 text-yellow-500 text-md"
//                         />{" "}
//                         {blog.no_of_views}
//                       </span>
//                     </div>

//                     {/* Title and Content */}
//                     <div className="flex-grow overflow-hidden h-25">
//                       <h2 className="text-lg font-bold text-gray-800 mb-2 lg:h-10 1024-1200:h-14 text-wrap">
//                         {blog.blog_name}
//                       </h2>
//                       <p className="text-gray-700 line-clamp-3 mb-0" dangerouslySetInnerHTML={{ __html: blog.blog_content.slice(0, 50) }}>
//                       </p>
//                     </div>

//                     {/* Divider */}
//                     <hr className="bg-gray-600 w-full mb-2" />

//                     <div className="flex flex-col md:flex-row justify-between items-center ">
//                       {/* Left Column: Author and Date */}
//                       <div>
//                       on{" "}
//                         <span className="text-yellow-500 text-sm text-nowrap">{blog.created_at}</span>
//                         <p className="text-sm text-gray-500">
//                           by{" "}
//                           <span className="text-darkBlue text-md text-bold">
//                             {" "}
//                             {blog.blog_writter}{" "}
//                           </span>
                         
//                         </p>
//                       </div>

//                       {/* Right Column: Read More Link */}
//                       <div className="mt-3 md:mt-0 md:ml-6">
                       
//                           <a
//                             className="text-maincolor_1 text-nowrap  hover:text-blue-700 mb-3 cursor-pointer"
//                             onClick={() => handleReadMoreClick(blog)}
//                           >
//                             Read More
//                           </a>
                        
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             )
//         )}
//       </div>
//     </div>
//   );
// };

// export default CardCarousel;
"use client";

import React, { useState, useRef } from "react";
import { useBlogContext } from "@/utils/BlogContext"; // Import context
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBook, faEye } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { imageBasePath } from "@/utils/img.config";

// Define Blog type
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
      alt="Student"
      className="h-full w-full object-cover"
      loading="lazy"
      width={200}
      height={200}
    />
  );
};

// Define Props type
interface BlogsProps {
  blogs: Blog[]; // Array of blog objects

  cardClassName?: string;
}

const CardCarousel = ({ blogs, cardClassName = "" }: BlogsProps) => {
  // Hooks must be declared at the top level
  const { setSelectedBlog } = useBlogContext();
  const [isPaused, setIsPaused] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  if (!blogs || blogs.length === 0) {
    return <div>No blogs available</div>; // Fallback if no blogs
  }

  // Handler for the 'Read More' click
  const handleReadMoreClick = (blog: Blog) => {
    setSelectedBlog(blog); // Set the selected blog in the context
    router.push(`/blog/${blog.baseurl}`);
  };

  // Handlers to pause and resume animation
  const handleMouseEnter = () => {
    setIsPaused(true);
  };

  const handleMouseLeave = () => {
    setIsPaused(false);
  };

  return (
    <div className="relative w-full overflow-hidden container-fluid mx-auto">
      <div
        className={`flex ${isPaused ? "animate-none" : "animate-Marquee"}`}
        ref={carouselRef}
      >
        {/* Duplicate cards for seamless infinite loop */}
        {[...blogs, ...blogs].map((blog, index) => (
          <div
            key={index}
            className={`flex-shrink-0 ${cardClassName} p-4`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            {/* Individual card */}
            <div className=" relative bg-white rounded-lg shadow-lg overflow-hidden lg:h-[65vh] flex flex-col p-3">
              {/* Image */}
              <span className="absolute top-1 right-0 bg-maincolor_1 text-white text-xs font-semibold px-3 py-1 "
        style={{
          clipPath: 'polygon(0 0, 100% 0, 100% 51%, 100% 99%, 0 99%, 5% 50%)'
        }}>
    {blog.blog_category}
  </span>
              <div className="w-full h-40 ">
                <ImageComponent imagePath={blog.image || "assets/images/ai.jpg"} />
              </div>

              {/* Content */}
              <div className="p-4 flex flex-col justify-between flex-grow h-full">
                {/* Category and Views */}
                <div className="mb-0 flex justify-between">
                  {/* <span className="text-sm text-gray-700 border border-gray-500 rounded-full px-3 text-center py-0">
                    {blog.blog_category}
                  </span> */}
                  <span className="text-yellow-500 text-sm">
                    <FontAwesomeIcon
                      icon={faEye}
                      className="mr-1 text-yellow-500 text-md"
                    />{" "}
                    {blog.no_of_views}
                  </span>
                </div>

                {/* Title and Content */}
                <div className="flex-grow overflow-hidden h-25">
                  <h2 className="text-lg font-bold text-gray-800 mb-2 lg:h-10 1024-1200:h-14 text-wrap overflow-hidden text-ellipsis whitespace-nowrap">
                    {blog.blog_name}
                  </h2>
                  <p
                    className="text-gray-700 line-clamp-3 mb-0"
                    dangerouslySetInnerHTML={{
                      __html: blog.blog_content.slice(0, 50),
                    }}
                  ></p>
                </div>

                {/* Divider */}
                <hr className="bg-gray-600 w-full mb-2" />

                <div className="flex flex-col md:flex-row justify-between items-center ">
                  {/* Left Column: Author and Date */}
                  <div>
                          <span className="text-sm text-black font-bold"> By{" "}</span>
                         
                        
                            <span className="text-maincolor_1 text-md font-bold capitalize text-wrap overflow-hidden text-ellipsis whitespace-nowrap">
                              {blog.blog_writter}
                            </span>
                            <p className="text-sm text-gray-500 flex flex-col">
                          
                            <span className="text-yellow-500 text-sm">  on{" "}
  {new Date(blog.created_at).toISOString().split('T')[0]}
</span>


                          </p>
                        </div>


                  {/* Right Column: Read More Link */}
                  <div className="mt-3 md:mt-0 md:ml-6">
                                            <button
                      className="btn-solid-bg-transition btn-solid-bg-transition-orange   px-2 py-1 flex items-center"
                      onClick={() => handleReadMoreClick(blog)}
                    >
                      <span className="flex items-center text-nowrap  gap-2">Read More
                      <FontAwesomeIcon icon={faBook} className="fa fa-arrow-right animate-pulse"/></span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CardCarousel;

