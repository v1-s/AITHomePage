"use client";
import React, { useState, useEffect } from "react";
import { format } from 'date-fns';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-solid-svg-icons";
import DwnldAdvisorModalForm from "pages/forms/advisorfrm";

interface BatchDetailsProps {
  course_url: string; // Define the course_url prop type
}

interface ScheduleType {
  date: string;
  time: string;
  link: string;
  status: string;
  batchStatus: string;
  batchStartDate: number;
  batchMode: string;
  batchDays: string;
  batchTimings: string;
  isOrientation: boolean;
  // ...other properties...
}

const BatchDetails: React.FC<BatchDetailsProps> = ({ course_url }) => {
  const [timeLeft, setTimeLeft] = useState<string>("");
  const [modalKey, setModalKey] = useState<number>(0);
  const [isAdvisorModalOpen, setIsAdvisorModalOpen] = useState<boolean>(false);
  const [batches, setBatches] = useState<ScheduleType[]>([]); // State to hold batch details

  // Fetch batch data from the API
  useEffect(() => {
    const fetchBatchDetails = async () => {
      try {
        const response = await fetch(`http://13.232.95.229:3000/course/basicInfo?courseUrl=${course_url}`);
        const data = await response.json();
        console.log("Fetched data:", data); // Log the response to see its structure
  
        // Assuming batchScheduleDetails is an array in the response
        const batches = data[0]?.batchScheduleDetails || [];  // Safeguard if batchScheduleDetails is undefined
        setBatches(batches);  // Set the batches state with fetched data
      } catch (error) {
        console.error('Error fetching batch details:', error);
      }
    };
  
    fetchBatchDetails();
  
    // Randomize countdown target time between 4 to 6 hours
    const randomOffset = Math.floor(Math.random() * 2) + 4;  // Randomize between 4 and 6 hours
    const targetDate = new Date();
    targetDate.setHours(targetDate.getHours() + randomOffset);  // Add random hours to current time
  
    const updateCountdown = () => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();
  
      if (difference <= 0) {
        setTimeLeft("Time's up!");
        clearInterval(timer);
        return;
      }
  
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / (1000 * 60)) % 60);
      const seconds = Math.floor((difference / 1000) % 60);
  
      setTimeLeft(`${hours}h : ${minutes}m : ${seconds}s`);
    };
  
    const timer = setInterval(updateCountdown, 1000);
    updateCountdown();
  
    return () => clearInterval(timer);
  }, [course_url]); // Re-run when course_url changes

  const handleBatchSelect = (batchLink: string) => {
    // Set the selected batch link when a batch is clicked
    setSelectedBatchLink(batchLink);
  };
  const openAdvisorModal = () => {
    setModalKey((prevKey) => prevKey + 1); // Increment key to force re-render
    setIsAdvisorModalOpen(true);
  };

  const closeAdvisorModal = () => {
    setIsAdvisorModalOpen(false);
  };
  const [selectedBatchLink, setSelectedBatchLink] = useState<string | null>(null); // Track selected batch by link

  return (
    <div className="max-w-6xl mx-auto bg-flowGradientBottom shadow-lg rounded-lg overflow-hidden flex flex-wrap my-12">
      {/* Left Section */}
      <div className="w-full md:w-3/4 py-12 px-4">
        <h2 className="text-2xl font-semibold text-gray-900 ml-4 glitter_text">Course Enrollment</h2>
        <ul className="mt-4 space-y-4 px-4 cursor-pointer transform-scale-100">
          {batches.length > 0 ? (
            batches.map((batch,index) => (
              <li
                key={batch.link}
                className={`border-b py-4 bg-gray-50 rounded-md px-3 relative ${batch.status === "SOLD OUT" ? "border-maincolor_1" : "border-gray-300"} ${selectedBatchLink === batch.link ? "bg-blue-100" : ""} cursor-pointer transform transition-transform duration-200 hover:scale-105`} // Highlight selected batch
                onClick={() => handleBatchSelect(batch.link)} // Use batch.link for selection
              >
                {batch.status !== "SOLD OUT" && (
                  <span
                    className="absolute top-1 left-0 bg-maincolor_1 text-white text-xs font-semibold px-3 py-1 my-0"
                    style={{
                      clipPath: "polygon(0 0, 100% 0, 92% 50%, 100% 100%, 0 100%, 0% 50%)",
                    }}
                  >
                    {batch.batchStatus}
                  </span>
                )}

                <div className="flex gap-7 items-center pt-4">
                  {batch.status === "SOLD OUT" && (
                    <span className="text-maincolor_1 font-bold w-xs border border-maincolor_1 p-2 text-wrap rounded-md pointer-events-none">
                      {batch.status.replace(" ", "\n")}
                    </span>
                  )}
{batch.status !== "SOLD OUT" && (
  <input
    type="radio"
    name="batchSelection" // All radio buttons share the same `name`
    className="border border-gray-500 pointer"
    checked={selectedBatchLink === index.toString()} // Use index as a unique identifier
    onChange={() => setSelectedBatchLink(index.toString())} // Update selectedBatchLink based on the index
  />
)}



                  <p className="text-gray-900 text-lg font-semibold">
                    {batch.batchStartDate && format(new Date(batch.batchStartDate), 'dd-MM-yy')}
                  </p>

                  <p className="border border-gray-800 rounded-md p-2 text-sm cursor-pointer text-blue-800">
                    {batch.batchMode}
                  </p>
                  <p className="text-gray-700">{batch.batchDays}</p>
                  <div className="flex justify-center items-center flex-col">
                    <p className="text-gray-700">{batch.batchTimings}</p>
                    {batch.isOrientation && (
                      <p className="text-cyan-800 mt-2 font-bold cursor-pointer">ORIENTATION CLASS</p>
                    )}
                  </div>
                </div>
              </li>
            ))
          ) : (
            <li className="py-4 text-center text-gray-600">No batches available</li>
          )}
        </ul>
      </div>

      {/* Right Section */}
      <div className="w-full md:w-1/4 shadow-glassShadow">
        <div className="mt-4 flex flex-col justify-center items-center p-4 gap-5">
          <p className="text-lg text-gray-600">
            Price: <span className="line-through">₹17,795</span>
            <span className="text-green-600 ml-3 font-bold text-3xl pb-4">₹12,456</span>
          </p>
          <p className="text-sm text-gray-600 font-bold border border-maincolor_1 border-2 px-4">
            <FontAwesomeIcon icon={faClock} className="text-maincolor_1" /> Ends in {timeLeft}
          </p>
          <p className="text-sm text-gray-600 font-bold text-xl">Starts at ₹4,152 / month</p>
          <p className="text-sm text-gray-600 font-semi-bold">With No Cost EMI</p>
        </div>
        <div className="mt-4 px-6">
          <button className="w-full bg-maincolor_1 text-white font-semibold py-2 rounded-lg hover:bg-maincolor_1" onClick={openAdvisorModal}>
            Secure Your Seat
          </button>
          {isAdvisorModalOpen && (
            <DwnldAdvisorModalForm
              imageSrc="/assets/images/advisor.png"
              key={modalKey}
              formName="Course"
              title="Reserve Your Spot Now"
              text="Secure your seat and unlock access to world-class learning opportunities today!"
              closeModal={closeAdvisorModal} // Close modal using the same toggle function
              downloadPdf={false}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default BatchDetails;
