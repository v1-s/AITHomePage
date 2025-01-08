"use client";

import React, { useState, useEffect, useMemo } from "react";
import StaticHeroComponent from "@/components/StaticHeroComponent";
interface Job {
  title: string;
  experience: string;
  location: string;
  skills: string[];
}

const JobOpeningsPage = () => {
  const [loading, setLoading] = useState(true);
  const [minExperience, setMinExperience] = useState<number | string>("");
  const [maxExperience, setMaxExperience] = useState<number | string>("");
  const [location, setLocation] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([]); // Use Job[] instead of any[]
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
  
  const mockJobs: Job[] = useMemo(() => [
    {
      title: "Software Engineer",
      experience: "2-4 years",
      location: "Bangalore",
      skills: ["JavaScript", "React", "Node.js"],
    },
    {
      title: "Backend Developer",
      experience: "3-5 years",
      location: "Hyderabad",
      skills: ["Python", "Django", "SQL"],
    },
    {
      title: "Frontend Developer",
      experience: "1-3 years",
      location: "Remote",
      skills: ["HTML", "CSS", "React"],
    },
    {
      title: "Data Scientist",
      experience: "4-6 years",
      location: "Bangalore",
      skills: ["Python", "Machine Learning", "AI"],
    },
  ], []); // The empty dependency array ensures mockJobs is memoized and won't change unless explicitly updated.

  const applyFilters = () => {
    setLoading(true);

    let filtered = mockJobs;

    if (searchTerm) {
      filtered = filtered.filter((job) =>
        job.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (location) {
      filtered = filtered.filter((job) => job.location === location);
    }

    if (minExperience || maxExperience) {
      filtered = filtered.filter((job) => {
        const jobExperience = job.experience
          .split("-")
          .map((e) => parseInt(e.trim().replace(" years", "")));
        const minExp = minExperience ? parseInt(minExperience.toString()) : 0;
        const maxExp = maxExperience ? parseInt(maxExperience.toString()) : 100;

        return jobExperience[0] >= minExp && jobExperience[1] <= maxExp;
      });
    }

    setFilteredJobs(filtered);
    setLoading(false);
  };

  useEffect(() => {
    setTimeout(() => {
      setFilteredJobs(mockJobs);
      setLoading(false);
    }, 1500);
  }, [mockJobs]);

  return (
    <div className="bg-gray-100 min-h-screen ">
      <div className="max-w-7xl mx-auto text-center">
      <StaticHeroComponent
        titleSubContext={
          <>
            <span className="glitter_text text-orange-500">Career opportunity</span> at AchieversIT <br />
            Build Your Dream with  <span className="glitter_text text-mainblue">Expert Talent</span>
          </>
        }
        onEnrollClick={() => openModal("advisor")} // Open advisor modal
        modalTitle="Unlock Expert Talent with AchieversIT"
        modalText="Share your details so we can match your requirements and reach out to you in the future"
        modalform="currentopenings/enroll"
      />
         
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-6 py-7">
        <div className="bg-white shadow-md rounded p-4 space-y-6">
          <div>
            <h3 className="font-bold text-lg text-gray-700">By Experience</h3>
            <div className="flex items-center space-x-4 mt-4">
              <input
                type="number"
                placeholder="Min Exp"
                className="border p-2 rounded w-full"
                value={minExperience}
                onChange={(e) => setMinExperience(e.target.value)}
              />
              <input
                type="number"
                placeholder="Max Exp"
                className="border p-2 rounded w-full"
                value={maxExperience}
                onChange={(e) => setMaxExperience(e.target.value)}
              />
            </div>
            <div>
            <h3 className="font-bold text-lg text-gray-700">Location</h3>
            <select
              className="w-full border p-2 rounded mt-4"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            >
              <option value="">Select Location</option>
              <option value="Bangalore">Bangalore</option>
              <option value="Remote">Remote</option>
              <option value="Hyderabad">Hyderabad</option>
            </select>
          </div>
            <div className="flex items-center justify-between mt-4">
              <button
                className="bg-mainBlue text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                onClick={() => {
                  setMinExperience("");
                  setMaxExperience("");
                  applyFilters();
                }}
              >
                Reset
              </button>
              <button
                className="bg-mainBlue text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                onClick={applyFilters}
              >
                Apply
              </button>
            </div>
          </div>

        
        </div>

        <div className="lg:col-span-3">
          <div className="flex flex-1 mb-6">
            <input
              type="text"
              placeholder="Search Job Title"
              className="border p-2 rounded w-full lg:w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button
              className="bg-mainBlue text-white px-4 py-2 rounded hover:bg-blue-600 transition ml-4"
              onClick={() => {
                setSearchTerm("");
                applyFilters();
              }}
            >
              Search
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {loading ? (
              <div className="text-center text-xl text-gray-500">
                Loading jobs...
              </div>
            ) : filteredJobs.length > 0 ? (
              filteredJobs.map((job, index) => (
                <div
                  key={index}
                  className="bg-white shadow-md rounded p-4 hover:shadow-lg transition"
                >
                  <h3 className="font-bold text-lg text-gray-800 mb-2">
                    {job.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-2">
                    Experience: {job.experience}
                  </p>
                  <p className="text-sm text-gray-600 mb-4">
                    Location: {job.location}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {job.skills.map((skill, idx) => (
                      <span
                        key={idx}
                        className="bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded w-auto"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                  <button className="btn-solid-bg-transition btn-solid-bg-transition-orange px-4 py-1 tracking-widest uppercase">
                    <span> Apply</span>
                  </button>
                </div>
              ))
            ) : (
              <div className="text-center text-xl text-gray-500">
                No job listings available
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobOpeningsPage;


