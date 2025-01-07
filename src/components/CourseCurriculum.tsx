"use client";
import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";

type CurriculumItem = {
  question: string; // Title or question for the topic
  answer: string; // HTML content or subtopics
};

type CourseCurriculumProps = {
  courseUrl: string;
  courseDetails: { title: string; description: string };
};

const CourseCurriculum: React.FC<CourseCurriculumProps> = ({
  courseUrl,
  courseDetails,
}) => {
  // Remove unused effectiveCourseUrl variable
  // const effectiveCourseUrl = courseUrl || "angular-course";
  const [curriculumData, setCurriculumData] = useState<CurriculumItem[]>([]); // State to store fetched curriculum data
  const [expanded, setExpanded] = useState<number | null>(null); // State to track which accordion item is expanded

  // Fetch the curriculum data from the API
  useEffect(() => {
    const fetchCurriculumData = async () => {
      try {
        const response = await fetch(
          `http://13.232.95.229:3000/course/courseCurricullam?courseUrl=angular-course`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch curriculum data");
        }
        const data = await response.json();

        // Define the type for the API response item
        type ApiResponseItem = {
          topicName: string;
          subTopicName: string;
        };

        // Map the API response to the expected format
        const mappedData = data.map((item: ApiResponseItem) => ({
          question: item.topicName || "Unknown Topic",
          answer: item.subTopicName || "No details available",
        }));

        setCurriculumData(mappedData);
      } catch (error) {
        console.error("Error fetching curriculum data:", error);
      }
    };

    fetchCurriculumData();
  }, [courseUrl]);

  const toggleAccordion = (index: number) => {
    setExpanded(expanded === index ? null : index);
  };

  return (
    <div className="w-full flex justify-center">
      <div className="w-full max-w-5xl">
        {/* <h1 className="text-2xl font-bold mb-4">{courseDetails.title}</h1> */}
        <p className="mb-6">{courseDetails.description}</p>
        <div id="accordion">
          {curriculumData.length > 0 ? (
            curriculumData.map((item, index) => (
              <div key={index} className="border-b my-2">
                <button
                  className="w-full text-left p-4  font-medium flex justify-between items-center focus:outline-none bg-Bg1 no-repeat bg-cover shadow-soft"
                  onClick={() => toggleAccordion(index)}
                >
                  <h3 className="font-semibold uppercase text-lg text-cyan-950">
                    {item.question}
                  </h3>
                  <span className="accordion-icon transition-transform duration-200">
                    <FontAwesomeIcon
                      icon={expanded === index ? faMinus : faPlus}
                      className="text-lg text-maincolor_1"
                    />
                  </span>
                </button>
                {expanded === index && (
                  <div className="accordion-content p-8 text-gray-600 bg-white shadow-medium">
                    <div className="relative">
                      {/* Append item.answer dynamically with dots */}
                      <div
                        className="text-gray-700 mt-2"
                        dangerouslySetInnerHTML={{
                          __html: item.answer
                            // Apply SVG only to the top-level <li> elements.
                            .replace(
                              /<li>(.*?)<\/li>/g,
                              `<li class="flex items-start gap-3 pl-4 list-disc relative">
                                <span class="absolute left-0 top-1/2 transform -translate-y-1/2 text-mainBlue mr-2">
                                  <svg aria-hidden="true" focusable="false" data-prefix="fab" data-icon="canadian-maple-leaf" 
                                      class="svg-inline--fa fa-canadian-maple-leaf text-mainBlue font-semibold" role="img" 
                                      xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                    <path fill="currentColor" d="M383.8 351.7c2.5-2.5 105.2-92.4 105.2-92.4l-17.5-7.5c-10-4.9-7.4-11.5-5-17.4 
                                      2.4-7.6 20.1-67.3 20.1-67.3s-47.7 10-57.7 12.5c-7.5 2.4-10-2.5-12.5-7.5s-15-32.4-15-32.4-52.6 
                                      59.9-55.1 62.3c-10 7.5-20.1 0-17.6-10 0-10 27.6-129.6 27.6-129.6s-30.1 17.4-40.1 22.4c-7.5 5-12.6 
                                      5-17.6-5C293.5 72.3 255.9 0 255.9 0s-37.5 72.3-42.5 79.8c-5 10-10 10-17.6 5-10-5-40.1-22.4-40.1-22.4S183.3 
                                      182 183.3 192c2.5 10-7.5 17.5-17.6 10-2.5-2.5-55.1-62.3-55.1-62.3S98.1 167 95.6 172s-5 9.9-12.5 7.5C73 
                                      177 25.4 167 25.4 167s17.6 59.7 20.1 67.3c2.4 6 5 12.5-5 17.4L23 259.3s102.6 89.9 105.2 92.4c5.1 5 10 
                                      7.5 5.1 22.5-5.1 15-10.1 35.1-10.1 35.1s95.2-20.1 105.3-22.6c8.7-.9 18.3 2.5 18.3 12.5S241 512 241 512h30s-5.8-102.7-5.8-112.8 
                                      9.5-13.4 18.4-12.5c10 2.5 105.2 22.6 105.2 22.6s-5-20.1-10-35.1 0-17.5 5-22.5z"></path>
                                  </svg>
                                </span>
                                $1
                              </li>`
                            )
                            // Apply padding only for nested <ul>.
                            .replace(/<ul>/g, '<ul class="pl-6 text-gray-900">'),
                        }}
                      />
                    </div>
                  </div>
                )}
              </div>
            ))
          ) : (
            <p>Loading curriculum...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseCurriculum;





