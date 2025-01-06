"use client";

import { useBlogContext } from "@/utils/BlogContext";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { faThumbTack } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
// import EnrollmentForm from "@/components/EnrollForm";

import { imageBasePath } from "@/utils/img.config";
import { useRouter } from 'next/router';

import TrainingAdvisorForm from "@/components/MentorForm";

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

// interface EnrollmentFormProps {
//     // ...existing properties...
//     onClose: () => void;
// }

const ImageComponent = ({ imagePath }: { imagePath: string }) => {
  const fullImagePath = imageBasePath + imagePath;

  return (
    <Image
      src={fullImagePath}
      alt="Student"
      className="object-cover rounded-lg"
      loading="lazy"
      width={500}
      height={200}
      onLoad={() => {
        // You can add any actions that should happen when the image is loaded here
      }}
    />
  );
};

const BlogDetailsPage = () => {
  const router = useRouter();
  const { baseurl } = router.query; 
  const { selectedBlog } = useBlogContext();
  const [blogDetails, setBlogDetails] = useState<Blog | null>(null);

  useEffect(() => {
    if (!selectedBlog) {
      const fetchBlogDetails = async () => {
        try {
          const response = await fetch(
            "http://13.232.95.229:3000/common/getHomePageBlogsLists"
          );
          const data = await response.json();
          const blog = data.find((b: Blog) => b.baseurl === baseurl);
          setBlogDetails(blog || null);
        } catch (error) {
          console.error("Error fetching blog details:", error);
        }
      };

      fetchBlogDetails();
    } else {
      setBlogDetails({
        ...(selectedBlog ?? {}), // If selectedBlog is null, fallback to an empty object
        image: selectedBlog?.image || "default-image-path.jpg",
      });
      // If selectedBlog is available from context
    }
  }, [baseurl, selectedBlog]);
  
  if (!selectedBlog) {
    return <div className="text-center py-20">Not Loading blog details...</div>;
  }

  return (
    <div>
      <div className="container max-w-5xl mx-auto">
        {/* Dynamic Breadcrumb Navigation */}
        <nav aria-label="breadcrumb">
          <ol className="flex mb-0 px-0 mt-5">
            <li className="breadcrumb-item">
              <Link href="/" className="text-black font-bold hover:text-maincolor_1">
                Home
              </Link>
            </li>
            <span className="mx-2 text-gray-400">/</span>
            <li className="breadcrumb-item">
              <Link href="/blog" className="text-black font-bold hover:text-maincolor_1">Blog</Link>
            </li>
            <span className="mx-2 text-gray-400">/</span>
            <li className="breadcrumb-item text-maincolor_1 font-bold" aria-current="page">
              {selectedBlog.blog_category}
            </li>
          </ol>
        </nav>
        <hr className="border-gray-300 w-full my-5" />

        <div className="hero-banner">
          <h1 className="text-blue text-left text-2xl lg:text-3xl text-maincolor_1 mb-5 elementl relative pb-4 text-wrap overflow-hidden text-ellipsis whitespace-nowrap">
            {selectedBlog.blog_name}
          </h1>
          <div className="w=full mx-auto flex justify-center">
            <ImageComponent imagePath={`${blogDetails?.image || "assets/images/ai.jpg"}`} />
          </div>
          <div className="mt-5">
            {/* Add your content here below the image */}
          </div>
        </div>

        {/* Blog Content Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
          <div className="col-span-1 md:col-span-1 mt-5 md:bg-transparent bg-white z-40">
            <div className="quick-links sticky top-[120px]">
              <ul className="list-none">
                <h5 className="font-bold text-maincolor_1 mb-0 text-xl">
                  Page of Content
                </h5>
                <hr className="border-2 my-2 border-gray-300" />
                <li>
                  <a
                    href="#section1"
                    className="flex items-center text-blue-500 p-1 hover:bg-maincolor_1 rounded hover:text-white group"
                  >
                    <b>
                      <FontAwesomeIcon
                        icon={faThumbTack}
                        className="mr-1 text-maincolor_1 text-xl group-hover:text-white"
                      />{" "}
                    </b>
                    <span>Introduction</span>
                  </a>
                  <hr className="border-1 my-1" />
                </li>

                <li>
                  <a
                    href="#section2"
                    className="flex items-center text-maincolor_1 p-1 hover:bg-maincolor_1 rounded hover:text-white group"
                  >
                    <b>
                      <FontAwesomeIcon
                        icon={faThumbTack}
                        className="mr-1 text-maincolor_1 text-xl group-hover:text-white"
                      />{" "}
                    </b>
                    <span>Methodology</span>
                  </a>
                  <hr className="border-1 my-1" />
                </li>

                <li>
                  <a
                    href="#section3"
                    className="flex items-center text-maincolor_1 p-1 hover:bg-maincolor_1 rounded hover:text-white group"
                  >
                    <b>
                      <FontAwesomeIcon
                        icon={faThumbTack}
                        className="mr-1 text-maincolor_1 text-xl group-hover:text-white"
                      />{" "}
                    </b>
                    <span>Conclusion</span>
                  </a>
                  <hr className="border-1 my-1" />
                </li>
              </ul>
            </div>
          </div>

          <div className="blog-section col-span-2 mt-5">
            <h2 className="text-2xl font-semibold mb-4 text-maincolor_1">
              Main Content
            </h2>
            <p className="mb-4" dangerouslySetInnerHTML={{ __html: selectedBlog.blog_content }}></p>
            <p className="text-lg font-medium" dangerouslySetInnerHTML={{ __html: selectedBlog.blog_content }}></p>
            <p className="uppercase text-wrap overflow-hidden text-ellipsis whitespace-nowrap">by {selectedBlog.blog_writter}</p>
            <p>Created on <span className="text-yellow-500 text-sm">
              {new Date(selectedBlog.created_at).toISOString().split('T')[0]}
            </span>
            </p>
          </div>

          <div className="col-span-1 md:col-span-1 mt-5 hidden md:block">
            {/* <div className="w-full">
              <img
                src="https://www.mbloging.com/_?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Fyynr1uml%2Fproduction%2Fd3f0ff2ab5398aaffb00fa0b3afcb238772f42e7-1024x576.jpg%3Fw%3D1024%26auto%3Dformat&w=3840&q=75"
                alt="Placeholder"
                className="w-full h-full rounded-lg object-cover"
              />
            </div> */}
          </div>
        </div>

    

        <Image
          width={500}
          height={500}
          src="/assets/images/Banner_Post.webp"
          className="w-full my-24"
          alt="bannerimage"
          loading="lazy"
        />


<h2 className="text-2xl font-semibold mb-4 text-maincolor_1 relative elementl text-center">
             Contact Us
            </h2>
        <TrainingAdvisorForm/>

{/* <EnrollmentForm
            buttonText="Enroll Now"
            showNameField={false}
            showEmailField={true}
            showMessageField={false}
            showCaptchaField={true}
            contacttext="Contact Us to Enroll!"
          /> */}
      </div>
    </div>
  );
};

export default BlogDetailsPage;
