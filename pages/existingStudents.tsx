"use client";

import React from 'react';
import Link from 'next/link'; // Import Link from next/link

const ExistingStudents = () => {
  return (
    <div className="w-full md:w-3/4 mx-auto p-6 text-center my-14">
      <h1 className="font-bold text-3xl sm:text-2xl md:text-3xl mb-4">
        Welcome Back, Existing Students!
      </h1>
      <p className="text-xl sm:text-lg mb-4">
        We are excited to have you continue your learning journey with AchieversIT.
      </p>
      <p className="text-xl sm:text-lg mb-4">
        As an existing student, you have access to a variety of resources to help you succeed:
      </p>
      <ul className="list-disc list-inside text-xl sm:text-lg mb-4">
        <li>Exclusive course updates and materials</li>
        <li>Personalized support from our instructors</li>
        <li>Access to student forums and community groups</li>
        <li>Regular webinars and workshops to enhance your skills</li>
      </ul>
      <p className="text-xl sm:text-lg mb-4">
        Don&apos;t forget to check your dashboard for the latest announcements and updates!
      </p>
      <Link 
        href="/student-dashboard" 
        className="inline-block bg-mainblue text-white py-2 px-6 rounded-md hover:bg-blue-700 transition-all"
      >
        <span>Go to Your Dashboard</span>
      </Link>
    </div>
  );
};

export default ExistingStudents;
