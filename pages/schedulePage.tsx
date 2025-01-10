// "use client";

// import React, { useEffect, useState, useMemo,useRef} from "react";
// import { useRouter } from "next/router";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faChevronRight, faHome } from "@fortawesome/free-solid-svg-icons";
// import DwnldAdvisorModalForm from "./forms/advisorfrm";

// // Adjust the path as necessary

// // Define types for Course and Schedule
// interface Course {
//   id: number;
//   category: string;
//   course_url: string;
//   course_name: string;
// }

// interface Schedule {
//   id: number;
//   timeSlot: string;
//   date: string;
//   time: string;
//   timezone: string;
//   batch: string;
//   instructor: string;
//   mode: string;
//   price: number;
//   discountPrice: number;
//   tag: string;
// }

// interface Filters {
//   timeSlot: string | null;
//   batch: string | null;
//   category: string | null;
// }

// const SchedulePage: React.FC<{ course_url: string }> = ({ course_url }) => {
//   const router = useRouter();
//   const [isClient, setIsClient] = useState(false);
//   const [isReady, setIsReady] = useState<boolean>(false);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [courses, setCourses] = useState<Course[]>([]);
//   const [schedules, setSchedules] = useState<Schedule[]>([]);
//   const [filters, setFilters] = useState<Filters>({
//     timeSlot: null,
//     batch: null,
//     category: null,
//   });
//   const [quantities, setQuantities] = useState<{ [key: number]: number }>({});
//   const [enrolling, setEnrolling] = useState<{ [key: number]: boolean }>({});
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [modalKey, setModalKey] = useState(0);
//   const [isAdvisorModalOpen, setIsAdvisorModalOpen] = useState(false); 
//   const openAdvisorModal = () => {
//     setModalKey((prevKey) => prevKey + 1); // Increment key to force re-render
//     setIsAdvisorModalOpen(true);
//   };
//   const closeAdvisorModal = () => {
//     setIsAdvisorModalOpen(false);
//   };
//   const enrollTimeoutRef = useRef<{ [key: number]: NodeJS.Timeout | null }>({});

//   // Fetch Courses
//   useEffect(() => {
//     const fetchCourses = async () => {
//       try {
//         const response = await fetch(
//           "http://13.232.95.229:3000/common/getCoursesPerCategory?region=global"
//         );
//         if (!response.ok) {
//           throw new Error("Failed to fetch courses");
//         }
//         const data: Course[] = await response.json();
//         setCourses(data);
//       } catch (error) {
//         console.error(error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchCourses();
//     return () => {
//       Object.values(enrollTimeoutRef.current).forEach((timeout) => {
//         if (timeout) {
//           clearTimeout(timeout);
//         }
//       });
//     };
//   }, []);

//   // Mock Schedules
//   useEffect(() => {
//     setSchedules([
//       {
//         id: 1,
//         timeSlot: "Evening",
//         date: "Jan 17 - Jan 19, 2025",
//         time: "07:30 PM - 12:30 AM",
//         timezone: "IST",
//         batch: "Weekend",
//         instructor: "Nagendra Nyamgondalu",
//         mode: "Online Classroom",
//         price: 24000,
//         discountPrice: 40000,
//         tag: "Weekend",
//       },
//       {
//         id: 2,
//         timeSlot: "Morning",
//         date: "Feb 10 - Feb 12, 2025",
//         time: "09:00 AM - 01:00 PM",
//         timezone: "IST",
//         batch: "Weekday",
//         instructor: "John Doe",
//         mode: "Live Online Classroom",
//         price: 22000,
//         discountPrice: 37000,
//         tag: "Weekday",
//       },
//     ]);
//   }, []);

//   // Initialize Quantities and Enrolling States
//   useEffect(() => {
//     const initialQuantities = schedules.reduce((acc, schedule) => {
//       acc[schedule.id] = 1;
//       return acc;
//     }, {} as { [key: number]: number });

//     const initialEnrolling = schedules.reduce((acc, schedule) => {
//       acc[schedule.id] = false;
//       return acc;
//     }, {} as { [key: number]: boolean });

//     setQuantities(initialQuantities);
//     setEnrolling(initialEnrolling);
//   }, [schedules]);

//   // Ensure router is ready
//   useEffect(() => {
//     if (router.isReady) {
//       setIsReady(true);
//     }
//   }, [router.isReady]);

//   useEffect(() => {
//     setIsClient(true);
//   }, []);

//   const handleBackClick = () => {
//     if (isClient && window.history && window.history.back) {
//       window.history.back();
//     } else {
//       router.push("/");
//     }
//   };

//   const handleHomeClick = () => {
//     router.push(`/`);
//   };

//   const handleQuantityChange = (id: number, change: number) => {
//     setQuantities((prevQuantities) => ({
//       ...prevQuantities,
//       [id]: Math.max(1, (prevQuantities[id] || 1) + change),
//     }));
//   };
  
//   const handleDecreaseQuantity = (id: number) => {
//     handleQuantityChange(id, -1);
//   };
  
//   const handleIncreaseQuantity = (id: number) => {
//     handleQuantityChange(id, 1);
//   };
  
//   const clearFilters = () => {
//     setFilters({ timeSlot: null, batch: null, category: null });
//   };
 
//   const handleCategoryClick = async (courseUrl: string) => {
//     try {
//       setLoading(true); // Show a loading state
//       const response = await fetch(
//         `http://13.232.95.229:3000/course/basicInfo?courseUrl=${courseUrl}`
//       );
//       if (!response.ok) {
//         throw new Error("Failed to fetch course details");
//       }
//       const courseDetails = await response.json();
//       setCourses([courseDetails]); // Replace the current courses with the fetched details
//     } catch (error) {
//       console.error("Error fetching course details:", error);
//     } finally {
//       setLoading(false); // Hide loading state
//     }
//   };
  
//   const handleEnrollClick = (id: number) => {
//     setEnrolling((prev) => ({
//       ...prev,
//       [id]: true,
//     }));

//     if (enrollTimeoutRef.current[id]) {
//       clearTimeout(enrollTimeoutRef.current[id]!);
//     }

//     enrollTimeoutRef.current[id] = setTimeout(() => {
//       setEnrolling((prev) => ({
//         ...prev,
//         [id]: false,
//       }));
//       router.push(`/payment-gateway?scheduleId=${id}`);
//     }, 1000);
//   };
//   const openModal = (courseName: string) => {

//     setIsModalOpen(true);
//   };
  
//   const handleFilterClick = (key: keyof Filters, label: string) => {
//     setFilters((prevFilters) => ({
//       ...prevFilters,
//       [key]: prevFilters[key] === label ? null : label,
//     }));
//   }
//   const uniqueCourses = useMemo(
//     () =>
//       courses.filter(
//         (course, index, self) =>
//           index === self.findIndex((c) => c.category === course.category)
//       ),
//     [courses]
//   );

//   if (!isReady || loading) {
//     return <p>Loading...</p>;
//   }


 


//   return (
//     <div className="bg-Bg1 bg-cover bg-norepeat min-h-screen py-7 px-4">
//       <div className="flex px-4 items-center gap-3">
//         <button
//           className="flex items-center text-xs md:text-sm  text-gray-600 hover:text-gray-800 gap-3"
//           onClick={handleHomeClick}
//         >
//           <FontAwesomeIcon icon={faHome} className="text-orange-800" />
//           <span className="text-md">Home</span>
//         </button>
//         <button
//           className="flex items-center text-xs  md:text-sm  text-gray-600 hover:text-gray-800 gap-3"
//           onClick={handleBackClick}
//         >
//           <FontAwesomeIcon icon={faChevronRight} className="text-orange-800" />
//           <span className="text-md md:text-md text-cyan-950">Back to Course Details</span>
//         </button>
//       </div>

//       <div className="min-h-screen flex flex-col md:flex-row">
//         {/* Left Section */}
//         <div className="p-6 md:w-1/4 mt-10">
         
//           <div className="p-3 bg-flowGradientBottom bg-cover bg-norepeat  rounded-md shadow-glassShadow mb-6">
//               <div className="flex items-center mb-4">
//                 <div className="bg-flowGradientBottom text-yellow-700 p-2 rounded-full mr-4">
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     fill="none"
//                     viewBox="0 0 24 24"
//                     strokeWidth={1.5}
//                     stroke="currentColor"
//                     className="w-6 h-6"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       d="M7.5 11.25h9m-9 3h6m-8.25 6h10.5A2.25 2.25 0 0021 18V6A2.25 2.25 0 0018.75 3h-13.5A2.25 2.25 0 003 6v12a2.25 2.25 0 002.25 2.25z"
//                     />
//                   </svg>
//                 </div>
//                 <div className="bg-flowGradientBottom">
//                   <p className="text-gray-800 text-xs  md:text-sm">No Cost EMI ₹2,667/month*</p>
//                   <button
//                     className="btn-hover-bg-transition btn-hover-bg-transition-og text-black  border border-gray-500 px-5 py-2 pb-2 pt-2 text-white bg-cyan-950 "
//                     onClick={openAdvisorModal}   >
//                     <span>Reach Us</span>
//                   </button>
//                   {isAdvisorModalOpen && (  // Prevent advisor modal from opening when brochure is active
//                     <DwnldAdvisorModalForm
//                       imageSrc="/assets/images/dwnldbrchrimg.png"
//                       key={modalKey}
//                       formName="Brochure"
//                       title="Start Your Journey with Us"
//                       text="Ready to take your career to the next level? Explore a world of possibilities and find your perfect fit with us!"
//                       closeModal={closeAdvisorModal}
//                     />
//                   )}
//                 </div>
//               </div>
//               <hr className="border-yellow-200 mb-4" />
//               {/* Group Discount Section */}
//               <div className="flex items-center">
//                 <div className="bg-white text-yellow-700 p-2 rounded-full mr-4">
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     fill="none"
//                     viewBox="0 0 24 24"
//                     strokeWidth={1.5}
//                     stroke="currentColor"
//                     className="w-6 h-6"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       d="M18 9a3 3 0 11-6 0 3 3 0 016 0zm-6 0a3 3 0 10-6 0 6 0zM21 20.25v-2.508a3 3 0 00-2.477-2.95 11.943 11.943 0 00-9.046 0A3 3 0 007 17.742v2.508"
//                     />
//                   </svg>
//                 </div>
//                 <div>
//                   <p className="text-gray-800 text-xs md:text-sm">Group Discount Available</p>
//                   <p className="text-gray-600 text-xs md:text-sm">Up to -15%</p>
//                 </div>
//               </div>
//             </div>
//             <div className="shadow-md rounded-lg p-6 text-center bg-flowGradientBottom">
//               <h1 className="text-xl md:text-2xl glitter_text ">Courses</h1>
//               <ul>
//                 {uniqueCourses.map((course) => (
//                   <div key={course.category} className="mb-4 bg-flowGradientTop">
//                     <li
//                       className=" p-4  rounded hover:bg-gray-100 shadow hover:shadow-lg cursor-pointer"
//                       onClick={() => router.push(course.course_url)}
//                     >
//                       {course.category}
//                     </li>
//                     <hr className="my-4"/>

//                 </div>
//                  ))}
//               </ul>
//               </div>
           
//           </div>

//         {/* Right Section */}
//         <div className="md:w-3/4">
//           {/* Course Listing */}

//           {/* Schedules Listing */}
//           <div className="mt-8">
//             <div className="px-6 md:w-full">
//               {/* Header */}
//               <div className="px-6">
//                 <h1 className="text-xl md:text-2xl font-semibold text-gray-800 glitter_text font-bold mb-4">
//                   Schedules Of Courses
//                 </h1>
//               </div>
//             <div className="container mx-auto grid gap-4 lg:grid-cols-1 sm:grid-cols-2 grid-cols-1">
//               {/* Courses */}
//                 <div className="container mx-auto p-4 grid gap-4 lg:grid-cols-1 sm:grid-cols-2 grid-cols-1">
//                   {courses.map((course) => (
//                     <div key={course.course_url}>
//                       <div className="bg-flowGradientTop p-6 rounded-lg flex flex-col md:flex-row justify-between items-center">
//                         {/* Course Details */}
//                         <div className="flex flex-col items-start">
//                           <span className="bg-green-100 text-green-800 text-sm font-semibold px-2 py-1 rounded">
//                             🌓 Morning
//                           </span>
//                           <h2 className="text-lg md:text-xl font-bold mt-2">
//                             {course.course_name}
//                           </h2>
//                           <h2 className="text-md md:text-lg font-semibold mt-2">
//                             Jan 02 - Jan 03, 2025
//                           </h2>
//                           <div className="flex items-center text-gray-600 mt-1">
//                             <svg
//                               className="w-4 h-4 mr-1"
//                               fill="none"
//                               stroke="currentColor"
//                               viewBox="0 0 24 24"
//                               xmlns="http://www.w3.org/2000/svg"
//                             >
//                               <path
//                                 strokeLinecap="round"
//                                 strokeLinejoin="round"
//                                 strokeWidth="2"
//                                 d="M8 7V3m8 4V3m-9 4h10M5 11h14M5 15h14M5 19h14M5 7h.01M19 7h.01M12 11v8m-4-4h8"
//                               ></path>
//                             </svg>
//                             <span>IST</span>
//                             <span className="ml-2">08:00 AM - 04:00 PM</span>
//                           </div>
//                           <div className="flex items-center text-gray-600 mt-1">
//                             <svg
//                               className="w-4 h-4 mr-1"
//                               fill="none"
//                               stroke="currentColor"
//                               viewBox="0 0 24 24"
//                               xmlns="http://www.w3.org/2000/svg"
//                             >
//                               <path
//                                 strokeLinecap="round"
//                                 strokeLinejoin="round"
//                                 strokeWidth="2"
//                                 d="M12 8c-1.657 0-3 1.343-3 3s1.343 3 3 3 3-1.343 3-3-1.343-3-3-3zm0 0V5m0 6v6m0 0h-3m3 0h3"
//                               ></path>
//                             </svg>
//                             <span className="text-md md:text-md">Online Classroom</span>
//                             <span className="ml-2 text-md md:text-md ">Weekday Batch</span>
//                           </div>
//                           <div className="flex items-center text-gray-600 mt-1">
//                             <svg
//                               className="w-4 h-4 mr-1"
//                               fill="currentColor"
//                               stroke="currentColor"
//                               viewBox="0 0 24 24"
//                               xmlns="http://www.w3.org/2000/svg"
//                             >
//                               <path
//                                 strokeLinecap="round"
//                                 strokeLinejoin="round"
//                                 strokeWidth="2"
//                                 d="M12 14l9-5-9-5-9 5 9 5zm0 0v6m0 0l-3-3m3 3l3-3"
//                               ></path>
//                             </svg>
//                             <span>Gaurav Rastogi</span>
//                           </div>
//                         </div>

//                         {/* Enrollment Section */}
//                         <div className="flex flex-col items-center mt-4 md:mt-0">
//                           <div className="flex items-center space-x-2 mb-4 sm:mb-0">
//                             <button
//                               onClick={() =>
//                                 handleQuantityChange(course.id, -1)
//                               }
//                               className="w-8 h-8 border rounded text-gray-600 hover:bg-gray-100"
//                             >
//                               -
//                             </button>
//                             <span className="text-md md:text-lg font-medium">
//                               {quantities[course.id] || 1}
//                             </span>
//                             <button
//                               onClick={() => handleQuantityChange(course.id, 1)}
//                               className="w-8 h-8 border rounded text-gray-600 hover:bg-gray-100"
//                             >
//                               +
//                             </button>
//                           </div>
//                           <div className="text-maincolor_1 font-bold text-md:text-lg mt-2">
//                             ₹14,499
//                           </div>
//                           <div className="text-gray-500 line-through">
//                             ₹30,998
//                           </div>
//                           <div className="text-mainblue text-sm mt-1">
//                             As low as ₹1,611/month
//                           </div>
//                           <div className="bg-yellow-100 text-yellow-800 text-sm font-semibold px-2 py-1 rounded mt-2">
//                             Only few seats left!
//                           </div>
//                           </div>
//                           <div className="mt-2 sm:ml-4 text-center relative">
//                           <div className="relative">

//                           <button
//                           onClick={openAdvisorModal}
//                             className={`px-6 py-2 rounded-lg font-medium relative bg-maincolor_1 text-white`}
//                           >Enroll
                          
                         
//                           </button>
//                           {isAdvisorModalOpen &&(
                            
//                             <DwnldAdvisorModalForm
//                                                 imageSrc="/assets/images/advisor.png"
//                                                 key={modalKey}
//                                                   formName="homepage/enroll"
//                                                   title="Launch Your Career Today"
//                                                   text="Provide your information below to get Kick-start your journey toward a bright future."
//                                                   closeModal={closeAdvisorModal} // Close modal using the same toggle function
//                                                   modalclassname=" md:max-w-4xl"
//                                                   downloadPdf={false}
//                                                 />
//                       )}
                        
//                       </div>
//                           <p className="text-sm text-orange-500 mt-2 flex flex-col items-center">
//                             <span className="text-yellow-500">
//                               ⚡ Filling Fast
//                             </span>
//                             <span className="text-gray-500">
//                               Hurry, Sale ends soon!
//                             </span>
//                           </p>
//                         </div>
//                       </div>
//                     </div>

  
//   )
// )
//   }
//   </div>
//   </div>
//   </div>
//   </div>
//   </div>
//   </div>

//   </div>                  
//   )
// }

// export default SchedulePage;


"use client";

import React, { useEffect, useState, useMemo, useRef } from "react";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight, faHome } from "@fortawesome/free-solid-svg-icons";
import DwnldAdvisorModalForm from "./forms/advisorfrm";

interface Course {
  id: number;
  category: string;
  course_url: string;
  course_name: string;
}

interface Schedule {
  id: number;
  timeSlot: string;
  date: string;
  time: string;
  timezone: string;
  batch: string;
  instructor: string;
  mode: string;
  price: number;
  discountPrice: number;
  tag: string;
}

interface Filters {
  timeSlot: string | null;
  batch: string | null;
  category: string | null;
}

const SchedulePage: React.FC<{ course_url: string }> = ({ course_url }) => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(true);
  const [courses, setCourses] = useState<Course[]>([]);
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [quantities, setQuantities] = useState<{ [key: number]: number }>({});
  const [enrolling, setEnrolling] = useState<{ [key: number]: boolean }>({});
  const [isAdvisorModalOpen, setIsAdvisorModalOpen] = useState(false);
  const enrollTimeoutRef = useRef<{ [key: number]: NodeJS.Timeout | null }>({});

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch(
          "http://13.232.95.229:3000/common/getCoursesPerCategory?region=global"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch courses");
        }
        const data: Course[] = await response.json();
        setCourses(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();

    return () => {
      Object.values(enrollTimeoutRef.current).forEach((timeout) => {
        if (timeout) {
          clearTimeout(timeout);
        }
      });
    };
  }, []);

  useEffect(() => {
    setSchedules([
      {
        id: 1,
        timeSlot: "Evening",
        date: "Jan 17 - Jan 19, 2025",
        time: "07:30 PM - 12:30 AM",
        timezone: "IST",
        batch: "Weekend",
        instructor: "Nagendra Nyamgondalu",
        mode: "Online Classroom",
        price: 24000,
        discountPrice: 40000,
        tag: "Weekend",
      },
      {
        id: 2,
        timeSlot: "Morning",
        date: "Feb 10 - Feb 12, 2025",
        time: "09:00 AM - 01:00 PM",
        timezone: "IST",
        batch: "Weekday",
        instructor: "John Doe",
        mode: "Live Online Classroom",
        price: 22000,
        discountPrice: 37000,
        tag: "Weekday",
      },
    ]);
  }, []);

  useEffect(() => {
    const initialQuantities = schedules.reduce((acc, schedule) => {
      acc[schedule.id] = 1;
      return acc;
    }, {} as { [key: number]: number });

    const initialEnrolling = schedules.reduce((acc, schedule) => {
      acc[schedule.id] = false;
      return acc;
    }, {} as { [key: number]: boolean });

    setQuantities(initialQuantities);
    setEnrolling(initialEnrolling);
  }, [schedules]);

  const handleQuantityChange = (id: number, change: number) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [id]: Math.max(1, (prevQuantities[id] || 1) + change),
    }));
  };

  const handleEnrollClick = (id: number) => {
    setEnrolling((prev) => ({
      ...prev,
      [id]: true,
    }));

    const currentTimeout = enrollTimeoutRef.current[id];
    if (currentTimeout) {
      clearTimeout(currentTimeout);
    }

    const timeout = setTimeout(() => {
      setEnrolling((prev) => ({
        ...prev,
        [id]: false,
      }));
      router.push(`/payment-gateway?scheduleId=${id}`);
    }, 1000);

    enrollTimeoutRef.current[id] = timeout;
  };

  const uniqueCourses = useMemo(
    () =>
      courses.filter(
        (course, index, self) =>
          index === self.findIndex((c) => c.category === course.category)
      ),
    [courses]
  );

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="bg-Bg1 bg-cover bg-norepeat min-h-screen py-7 px-4">
      <div className="flex px-4 items-center gap-3">
        <button
          className="flex items-center text-xs md:text-sm text-gray-600 hover:text-gray-800 gap-3"
          onClick={() => router.push("/")}
        >
          <FontAwesomeIcon icon={faHome} className="text-orange-800" />
          <span className="text-md">Home</span>
        </button>
        <button
          className="flex items-center text-xs md:text-sm text-gray-600 hover:text-gray-800 gap-3"
          onClick={() => router.back()}
        >
          <FontAwesomeIcon icon={faChevronRight} className="text-orange-800" />
          <span className="text-md md:text-md text-cyan-950">
            Back to Course Details
          </span>
        </button>
      </div>

      <div className="min-h-screen flex flex-col md:flex-row">
        <div className="p-6 md:w-1/4 mt-10">
          <div className="shadow-md rounded-lg p-6 text-center bg-flowGradientBottom">
            <h1 className="text-xl md:text-2xl glitter_text">Courses</h1>
            <ul>
              {uniqueCourses.map((course) => (
                <li
                  key={course.category}
                  className="p-4 rounded hover:bg-gray-100 shadow hover:shadow-lg cursor-pointer"
                  onClick={() => router.push(course.course_url)}
                >
                  {course.category}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="md:w-3/4 mt-10">
          <h1 className="text-xl md:text-2xl font-semibold text-gray-800 glitter_text font-bold mb-4">
            Schedules Of Courses
          </h1>
          <div className="grid gap-4 sm:grid-cols-1 lg:grid-cols-2">
            {schedules.map((schedule) => (
              <div
                key={schedule.id}
                className="p-6 bg-flowGradientTop rounded-lg shadow-lg"
              >
                <h2 className="text-lg font-bold">{schedule.batch}</h2>
                <p>{schedule.timeSlot}</p>
                <p>{schedule.date}</p>
                <div className="flex items-center mt-4">
                  <button
                    onClick={() => handleQuantityChange(schedule.id, -1)}
                    className="w-8 h-8 border rounded text-gray-600 hover:bg-gray-100"
                  >
                    -
                  </button>
                  <span className="mx-4">{quantities[schedule.id] || 1}</span>
                  <button
                    onClick={() => handleQuantityChange(schedule.id, 1)}
                    className="w-8 h-8 border rounded text-gray-600 hover:bg-gray-100"
                  >
                    +
                  </button>
                </div>
                <button
                  onClick={() => handleEnrollClick(schedule.id)}
                  className="mt-4 px-6 py-2 bg-blue-600 text-white rounded"
                >
                  Enroll
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SchedulePage;
