"use client";

import React, { useEffect, useState, useCallback, useMemo } from "react";
import { useParams } from "next/navigation";
import Head from "next/head";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight, faStar, faCheck, faStarHalfAlt } from "@fortawesome/free-solid-svg-icons";
import { faStar as faStarOutline } from "@fortawesome/free-regular-svg-icons";
import { faCanadianMapleLeaf } from "@fortawesome/free-brands-svg-icons";
import PayScale from "@/components/PayScale";
import CourseCurriculum from "@/components/CourseCurriculum";
import Certificate from "@/components/Certificate";
import HiringPartners from "@/components/HiringPartners";
import TrendingCoursesInIT from "@/components/TrendingCoursesInIT";
import FAQComponent from "@/components/Faq";
import Reviews from "@/components/Reviews";
import TypesOfTraining from "@/components/TypesOfTraining";
import DwnldAdvisorModalForm from "pages/forms/advisorfrm";
import { imageBasePath } from "@/utils/img.config";
import CourseTools from "@/components/CourseTools";
import Image from "next/image";
import BatchDetails from "@/components/CourseCardSchedule";
import ProjectCards from "@/components/CourseProjects";
type BatchDetail = {
  batchStartDate: string;
  batchTimings: string;
  batchDays: string;
};
type Course = {
  title: string;
  description: string;
  category: string;
  courseNote: string;
  reviews: string;
  rating: number;
  meta_keyword: string;
  meta_title: string;
  meta_courseNote: string;
  image: string;
  highlights_1: string[];
  highlights_2: string[];
  highlights_3: string[];
  batchDetails: BatchDetail[];
  skills: string[];
};
type FAQ = {
  question: string;
  answer: string;
};

const CourseDetails: React.FC = () => {
  const params = useParams();
  const course_url = params?.course_url || '';
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [courseSkills, setCourseSkills] = useState<string[]>([]);
  const [faqData, setFaqData] = useState<FAQ[]>([]);
  const [activeForm, setActiveForm] = useState<string | null>(null); // Track active form
  const [modalKey, setModalKey] = useState<number>(0); // Unique key to force re-render


  const toggleForm = (formName: string) => {
    setActiveForm(formName);
    setModalKey((prevKey) => prevKey + 1); // Ensure the modal always re-renders
  };
  const handleModalClose = () => {
    setActiveForm(null); // Close all forms
  };


  const ImageComponent: React.FC<{ imagePath: string }> = ({ imagePath }) => {
    const  fullImagePath = imagePath ? `${imageBasePath}${imagePath}` : "/assets/images/default-course.png";

    return (
      <Image
        src={fullImagePath}
        alt="Student"
        className="h-full object-cover rounded-lg"
        loading="lazy"
        width={500}
        height={400}
        onLoad={() => { }}
      />
    );
  };

  const fetchCourseData = useCallback(async () => {
    if (!course_url) return;

    try {
      setLoading(true);
      const response = await fetch(
        `http://13.232.95.229:3000/course/basicInfo?courseUrl=${course_url}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch course details");
      }

      const data = await response.json();
      if (Array.isArray(data) && data.length > 0) {
        const courseData = data[0];
        setCourse(courseData);

        const skillsResponse = await fetch(
          `http://13.232.95.229:3000/course/courseSkills?courseUrl=${course_url}`
        );

        if (!skillsResponse.ok) {
          throw new Error("Failed to fetch course skills");
        }

        const skillsData = await skillsResponse.json();
        const skills = Array.isArray(skillsData)
          ? skillsData.map((skill: { skills: string }) => skill.skills)
          : [];
        setCourseSkills(skills);
      } else {
        setCourse(null);
        setCourseSkills([]);
      }
      const faqResponse = await fetch(
        `http://13.232.95.229:3000/course/courseFaq?courseUrl=${course_url}`
      );

      if (!faqResponse.ok) {
        throw new Error("Failed to fetch FAQ data");
      }
      const faqData = await faqResponse.json();
      setFaqData(faqData);
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Error fetching course data");
      }
    } finally {
      setLoading(false);
    }
  }, [course_url]);

  useEffect(() => {
    fetchCourseData();
  }, [fetchCourseData]);


  const seoTitle = useMemo(() => `${course?.title} - Course Details`, [course]);
  const seoDescription = useMemo(() => course?.description || '', [course]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!course) return <div>Course not found</div>;

  return (
    <div>
      <Head>
        <title>{seoTitle}</title>
        <meta name="description" content={seoDescription} />
        <meta name="keywords" content={course?.meta_keyword} />
        <meta name="robots" content="index, follow" />
      </Head>
      <div className="max-w-7xl mx-auto sm-p-0 md:gradient-bg-section rounded-lg">
      <div className="p-5 sm:p-6 z-10 relative">
          <div className="text-sm text-purple-100 mb-2 flex space-x-1">
            <Link
              href="/"
              className="text-darkBlue hover:text-maincolor_1 font-semibold"
            >
              Home
            </Link>
            <span>
              <FontAwesomeIcon
                icon={faChevronRight}
                className="text-gray-800 mx-2"
              />
            </span>
            <span className="text-maincolor_1 font-semibold">
              {course.title}
            </span>
          </div>
        </div>

        {/* Hero Banner Section */}
        <div className="relative flex flex-col md:flex-row bg-transparent rounded-lg overflow-hidden z-auto lg:gradient-bg-section before:content-none md:before:content-['']">
          <div className="order-2 md:order-1 md:w-3/4 p-4 z-auto">
            <h1 className="text-3xl font-semibold text-gray-800 mb-4 text-wrap  glitter_text">
              {course.title}
            </h1>
            <div className="flex items-center mb-4">
              <div className="flex text-yellow-400">
              {Array(5) // Assuming ratings are out of 5
  .fill(0)
  .map((_, index) => {
    if (index < Math.floor(course.rating)) {
      // Full star for integers
      return <FontAwesomeIcon key={index} icon={faStar} />;
    } else if (index < course.rating) {
      // Half star for fractional part
      return <FontAwesomeIcon key={index} icon={faStarHalfAlt} />;
    } else {
      // Empty star for remaining
      return <FontAwesomeIcon key={index} icon={faStarOutline} />;
    }
  })}
              </div>
              <span className="ml-2 text-gray-600">
                {course.reviews}
              </span>
            </div>

            <p className="text-gray-700 mb-6 text-wrap text-sm md:text-md">
              Become a Certified <strong>{course.title} </strong>Developer and
              boost your career with the <strong>{course.title}</strong> Course!
            </p>

            {/* <div
  className="text-gray-600  text-wrap"
  dangerouslySetInnerHTML={{
    __html: course.courseNote.replace(
      /<p>/g,
      '<p class="mb-2 text-wrap">'
    ),
  }}
/> */}

            <ul className="space-y-2 mb-6 text-gray-600">
              <li className="flex items-start">
                <span className="text-green-500 mr-2">
                  <FontAwesomeIcon
                    icon={faCanadianMapleLeaf}
                    className="text-mainBlue font-semibold"
                  />
                </span>
                <p className="text-wrap text-xs md:text-md" dangerouslySetInnerHTML={{ __html: course.highlights_1 }}></p>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">
                  <FontAwesomeIcon
                    icon={faCanadianMapleLeaf}
                    className="text-mainBlue font-semibold"
                  />
                </span>
                <p className="text-wrap text-xs md:text-md" dangerouslySetInnerHTML={{ __html: course.highlights_2 }}></p>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">
                  <FontAwesomeIcon
                    icon={faCanadianMapleLeaf}
                    className="text-mainBlue font-semibold"
                  />
                </span>
                <p className="text-wrap text-xs md:text-md" dangerouslySetInnerHTML={{ __html: course.highlights_3 }}></p>
              </li>
            </ul>
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => toggleForm("advisorForm")}
                className="bg-maincolor_1 text-white py-4 px-6 rounded-lg font-semibold transition hover:text-white hover:border-mainBlue flex items-center justify-center"
              >
                Talk to Advisor
              </button>
              {activeForm === "advisorForm" && (
                <DwnldAdvisorModalForm
                  imageSrc="/assets/images/advisor.png"
                  key={modalKey}
                  formName="Course"
                  title="Discuss with an Expert"
                  text="Provide your information below to get your course syllabus delivered through WhatsApp and Email"
                  closeModal={handleModalClose} // Close modal using the same toggle function
                  modalclassname=""
                  downloadPdf={false} // Disable PDF download
                />
              )}
              <button
                className="hover-bg-transition w-full md:w-auto border-2 border-gray-800 text-gray-800 py-4 px-6 rounded-lg font-semibold transition hover:text-white hover:border-mainBlack flex items-center justify-center"
                onClick={() => toggleForm("brochureForm")}
              >
                <span>Download Brochure</span>
              </button>
              {activeForm === "brochureForm" && (  // Prevent advisor modal from opening when brochure is active
                <DwnldAdvisorModalForm
                  imageSrc="/assets/images/dwnldbrchrimg.png"
                  key={modalKey}
                  formName="Brochure"
                  title="Download the syllabus"
                  text="Provide your information below to get your course syllabus delivered through WhatsApp and Email"
                  closeModal={handleModalClose}
                  downloadPdf={true} // Enable PDF download
                />
              )}
            </div>
          </div>
          <div className="order-1 md:order-2 md:w-1/2 p-4 flex justify-center items-center z-1">
            <div className="relative w-full max-w-sm">
            <ImageComponent imagePath={course.image ? `management/uploads/course_image/${course.image}`:""} />
            </div>
          </div>
        </div>
      </div>
      <BatchDetails course_url={course_url as string} />
      <TypesOfTraining />
      <div className="bg-gray-100 flex justify-center py-12">
        <div className="bg-white max-w-6xl w-full p-8 rounded-lg shadow-lg bg-Bg1 bg-cover">
          <h2 className="text-xl md:text-2xl font-bold mb-8 relative elements ">Skills Covered In <span className="glitter_text">{course.title}</span></h2>
          <div className="flex flex-wrap gap-4">
            {courseSkills.length > 0 ? (
              courseSkills.map((skill, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 flex items-center px-4 py-2 bg-gray-100 rounded-lg shadow md:whitespace-nowrap"
                >
                  <FontAwesomeIcon icon={faCheck} className="text-green-500 mr-2 text-xl" />
                  <span className="text-gray-700 font-medium">{skill}</span>
                </div>
              ))
            ) : (
              <p>No skills available for this course.</p>
            )}
          </div>
        </div>
      </div>
      <PayScale courseUrl={course_url as string} />
      <div className="bg-gray-100 flex justify-center py-12">
        <div className="w-full flex-col justify-center items-center bg-white max-w-6xl p-8 rounded-lg shadow-lg bg-Bg1 bg-cover mx-auto">
          <h1 className="text-lg md:text-2xl font-bold mb-8 relative element text-center pb-2">
            <span className="glitter_text text-xl md:text-3xl ">{course.title}</span> Curriculum
          </h1>
          <CourseCurriculum courseUrl={course_url as string} courseDetails={course} />
        </div>
        </div>
        <Certificate />
        <HiringPartners title={
          <>
            <h2 className="text-xl md:text-2xl font-bold">
              Empowering Students with <span className="text-maincolor_1 text-lg md:text-3xl glitter_text"> Industry-Focused Training </span>
            </h2>
          </>
        } />
        <CourseTools courseUrl={course_url as string} />
        <TrendingCoursesInIT text="Popular Trending Courses in IT Companies" />
        <ProjectCards/>
        <FAQComponent faqData={faqData} />
        <Reviews />
      </div>
      );
};

      export default CourseDetails;
