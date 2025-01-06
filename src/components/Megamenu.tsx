"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState, useEffect, useRef, useCallback } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight, faChevronDown, faChevronUp,faTimes} from "@fortawesome/free-solid-svg-icons";
import { imageBasePath } from "@/utils/img.config";
import Image from "next/image";

interface Course {
    course_name: string;
    course_short_name: string;
    category: string;
    course_url: string;
    course_img: string;
}

type Category = string;

interface DynamicMegaMenuProps {
    showCourseImage: boolean;
    closeMenu: () => void;
    menuclassName?: string;
    courseListclassName: string;
    showCourseList: boolean;
    showCategoryList: boolean;
    courseMainclassName: string;
    categotyclassName: string;
    region: string;
    showClose: boolean; 
}

const ImageComponent = ({ imagePath }: { imagePath: string }) => {
    const fullImagePath = imageBasePath + imagePath;

    return (
        <Image
            src={fullImagePath}
            alt="Student"
            className="w-full object-cover rounded-lg"
            loading="lazy"
            width={100}
            height={100}
        />
    );
};

const DynamicMegaMenu: React.FC<DynamicMegaMenuProps> = ({
    showCourseImage,
    closeMenu,
    menuclassName = "",
    courseListclassName = "",
    showCourseList,
    showCategoryList,
    courseMainclassName = "",
    categotyclassName = "",
    region,
    showClose
}) => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [courseData, setCourseData] = useState<{ [key: string]: Course[] }>({});
    const [activeCategory, setActiveCategory] = useState<Category>("");
    const [visibleCategory, setVisibleCategory] = useState<Category>("");
    const [hoveredCourse, setHoveredCourse] = useState<Course | null>(null);
    const [hoveredCourseImage, setHoveredCourseImage] = useState<string | null>(null);

    const router = useRouter();
    const menuRef = useRef<HTMLDivElement>(null);
    const baseUrl = 'http://13.232.95.229:3000/';

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
                closeMenu();
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [closeMenu]);

    const fetchCoursesAndCategories = useCallback(async (region: string) => {
        try {
            const response = await fetch(`${baseUrl}common/getCoursesPerCategory?region=${region}`);
            const data = await response.json();
            const categoriesAsStrings: string[] = [...new Set((data as { category: string }[]).map((course) => course.category))];
            setCategories(categoriesAsStrings);

            const coursesByCategory: { [key: string]: Course[] } = {};
            data.forEach((course: Course) => {
                if (!coursesByCategory[course.category]) {
                    coursesByCategory[course.category] = [];
                }
                coursesByCategory[course.category].push({
                    course_name: course.course_name,
                    course_short_name: course.course_short_name,
                    category: course.category,
                    course_url: course.course_url,
                    course_img: course.course_img,
                });
            });
            setCourseData(coursesByCategory);

            if (categoriesAsStrings.length > 0) {
                setActiveCategory(categoriesAsStrings[0]);
                setVisibleCategory(categoriesAsStrings[0]);
            }
        } catch (err) {
            console.error("Error fetching courses and categories:", err);
        }
    }, []);
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
                closeMenu();
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [closeMenu]);

    useEffect(() => {
        fetchCoursesAndCategories(region);
    }, [region, fetchCoursesAndCategories]);

    const handleCategoryClick = (category: Category) => {
        setVisibleCategory(category);
        setActiveCategory(category);
    };

    const handleCategoryMouseEnter = (category: Category) => {
        setVisibleCategory(category);
        setActiveCategory(category);
        setHoveredCourse(courseData[category]?.[0] || null);
    };

    const handleCourseClick = (course: Course) => {
        window.location.href = `/${course.course_url}`;
        closeMenu();
      };
      
    const handleCourseMouseEnter = async (course: Course) => {
        setHoveredCourse(course);
        setHoveredCourseImage(course.course_img);
    };

    const handleCourseMouseLeave = () => {
        setHoveredCourse(null);
        setHoveredCourseImage(null);
    };

    const currentCourses = courseData[activeCategory] || [];

    const processCategory = (category: Category) => {
        if (typeof category === "string") {
            return category.replace(/_/g, " ");
        }
        return category;
    };

    return (
        <>
            <div
                ref={menuRef}
                id="dynamicMegaMenu"
                className={`block flex flex-col sm:flex-col lg:flex-row lg:justify-center items-stretch mx-auto w-[80vw] xl:w-[80vw] 2xl:w-[80vw] shadow-card xl:min-h-0 z-100 ${menuclassName} overflow-auto max-h-[calc(100vh-20px)]`}
            >
                {showCategoryList && (
                    <div
                        id="categoryList"
                        className={`category-column overflow-y-auto flex flex-col p-4 gap-2 bg-white ${categotyclassName}`}
                    >
                         <div className="flex justify-between items-center">
                        <h3 className="font-semibold text-lg mb-4">Categories</h3>
                       {showClose && (<button
                            onClick={closeMenu}
                            className=" text-gray-800 hover:text-gray-600 rounded-full w-6 h-6 bg-black text-white border border-gray-500 md:hidden block"
                        >
                            <FontAwesomeIcon icon={faTimes} />
                        </button>
                       )}

                    </div>
                        {categories.map((category, index) => (
                            <div key={index}>
                                <button
                                    onClick={() => handleCategoryClick(category)}
                                    onMouseEnter={() => handleCategoryMouseEnter(category)}
                                    className={`text-left p-2 mb-2 flex justify-between rounded-md items-center w-full ${
                                        visibleCategory === category ? "bg-maincolor_1 text-white" : "text-black font-normal"
                                    }`}
                                    aria-label={`Select ${processCategory(category).toUpperCase()} category`}
                                >
                                    <span>{processCategory(category).toUpperCase()}</span>
                                    <div className="hidden lg:block">
                                        <FontAwesomeIcon
                                            icon={faChevronRight}
                                            className={`${visibleCategory === category ? "text-white" : "text-gray-400"}`}
                                        />
                                    </div>
                                    <div className="block lg:hidden">
                                        <FontAwesomeIcon
                                            icon={visibleCategory === category ? faChevronUp : faChevronDown}
                                            className={`${visibleCategory === category ? "text-white" : "text-gray-400"}`}
                                        />
                                    </div>
                                </button>
                                {visibleCategory === category && (
                                    <div
                                        id={`courseList-${category}`}
                                        className={`w-full mt-2 course-column flex flex-col bg-gray-50 p-4 rounded-md block lg:hidden ${courseListclassName}`}
                                    >
                                        {courseData[category]?.length > 0 ? (
                                            courseData[category].map((course: Course) => (
                                                <div
                                                    key={course.course_url}
                                                    onClick={() => handleCourseClick(course)}
                                                    onMouseEnter={() => handleCourseMouseEnter(course)}
                                                    onMouseLeave={handleCourseMouseLeave}
                                                    className="course-card p-4 border shadow hover:shadow-lg cursor-pointer mb-2 bg-white rounded-lg"
                                                >
                                                    <div className="flex flex-col items-center">
                                                        <ImageComponent imagePath={course.course_img} />
                                                        <div className="max-w-sm md:w-full">
                                                            <h4 className="font-semibold text-wrap">{course.course_name}</h4>
                                                            <p className="text-gray-600 text-sm text-wrap">{course.course_short_name}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))
                                        ) : (
                                            <p className="text-gray-500">No courses available.</p>
                                        )}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
                {showCourseList && (
                    <div
                        id="coursesList"
                        className={`w-full course-column flex flex-col p-4 bg-white hidden lg:block  ${courseMainclassName}`}
                    >
                      
                        <h3 id="courseTitle" className="font-semibold text-lg mb-4 capitalize">
                            {activeCategory ? activeCategory.replace(/_/g, " ").toUpperCase() : "Select a Category"}
                        </h3>
                      
                        <div className={`${courseListclassName}`} style={{ minHeight: "300px" }}>
                            {currentCourses.length > 0 ? (
                                currentCourses.map((course: Course) => (
                                    <Link href={`/${course.course_url}`} key={course.course_url} prefetch>
                                    <div
                                        key={course.course_url}
                                        className="course-card p-4 shadow-card hover:shadow-hard cursor-pointer relative"
                                        onClick={() => handleCourseClick(course)}
                                        onMouseEnter={() => handleCourseMouseEnter(course)}
                                        onMouseLeave={handleCourseMouseLeave}
                                    >
                                        <span className="absolute top-0 right-0 bg-maincolor_1 text-white text-xs font-bold py-1 px-3 clip-hexAgon">
                                            Trending
                                        </span>
                                        <div className="w-full h-[150px] flex items-center justify-center overflow-hidden mb-4">
                                            <ImageComponent imagePath={`${course.course_img}`} />
                                        </div>
                                        <div className="flex flex-col mt-4 h-14">
                                        <h4 className="font-normal text-lg mb-2 capitalize">{course.course_name}</h4>
                                        </div>
                                    </div>
                                    </Link>
                                ))
                            ) : (
                                <p>No courses available.</p>
                            )}
                        </div>
                    </div>
                )}
                {showCourseImage && (
                    <div
                        id="courseImage"
                        className="lg:w-1/3 image-column shadow-lg hidden lg:flex flex-col px-4 bg-white justify-center items-center"
                    >
                         {showClose &&(  <button
            onClick={closeMenu}
            className="absolute top-2 right-2 text-gray-800 hover:text-gray-600 rounded-full w-6 h-6 bg-black text-white border border-gray-500 md:block hidden"
        >
            <FontAwesomeIcon icon={faTimes} />
        </button>
                         )}

                          
                        {hoveredCourse ? (
                            <div className="w-full h-full flex items-center justify-center overflow-hidden bg-gray-50 rounded-lg shadow-md">
                                <ImageComponent imagePath={`${hoveredCourseImage || "/assets/images/hirefromus.png"}`} />
                            </div>
                        ) : (
                            <div className="text-gray-500 text-center h-64">
                                <Image src="/assets/images/datascience.jpg" alt="Student" className="w-full h-full" width={200} height={200} />
                            </div>
                        )}
                        
                    </div>
                )}
            </div>
        </>
    );
};

export default DynamicMegaMenu;