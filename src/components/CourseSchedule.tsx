"use client";
import React, { useEffect, useState } from 'react';
import DwnldAdvisorModalForm from 'pages/forms/advisorfrm';

interface BatchScheduleDetail {
  batchStartDate: number;
  batchMode: string;
  batchTimings: string;
  batchDays: string;
  batchStatus: string;
  batchTitle: string;
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
  title: string;
}

const CourseSchedule: React.FC<{ course_url: string }> = ({ course_url }) => {
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [quantities, setQuantities] = useState<{ [key: number]: number }>({});
  const [isAdvisorModalOpen, setIsAdvisorModalOpen] = useState<boolean>(false);

  useEffect(() => {
    const fetchSchedules = async () => {
      const sessionKey = `schedules_${course_url}`; // Unique session storage key
      const cachedData = sessionStorage.getItem(sessionKey); // Check for cached data
  
      // Use cached data if available
      if (cachedData) {
        try {
          const parsedData = JSON.parse(cachedData);
          console.log("Loaded schedule data from session storage:", parsedData);
          setSchedules(parsedData);
          return;
        } catch (error) {
          console.error("Error parsing cached schedule data:", error);
          sessionStorage.removeItem(sessionKey); // Remove corrupted cache
        }
      }
  
      console.log("Fetching schedule data from API...");
      try {
        const response = await fetch(
          `http://13.235.70.111:3000/course/basicInfo?courseUrl=${course_url}`
        );
  
        if (!response.ok) {
          throw new Error(`API Error: ${response.status}`);
        }
  
        const data = await response.json();
        const batchScheduleDetails = data[0]?.batchScheduleDetails || [];
  
        // Format schedules
        const formattedSchedules: Schedule[] = batchScheduleDetails.map(
          (batch: BatchScheduleDetail) => ({
            id: batch.batchStartDate,
            timeSlot: batch.batchMode,
            date: `${new Date(batch.batchStartDate).toLocaleDateString()} - ${new Date(
              new Date(batch.batchStartDate).setMonth(
                new Date(batch.batchStartDate).getMonth() + 2
              )
            ).toLocaleDateString()}`,
            time: batch.batchTimings,
            timezone: "IST",
            batch: batch.batchDays,
            instructor: "TBD",
            mode: batch.batchMode,
            price: 24000,
            discountPrice: 40000,
            tag: batch.batchStatus,
            title: batch.batchTitle,
          })
        );
  
        // Save formatted schedules to session storage
        sessionStorage.setItem(sessionKey, JSON.stringify(formattedSchedules));
        console.log("Saved schedule data to session storage:", formattedSchedules);
  
        // Update state with the formatted schedules
        setSchedules(formattedSchedules);
      } catch (error) {
        console.error("Error fetching schedule data from API:", error);
  
        // Fallback to cached data if API fails
        if (cachedData) {
          const parsedData = JSON.parse(cachedData);
          console.log("Using fallback schedule data from session storage.");
          setSchedules(parsedData);
        } else {
          console.log("No cached schedule data available.");
          setSchedules([]); // Render with empty state if no data is available
        }
      }
    };
  
    fetchSchedules();
  }, [course_url]);
  

  const handleQuantityChange = (id: number, change: number) => {
    setQuantities((prevQuantities) => {
      const newQuantity = (prevQuantities[id] || 1) + change;
      return {
        ...prevQuantities,
        [id]: newQuantity > 0 ? newQuantity : 1,
      };
    });
  };

  const toggleAdvisorModal = () => {
    setIsAdvisorModalOpen((prev) => !prev);
  };

  const handleModalClose = () => {
    setIsAdvisorModalOpen(false);
  };

  return (
    <div>
      <div className="container mx-auto p-4 grid gap-4 lg:grid-cols-1 sm:grid-cols-2 grid-cols-1 ">
        {schedules.map((schedule) => (
          <div key={schedule.id} className="schedule-item">
            <div>
              <div className="bg-flowGradientTop p-6 rounded-lg flex flex-col md:flex-row justify-between items-center">
                <div className="flex flex-col items-start">
                  <span className="bg-green-100 text-green-800 text-sm font-semibold px-2 py-1 rounded"> 🌓 Morning</span>
                  <h2 className="text-xl font-bold mt-2">{schedule.title}</h2>
                  <h2 className="text-lg font-semibold mt-2">Jan 02 - Jan 03, 2025</h2>
                  <div className="flex items-center text-gray-600 mt-1">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 4h10M5 11h14M5 15h14M5 19h14M5 7h.01M19 7h.01M12 11v8m-4-4h8"></path>
                    </svg>
                    <span>IST</span>
                    <span className="ml-2">08:00 AM - 04:00 PM</span>
                  </div>
                  <div className="flex items-center text-gray-600 mt-1">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 1.343-3 3s1.343 3 3 3 3-1.343 3-3-1.343-3-3-3zm0 0V5m0 6v6m0 0h-3m3 0h3"></path>
                    </svg>
                    <span>Online Classroom</span>
                    <span className="ml-2">Weekday Batch</span>
                  </div>
                  <div className="flex items-center text-gray-600 mt-1">
                    <svg className="w-4 h-4 mr-1" fill="color" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5zm0 0v6m0 0l-3-3m3 3l3-3"></path>
                    </svg>
                    <span>Gaurav RASTOGI</span>
                  </div>
                </div>
                <div className="flex flex-col items-center mt-4 md:mt-0">
                  <div className="flex items-center space-x-2 mb-4 sm:mb-0">
                    <button
                      onClick={() => handleQuantityChange(schedule.id, -1)}
                      className="w-8 h-8 border rounded text-gray-600 hover:bg-gray-100"
                    >
                      -
                    </button>
                    <span className="text-lg font-medium">
                      {quantities[schedule.id] || 1}
                    </span>
                    <button
                      onClick={() => handleQuantityChange(schedule.id, 1)}
                      className="w-8 h-8 border rounded text-gray-600 hover:bg-gray-100"
                    >
                      +
                    </button>
                  </div>
                  <div className="text-maincolor_1 font-bold text-lg mt-2">₹14,499</div>
                  <div className="text-gray-500 line-through">₹30,998</div>
                  <div className="text-blue-600 text-sm mt-1">As low as ₹1,611/month</div>
                  <div className="bg-yellow-100 text-yellow-800 text-sm font-semibold px-2 py-1 rounded mt-2">Only few seats left!</div>
                </div>
                <div className="mt-2 sm:ml-4 text-center">
                  <button
                    onClick={toggleAdvisorModal}
                    className="px-6 py-2 rounded-lg font-medium bg-blue-600 text-white hover:bg-blue-700"
                  >
                    Enroll
                  </button>
                  {isAdvisorModalOpen && (
                    <DwnldAdvisorModalForm
                      imageSrc="/assets/images/advisor.png"
                      formName="Course"
                      title="Discuss with an Expert"
                      text="Provide your information below to get your course syllabus delivered through WhatsApp and Email"
                      closeModal={handleModalClose}
                      modalclassname=""
                    />
                  )}
                  <p className="text-sm text-orange-500 mt-2 flex flex-col items-center">
                    <span className="text-yellow-500">⚡ Filling Fast</span>
                    <span className="text-gray-500">Hurry, Sale ends soon!</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseSchedule;
