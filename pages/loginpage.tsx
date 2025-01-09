// pages/login.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();
  
    useEffect(() => {
      // Clear error message on input change
      setError("");
    }, [email, password]);
  
    const handleLogin = (e: React.FormEvent) => {
      e.preventDefault();
  
      const submittedEmails = JSON.parse(sessionStorage.getItem("submittedEmails") || "[]");
      const submittedPhones = JSON.parse(sessionStorage.getItem("submittedPhones") || "[]");
  
      // Check if the email or phone exists in sessionStorage
      if (submittedEmails.includes(email) || submittedPhones.includes(email)) {
        router.push("/"); // Redirect to home page
      } else {
        setError("Invalid email or phone number. Please provide the submitted email or phone number.");
      }
    };
  return (
    <div className="flex h-screen">
      {/* Left Section */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center px-8 md:px-16 lg:px-24 my-[60vh]">
        <div className="w-full max-w-sm">
          
          <h2 className="text-3xl font-bold mb-2">Welcome back!</h2>
          <p className="text-gray-600 mb-6">Log in with your email</p>
          <form className="space-y-4" onSubmit={handleLogin}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email or Phone*
              </label>
              <input
                type="text"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email or phone number"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
              />
            </div>
            {/* <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password*
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
              />
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>} */}
            <div className="flex justify-between items-center">
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" />
                Remember Me
              </label>
              <a href="#" className="text-blue-500 hover:underline text-sm font-medium">
                Forgot Password?
              </a>
            </div>
            <button
              type="submit"
              className="w-full py-3 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-600"
            >
              Login
            </button>
          </form>
          <div className="flex items-center my-6">
            <hr className="flex-grow border-gray-300" />
            <span className="px-4 text-gray-500 text-sm font-medium">OR</span>
            <hr className="flex-grow border-gray-300" />
          </div>
          <div className="space-y-4">
            <button className="w-full py-3 border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-100">
              <Image src="/google-icon.png" alt="Google" width={20} height={20} className="mr-3" />
              Continue with Google
            </button>
            <button className="w-full py-3 border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-100">
              <Image src="/linkedin-icon.png" alt="LinkedIn" width={20} height={20} className="mr-3" />
              Continue with LinkedIn
            </button>
          </div>
          <p className="text-center text-sm text-gray-500 mt-4">
            View more login options
          </p>
        </div>
      </div>

      {/* Right Section */}
      <div className="hidden lg:block lg:w-1/2 bg-gray-100 relative">
        <div className="absolute inset-0">
          <Image
            src="/assets/images/devopscard1.jpg"
            alt="Login Side"
            fill
            className="object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-start p-16">
          <h2 className="text-white text-3xl font-bold mb-4">Get Certified. Get Ahead.</h2>
          <ul className="text-gray-300 space-y-2">
            <li>5M+ careers advanced</li>
            <li>1500+ Live classes every month</li>
            <li>85% report promotion or a new job</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
