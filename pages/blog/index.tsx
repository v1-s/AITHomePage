"use client";
import Image from "next/image";
import { useBlogContext } from "@/utils/BlogContext";  // Import context
import { useState, useEffect } from "react";
import Carousel from "@/components/CarouselFunc";
import CardCarousel from "@/components/CardCarousel";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBook, faEye } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";
import EnrollmentForm from "@/components/EnrollForm";
import BannerPromo from "@/components/BannerPromotion";
import { imageBasePath } from "@/utils/img.config";

// Define interfaces for props and blog data
interface Blog {
  id: number; // Change to number
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
      width={100}
      height={100}
      onLoad={() => {
        // You can add any actions that should happen when the image is loaded here
      }}
    />
  );
};

const BlogPage = () => {
  const { setSelectedBlog } = useBlogContext();  // Use context to set selected blog
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [blogDetails, setBlogDetails] = useState<Blog[]>([]);  // Ensure the state is correctly typed
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(true); // State for loading status

  // Fetch blog details from the API
  useEffect(() => {
    const fetchBlogDetails = async () => {
      try {
        const response = await fetch('http://13.232.95.229:3000/common/getHomePageBlogsLists');
        const data = await response.json();
        console.log(data, "data");
        if (data && data.length > 0) {
          setBlogDetails(data);
          setSelectedCategory(data[0].blog_category); 
        }
      } catch (error) {
        console.error("Error fetching blog details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogDetails();
  }, []);

  // Filter blogs by selected category
  const filteredBlogs = selectedCategory
    ? blogDetails?.filter(blog => blog.blog_category === selectedCategory)
    : blogDetails;

  // Handle category click to filter blogs
  const handleCategoryClick = (category: string) => {
    setSelectedCategory(selectedCategory === category ? null : category);
  };

  // Handle 'Read More' click to select the blog
  const handleReadMoreClick = (blog: Blog) => {
    setSelectedBlog(blog);
    router.push(`/blog/${blog.baseurl}`);
  };

  return (
    <div>
      {loading ? (
        <div>Loading...</div>  // Show loading state until blogs are fetched
      ) : (
        <div>
          {/* ------------------------------hero section -------------------------------------------- */}
          <h2 className="mx-14 text-2xl md:text-4xl font-semibold my-10 text-center pb-2 glitter_text uppercase">
            <span>Blogs</span>
          </h2>

          <div className="container mx-auto px-4">
            <div className="flex flex-wrap items-center">
              {/* Text Block */}
              <div className="sm:w-full md:w-1/3 lg:w-1/2 xl:w-1/2 flex items-center">
                <div className="home-marquee__text-block">
                  <h1 className="text-xl md:text-3xl lg:text-5xl font-bold glitter_text">Where Opportunities Unfold</h1>
                  <p className="hidden md:block text-lg">
                    We are a premier platform for knowledge exchange and skill development. Discover some of our most popular resources and enhance your expertise in a variety of subjects
                  </p>
                </div>
              </div>

              {/* Image Block */}
              <div className="sm:w-full md:w-1/2 xl:w-1/2 flex justify-end order-first sm:order-none">
                <Image
                  width={500}
                  height={500}
                  src="/assets/images/blogs.png"
                  className="home-marquee__marquee-image"
                  alt="Blogs"
                  decoding="async"
                  fetchPriority="high"
                  loading="lazy"
                />
              </div>
            </div>
          </div>

          <div className="grid md:grid lg:grid-cols-4 gap-6 m-4 md:mx-45  lg:mx-20 h-full">
            {/* Right Section: Carousel */}
            <div className="md:col-span-3 relative shadow-glassShadow lg:h-[480px]">
              <Carousel
                blogs={blogDetails || []}
                showOverlayText={true}
                showImage={true}
                showIndicators={false}
                showSlicedBlogs={false}
                showNavigators={true}
              />
            </div>

            {/* Left Section: Stacked Card */}
            <div className="space-y-6 border rounded-lg shadow-lg p-6 lg:mt-0 lg:h-[480px] flex flex-col justify-center items-center sm:block">
              <h2 className="text-2xl font-semibold mb-0 text-center relative element mb-6">Trending Posts</h2>
              <Carousel
                blogs={blogDetails || []}
                showOverlayText={false}
                showImage={false}
                showIndicators={true}
                showSlicedBlogs={true}
                showNavigators={false}
              />
            </div>
          </div>


          <div className="m-4 md:mx-45 my-14 mb-20">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left Column: Categories */}
              <div className="lg:col-span-1 ">
                <div className="sticky top-[15%] p-4 shadow-card">
                  <h4 className="text-xl font-semibold mb-8 relative elements pb-1">Categories</h4>
                  <ul className="space-y-2">
                    {[...new Set(blogDetails?.map((blog) => blog.blog_category))].map((category) => (
                      <li key={category}>
                        <button
                          onClick={() => handleCategoryClick(category)}
                          onMouseEnter={() => setHoveredCategory(category)}
                          onMouseLeave={() => setHoveredCategory(null)}
                          className={`block px-4 py-2 rounded-lg w-full text-left capitalize ${
                            (selectedCategory === category && hoveredCategory !== category)
                              ? "bg-maincolor_1 text-white"  // Active state
                              : "text-slate-700 font-semibold hover:bg-maincolor_1 hover:text-white hover:rounded-lg hover:border hover:border-gray"
                          }`}
                        >
                          {category}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Right Column: Blog Cards */}
              <div className="lg:col-span-2 p-4">
                <h3 className="mb-4 text-2xl font-semibold text-left relative elements mb-8 pb-1">Programming Blog Posts</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
                  {filteredBlogs?.map((blog) => (
                    <div key={blog.baseurl} className="p-4 h-full flex-shrink-0 rounded-lg shadow-lg flex flex-col w-full relative">
                      <span className="absolute top-1 right-0 bg-maincolor_1 text-white text-xs font-semibold px-3 py-1"
                        style={{
                          clipPath: 'polygon(0 0, 100% 0, 100% 51%, 100% 99%, 0 99%, 5% 50%)'
                        }}>
                        {blog.blog_category}
                      </span>
                      <div className="w-full h-35">
                        <ImageComponent imagePath={`${blog.image}` || "assets/images/ai.jpg"} />
                      </div>
                      <div className="p-4 flex flex-col justify-between flex-grow h-full">
                        {/* Category and Views */}
                        <div className="mb-0 flex justify-between">
                          <span className="text-yellow-500 text-sm">
                            <FontAwesomeIcon
                              icon={faEye}
                              className="mr-1 text-yellow-500 text-md"
                            />{" "}
                            {blog.no_of_views}
                          </span>
                        </div>

                        {/* Title and Content */}
                        <div className="flex-grow overflow-hidden h-25 mt-2">
                          <h2 className="text-lg font-bold text-gray-800 mb-2 lg:h-12 1024-1200:h-14 break-words text-wrap overflow-hidden text-ellipsis whitespace-nowrap">
                            {blog.blog_name}
                          </h2>
                          <p className="text-gray-700 line-clamp-3 mb-3 text-wrap" dangerouslySetInnerHTML={{ __html: blog.blog_content }}>
                          </p>
                        </div>

                        {/* Divider */}
                        <hr className="bg-gray-600 w-full mb-3" />

                        <div className="flex flex-col md:flex-row justify-between items-center">
                          {/* Left Column: Author and Date */}
                          <div className="flex gap-2 items-center">
                            <span className="text-sm text-black font-bold"> by{" "}</span>
                            <span className="text-maincolor_1 text-md font-bold capitalize text-wrap overflow-hidden text-ellipsis whitespace-nowrap">
                               {blog.blog_writter}
                            </span>
                            <span className="text-sm text-gray-500">
                              on{" "}
                              <span className="text-yellow-500 text-sm">
                                {new Date(blog.created_at).toISOString().split('T')[0]}
                              </span>
                            </span>
                          </div>

                          {/* Right Column: Read More Link */}
                          <div className="mt-3 md:mt-0 md:ml-6">
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
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

         <div className="container mx-auto px-4">
         <EnrollmentForm
            buttonText="Enroll Now"
            showNameField={false}
            showEmailField={true}
            showMessageField={false}
            showCaptchaField={true}
            contacttext="Contact Us to Enroll!"
          />
         </div>
          <div className="md:container mx-auto py-5 my-10">
            <h3 className="mb-4 text-3xl font-semibold text-center glitter_text relative element pb-2 mb-6">Latest Blog Posts</h3>
            <CardCarousel blogs={blogDetails || []} cardClassName="w-full sm:w-1/2 md:w-1/3 lg:w-[350px] xl:w-1/3" />
          </div>

          <BannerPromo />
        </div>
      )}
    </div>
  );
};

export default BlogPage;