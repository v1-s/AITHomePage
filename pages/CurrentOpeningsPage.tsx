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
        <h2 className="text-md md:text-xl font-semibold mb-4 text-center md:text-left">
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

