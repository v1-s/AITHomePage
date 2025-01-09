"use client";

import { useBlogContext } from "@/utils/BlogContext";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { faThumbTack, faChevronRight, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import BannerPromo from "@/components/BannerPromotion";
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
  const [activeSection, setActiveSection] = useState("section1");
  useEffect(() => {
 
    router.prefetch("/schedulePage");
  }, [router]);
  const goToSchedulePage = () => {
    router.push("/schedulePage");
  };
   // Smooth scrolling easing function
   const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (!element) return;
  
    const offset = 100; // Adjust for sticky headers
    const startPosition = window.scrollY;
    const targetPosition =
      element.getBoundingClientRect().top + startPosition - offset;
    const distance = targetPosition - startPosition;
    const duration = 800; // Duration in milliseconds
    let startTime: number | null = null;
  
    const easeInOutQuad = (t: number) =>
      t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
  
    const animateScroll = (currentTime: number) => {
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const progress = Math.min(timeElapsed / duration, 1); // Normalize time to 1
      const ease = easeInOutQuad(progress);
  
      window.scrollTo(0, startPosition + distance * ease);
  
      if (timeElapsed < duration) {
        requestAnimationFrame(animateScroll);
      }
    };
  
    requestAnimationFrame(animateScroll);
  
    // Update active section state when link is clicked
    setActiveSection(id);
  };
  
  // Observer for active link highlighting
  useEffect(() => {
  
    const sections = document.querySelectorAll("p[id]");
    const navLinks = document.querySelectorAll(".quick-links a");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = entry.target.getAttribute("id");
          const link = document.querySelector(`.quick-links a[href="#${id}"]`);
          if (entry.isIntersecting) {
            navLinks.forEach((link) => link.classList.remove("active"));
            link?.classList.add("active");
          }
        });
      },
      { rootMargin: "-120px 0px 0px 0px", threshold: 0.7 }
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);
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

  if (!blogDetails) {
    return <div className="text-center py-20">Not Loading blog details...</div>;
  }

  return (
    <div className=" mx-auto">
      <div className="bg-gray-100">
        <div className="w-full md:w-2/3 mx-auto p-4">

          <nav aria-label="breadcrumb" className=" mb-4">
            <ol className="flex mb-0 px-0">
              <li className="breadcrumb-item">
                <Link href="/" className="text-black font-bold hover:text-maincolor_1">
                  Home
                </Link>
              </li>
              <span className="mx-2 text-gray-400"><FontAwesomeIcon icon={faChevronRight} /></span>
              <li className="breadcrumb-item">
                <Link href="/blog" className="text-black font-bold hover:text-maincolor_1">Blog</Link>
              </li>
              <span className="mx-2 text-gray-400"><FontAwesomeIcon icon={faChevronRight} /></span>
              <li className="breadcrumb-item  font-bold" aria-current="page">
                {blogDetails.blog_category}
              </li>
              <span className="mx-2 text-gray-400"><FontAwesomeIcon icon={faChevronRight} /></span>
              <li className="breadcrumb-item text-maincolor_1 font-bold" aria-current="page">
                {blogDetails.blog_name}
              </li>
            </ol>
          </nav>
          <div className="flex items-center justify-between">
            <h1 className="glitter_text font-bold text-left text-2xl lg:text-3xl text-wrap overflow-hidden text-ellipsis whitespace-nowrap uppercase">
              {blogDetails.blog_category}
            </h1>
            <button
              className="btn-solid-bg-transition btn-solid-bg-transition-orange py-2 px-8"
              aria-label="Enroll now and get 20% off on all courses"
            // onClick={openAdvisorModal}
            >
              <span className="font-bold"  onClick={goToSchedulePage}>Become an Industry-Recognized Expert <FontAwesomeIcon icon={faArrowRight} className="ml-2 font-bold" /></span>
            </button>
          </div>
        </div>
      </div>

      <div className="w-full md:w-3/4 mx-auto my-10">
        <div className="hero-banner shadow-card p-8">

          <div className="w-full mx-auto flex flex-col md:flex-row gap-6 justify-center">
            <ImageComponent imagePath={`${blogDetails?.image || "assets/images/ai.jpg"}`} />
            <div className="content-center">
              <h1 className=" font-bold text-left text-maincolor_1 text-base lg:text-2xl text-wrap">
                <span> {blogDetails.blog_name}</span> : sub text need to be added abt breif(The Next Gen Big Data Analytics Framework For Stream And Batch Data Processing)
              </h1>
              <small className="font-bold">Last Updated On : <span className="text-yellow-500"> 07-01-2024</span></small>
              <div className="flex flex-col md:flex-row  items-start md:items-center my-2 text-left">
                <Image
                  src="/assets/images/4.png"
                  alt="Writer"
                  className="rounded-full mr-6 mb-2 md:mb-0"
                  width={80}
                  height={80}
                />
                <div>
                  <p className="ml-2whitespace-nowrap font-bold text-maincolor_1 capitalize">{blogDetails.blog_writter}</p>
                  <small className="text-wrap  ">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Accusantium consectetur sint nulla optio quos labore saepe voluptatum consequatur deleniti tempore vitae ea quam voluptatem corporis at asperiores sunt, a illo?</small>
                </div>
              </div>
              {/* <p>Created on <span className="text-yellow-500 text-sm">
                {new Date(blogDetails.created_at).toISOString().split('T')[0]}
              </span>
              </p> */}
            </div>
          </div>
          <div className="mt-5">
            {/* Add your content here below the image */}
          </div>
        </div>
        <hr className="border-gray-300 w-full my-5" />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-12">
          <div className="col-span-1 lg:col-span-1 mt-5 bg-white z-40 shadow-card p-4">
            <div className="quick-links sticky top-[120px]">
              <ul className="list-none">
                <h5 className="font-bold text-maincolor_1 mb-0 text-xl">
                  Page of Content
                </h5>
                <hr className="border-2 my-2 border-gray-300" />
                <li>
                  <a
                    href="#section1"
                    className={`flex items-center  p-1 rounded  group ${
                activeSection === "section1"
                  ? "text-white bg-maincolor_1"
                  : "text-maincolor_1"
              }`}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection("section1");
                    }}
                  >
                    <div className="flex items-center text-md font-bold my-1">
                      <b>
                        <FontAwesomeIcon
                          icon={faChevronRight}
                          className={`mr-1 ${
                            activeSection === "section1"
                              ? "text-white"
                              : "text-maincolor_1"
                          }`}
                        />{" "}
                      </b>
                      <span className="ml-2 ">Methodology</span>
                    </div></a>
                </li>

                <li>
                  <a
                    href="#section2"
                    className={`flex items-center text-maincolor_1 p-1  rounded group ${
                activeSection === "section2"
                  ? "text-white bg-maincolor_1"
                  : "text-maincolor_1"
              }`}
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("section2");
              }}
                  >
                    <div className="flex items-center text-md font-bold my-1">
                      <b>
                        <FontAwesomeIcon
                          icon={faChevronRight}
                          className={`mr-1 ${
                            activeSection === "section2"
                              ? "text-white"
                              : "text-maincolor_1"
                          }`}
                        />{" "}
                      </b>
                      <span className="ml-2">Methodology</span>
                    </div>
                  </a>
                </li>

                <li>
                  <a
                    href="#section3"
                    className={`flex items-center p-1  rounded group  ${
                activeSection === "section3"
                  ? "text-white bg-maincolor_1"
                  : "text-maincolor_1"
              }`}
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("section3");
              }}
            >
                    <div className="flex items-center text-md font-bold my-1">
                      <b>
                        <FontAwesomeIcon
                          icon={faChevronRight}
                          className={`mr-1  ${
                            activeSection === "section3"
                              ? "text-white"
                              : "text-maincolor_1"
                          }`}
                        />{" "}
                      </b>
                      <span className="ml-2">Conclusion</span>
                    </div>
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="blog-section col-span-2 mt-5 shadow-card p-4">
            <h2 className="text-2xl font-semibold mb-4 text-maincolor_1" id="section1">
              Main Content
            </h2>
            <p className="mb-4"  dangerouslySetInnerHTML={{ __html: blogDetails.blog_content }}></p>
            <p className="text-lg font-medium" dangerouslySetInnerHTML={{ __html: blogDetails.blog_content }}></p>

            <Image
              width={500}
              height={500}
              src="/assets/images/banner.jpg"
              className="w-full my-10"
              alt="bannerimage"
              loading="lazy"
            />
            <p className="mb-4" id="section2" dangerouslySetInnerHTML={{ __html: blogDetails.blog_content }}></p>
            <p className="text-lg font-medium" dangerouslySetInnerHTML={{ __html: blogDetails.blog_content }}></p>
            <Image
              width={500}
              height={500}
              src="/assets/images/banner.jpg"
              className="w-full my-10"
              alt="bannerimage"
              loading="lazy"
            />
            <p className="mb-4" id="section3" dangerouslySetInnerHTML={{ __html: blogDetails.blog_content }}></p>
            <p className="text-lg font-medium" dangerouslySetInnerHTML={{ __html: blogDetails.blog_content }}></p>



          </div>

          <div className="col-span-1 lg:col-span-1 mt-5 hidden lg:block">
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
          src="/assets/images/banner.jpg"
          className="w-full my-24"
          alt="bannerimage"
          loading="lazy"
        />

        <h2 className="text-2xl font-semibold mb-4 text-maincolor_1 relative elementl text-center">
          Contact Us
        </h2>
        <TrainingAdvisorForm />

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
