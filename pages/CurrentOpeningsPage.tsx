// "use client";

// import React, { useState, useEffect, useMemo } from "react";

// interface Job {
//   title: string;
//   experience: string;
//   location: string;
//   skills: string[];
// }

// const JobOpeningsPage = () => {
//   const [loading, setLoading] = useState(true);
//   const [minExperience, setMinExperience] = useState<number | string>("");
//   const [maxExperience, setMaxExperience] = useState<number | string>("");
//   const [location, setLocation] = useState<string>("");
//   const [searchTerm, setSearchTerm] = useState<string>("");
//   const [filteredJobs, setFilteredJobs] = useState<Job[]>([]); // Use Job[] instead of any[]
//   const mockJobs: Job[] = useMemo(() => [
//     {
//       title: "Software Engineer",
//       experience: "2-4 years",
//       location: "Bangalore",
//       skills: ["JavaScript", "React", "Node.js"],
//     },
//     {
//       title: "Backend Developer",
//       experience: "3-5 years",
//       location: "Hyderabad",
//       skills: ["Python", "Django", "SQL"],
//     },
//     {
//       title: "Frontend Developer",
//       experience: "1-3 years",
//       location: "Remote",
//       skills: ["HTML", "CSS", "React"],
//     },
//     {
//       title: "Data Scientist",
//       experience: "4-6 years",
//       location: "Bangalore",
//       skills: ["Python", "Machine Learning", "AI"],
//     },
//   ], []); // The empty dependency array ensures mockJobs is memoized and won't change unless explicitly updated.

//   const applyFilters = () => {
//     setLoading(true);

//     let filtered = mockJobs;

//     if (searchTerm) {
//       filtered = filtered.filter((job) =>
//         job.title.toLowerCase().includes(searchTerm.toLowerCase())
//       );
//     }

//     if (location) {
//       filtered = filtered.filter((job) => job.location === location);
//     }

//     if (minExperience || maxExperience) {
//       filtered = filtered.filter((job) => {
//         const jobExperience = job.experience
//           .split("-")
//           .map((e) => parseInt(e.trim().replace(" years", "")));
//         const minExp = minExperience ? parseInt(minExperience.toString()) : 0;
//         const maxExp = maxExperience ? parseInt(maxExperience.toString()) : 100;

//         return jobExperience[0] >= minExp && jobExperience[1] <= maxExp;
//       });
//     }

//     setFilteredJobs(filtered);
//     setLoading(false);
//   };

//   useEffect(() => {
//     setTimeout(() => {
//       setFilteredJobs(mockJobs);
//       setLoading(false);
//     }, 1500);
//   }, [mockJobs]);

//   return (
//     <div className="bg-gray-100 min-h-screen p-4">
//       <div className="max-w-7xl mx-auto text-center py-6">
//         <h1 className="text-2xl md:text-3xl font-bold text-gray-800 uppercase">
//           <span className="glitter_text">Current Openings</span>
//         </h1>
//       </div>

//       <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-6">
//         <div className="bg-white shadow-md rounded p-4 space-y-6">
//           <div>
//             <h3 className="font-bold text-lg text-gray-700">By Experience</h3>
//             <div className="flex items-center space-x-4 mt-4">
//               <input
//                 type="number"
//                 placeholder="Min Exp"
//                 className="border p-2 rounded w-full"
//                 value={minExperience}
//                 onChange={(e) => setMinExperience(e.target.value)}
//               />
//               <input
//                 type="number"
//                 placeholder="Max Exp"
//                 className="border p-2 rounded w-full"
//                 value={maxExperience}
//                 onChange={(e) => setMaxExperience(e.target.value)}
//               />
//             </div>
//             <div className="flex items-center justify-between mt-4">
//               <button
//                 className="bg-mainblue text-white px-4 py-2 rounded hover:bg-blue-600 transition"
//                 onClick={() => {
//                   setMinExperience("");
//                   setMaxExperience("");
//                   applyFilters();
//                 }}
//               >
//                 Reset
//               </button>
//               <button
//                 className="bg-mainblue text-white px-4 py-2 rounded hover:bg-blue-600 transition"
//                 onClick={applyFilters}
//               >
//                 Apply
//               </button>
//             </div>
//           </div>

//           <div>
//             <h3 className="font-bold text-lg text-gray-700">Location</h3>
//             <select
//               className="w-full border p-2 rounded mt-4"
//               value={location}
//               onChange={(e) => setLocation(e.target.value)}
//             >
//               <option value="">Select Location</option>
//               <option value="Bangalore">Bangalore</option>
//               <option value="Remote">Remote</option>
//               <option value="Hyderabad">Hyderabad</option>
//             </select>
//           </div>
//         </div>

//         <div className="lg:col-span-3">
//           <div className="flex flex-1 mb-6">
//             <input
//               type="text"
//               placeholder="Search Job Title"
//               className="border p-2 rounded w-full lg:w-full"
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//             />
//             <button
//               className="bg-mainblue text-white px-4 py-2 rounded hover:bg-blue-600 transition ml-4"
//               onClick={() => {
//                 setSearchTerm("");
//                 applyFilters();
//               }}
//             >
//               Search
//             </button>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
//             {loading ? (
//               <div className="text-center text-xl text-gray-500">
//                 Loading jobs...
//               </div>
//             ) : filteredJobs.length > 0 ? (
//               filteredJobs.map((job, index) => (
//                 <div
//                   key={index}
//                   className="bg-white shadow-md rounded p-4 hover:shadow-lg transition"
//                 >
//                   <h3 className="font-bold text-lg text-gray-800 mb-2">
//                     {job.title}
//                   </h3>
//                   <p className="text-sm text-gray-600 mb-2">
//                     Experience: {job.experience}
//                   </p>
//                   <p className="text-sm text-gray-600 mb-4">
//                     Location: {job.location}
//                   </p>
//                   <div className="flex flex-wrap gap-2 mb-4">
//                     {job.skills.map((skill, idx) => (
//                       <span
//                         key={idx}
//                         className="bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded w-auto"
//                       >
//                         {skill}
//                       </span>
//                     ))}
//                   </div>
//                   <button className="btn-solid-bg-transition btn-solid-bg-transition-orange px-4 py-1 tracking-widest uppercase">
//                     <span> Apply</span>
//                   </button>
//                 </div>
//               ))
//             ) : (
//               <div className="text-center text-xl text-gray-500">
//                 No job listings available
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default JobOpeningsPage;

"use client";

import StaticHeroComponent from "@/components/StaticHeroComponent";
import React, { useState } from "react";

const JobListingPage = () => {
  // Define the Job type
  interface Job {
    title: string;
    department: string;
    location: string;
    type: string;
    date: string;
    experience: string; // Experience level
  }

  // Dummy data for jobs
  const dummyJobs: Job[] = [
    { title: "Software Engineer", department: "Engineering", location: "Bangalore", type: "Full-Time", date: "2024-11-01", experience: "2" },
    { title: "Marketing Manager", department: "Marketing", location: "Remote", type: "Part-Time", date: "2024-12-01", experience: "5" },
    { title: "Product Manager", department: "Engineering", location: "Bangalore", type: "Full-Time", date: "2024-10-15", experience: "3" },
    { title: "Data Scientist", department: "Engineering", location: "Remote", type: "Full-Time", date: "2024-09-01", experience: "4" },
    { title: "HR Specialist", department: "Human Resources", location: "Bangalore", type: "Contract", date: "2024-12-10", experience: "1" },
    { title: "Graphic Designer", department: "Marketing", location: "Remote", type: "Freelance", date: "2024-11-20", experience: "2" },
  ];

  // State to store job data and loading state
  const [jobs] = useState<Job[]>(dummyJobs);
  const [loading, setLoading] = useState(false);
  const [filteredJobs, setFilteredJobs] = useState<Job[]>(dummyJobs); // State for filtered jobs
  const [modalKey, setModalKey] = useState(0); // Key to force re-render
  const [activeModal, setActiveModal] = useState<string | null>(null); // Manage active modal state

  // Handlers to open specific modals
  const openModal = (modalType: string) => {
    setModalKey((prevKey) => prevKey + 1); // Increment key for re-render
    setActiveModal(modalType); // Set the active modal
  };

  const closeModal = () => {
    setActiveModal(null); // Close any active modal
  };

  // Search filter states
  const [jobTitle, setJobTitle] = useState<string>("");
  const [department, setDepartment] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [experienceFrom, setExperienceFrom] = useState<string>("");
  const [experienceTo, setExperienceTo] = useState<string>("");

  // Function to filter jobs when the search button is clicked
  const handleSearchClick = () => {
    setLoading(true);  // Show loading state

    // Filtering the jobs based on the selected filter values
    const filtered = jobs.filter((job) => {
      const experienceLevel = parseInt(job.experience);
      const from = experienceFrom ? parseInt(experienceFrom) : 0;
      const to = experienceTo ? parseInt(experienceTo) : 100;

      // Apply filters for job title, department, location, and experience
      const titleMatch = job.title.toLowerCase().includes(jobTitle.toLowerCase());
      const departmentMatch = department ? job.department === department : true;
      const locationMatch = location ? job.location === location : true;
      const experienceMatch = experienceLevel >= from && experienceLevel <= to;

      return titleMatch && departmentMatch && locationMatch && experienceMatch;
    });

    // Set filtered jobs after 300ms delay (for demo purposes)
    setTimeout(() => {
      setFilteredJobs(filtered);
      setLoading(false);  // Hide loading state after filtering
    }, 300);
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Header Section */}
      <header className=" ">
        <div className="container mx-auto ">
        <StaticHeroComponent
        titleSubContext={
          <>
            <span className="glitter_text text-orange-500">Careers</span> at AchieversIT <br />
            Build Your Dream with  <span className="glitter_text text-mainblue">Expert Talent</span>
          </>
        }
        onEnrollClick={() => openModal("advisor")} // Open advisor modal
        modalTitle="Unlock Expert Talent with AchieversIT"
        modalText="Share your details so we can match your requirements and reach out to you in the future"
        modalform="currentopenings/enroll"
      />
          {/* <h1 className="text-2xl font-bold text-center md:text-left text-white uppercase">
            Careers at AchieversIT
          </h1> */}
        </div>
      </header>

      {/* Search Section */}
      <div className="bg-white shadow-md py-6 px-4">
        <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          <input
            type="text"
            placeholder="Enter Job Title"
            className="border p-2 rounded w-full"
            value={jobTitle}
            onChange={(e) => setJobTitle(e.target.value)}
          />
          <select
            className="border p-2 rounded w-full"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
          >
            <option value="">Select Department</option>
            <option value="Engineering">Engineering</option>
            <option value="Marketing">Marketing</option>
            <option value="Human Resources">Human Resources</option>
          </select>
          <select
            className="border p-2 rounded w-full"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          >
            <option value="">Select Location</option>
            <option value="Bangalore">Bangalore</option>
            <option value="Remote">Remote</option>
          </select>

          {/* Experience From Field */}
          <select
            className="border p-2 rounded w-full"
            value={experienceFrom}
            onChange={(e) => setExperienceFrom(e.target.value)}
          >
            <option value="">Experience From</option>
            <option value="0">0+ years</option>
            <option value="1">1+ years</option>
            <option value="2">2+ years</option>
            <option value="3">3+ years</option>
            <option value="5">5+ years</option>
            <option value="10">10+ years</option>
          </select>

          {/* Experience To Field */}
          <select
            className="border p-2 rounded w-full"
            value={experienceTo}
            onChange={(e) => setExperienceTo(e.target.value)}
          >
            <option value="">Experience To</option>
            <option value="1">1 year</option>
            <option value="2">2 years</option>
            <option value="3">3 years</option>
            <option value="5">5 years</option>
            <option value="10">10 years</option>
            <option value="15">15 years</option>
          </select>
        </div>
      </div>

      {/* Centered Search Button */}
      <div className="flex justify-center mt-4">
        <button
          className="bg-maincolor_1 text-white py-2 px-10 rounded hover:bg-blue-700 transition"
          onClick={handleSearchClick}
        >
          Search
        </button>
      </div>

      {/* Job Listings */}
      <div className="container mx-auto px-4 mt-8">
        <h2 className="text-xl font-semibold mb-4 text-center md:text-left">
          Current Openings
        </h2>

        {/* Loading State */}
        {loading ? (
          <div className="text-center text-xl text-gray-500">Filtering jobs...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full bg-white shadow-md rounded text-sm md:text-base">
              <thead>
                <tr className="bg-maincolor_1 text-white uppercase text-xs md:text-xl">
                  <th className="text-left py-3 px-4">Job Title</th>
                  <th className="text-left py-3 px-4">Department</th>
                  <th className="text-left py-3 px-4">Location</th>
                  <th className="text-left py-3 px-4">Job Type</th>
                  <th className="text-left py-3 px-4">Experience</th>
                  <th className="text-left py-3 px-4">Posted On</th>
                </tr>
              </thead>
              <tbody>
                {filteredJobs.length > 0 ? (
                  filteredJobs.map((job, index) => (
                    <tr
                      key={index}
                      className={`border-b hover:bg-gray-100 transition ${
                        index % 2 === 0 ? "bg-gray-50" : "bg-white"
                      }`}
                    >
                      <td className="py-3 px-4">{job.title}</td>
                      <td className="py-3 px-4">{job.department}</td>
                      <td className="py-3 px-4">{job.location}</td>
                      <td className="py-3 px-4">{job.type}</td>
                      <td className="py-3 px-4">{job.experience} years</td>
                      <td className="py-3 px-4">{job.date}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="text-center py-3 px-4">
                      No job listings available
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default JobListingPage;

