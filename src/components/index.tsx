"use client";

import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollToTopButton from "@/components/ScrollToTop";
import BookLoader from "@/components/BookLoader";
import { LoaderProvider, useLoader } from "@/utils/LoaderContext";
import { BlogProvider } from "@/utils/BlogContext";
import { CourseProvider } from "@/utils/CourseContext";
import ReduxProvider from "@/components/ReduxProvider";
import { NavigationProvider } from "@/utils/NavigationContext";
import useScrollAnimation from "@/utils/useScrollAnimation";
import "intersection-observer";
import locationData from "@/utils/Location";
import LocationComponent from "@/components/Location";
import { Provider } from "react-redux";
import store from "@/redux/store";

export default function Layout({ children }: { children: React.ReactNode }) {
  useScrollAnimation();

  // Here, you might check if the content is loading and show BookLoader
  const { loading } = useLoader();  // Assuming `useLoader` provides a loading state

  return (
    <Provider store={store}>
      <LoaderProvider>
        <ReduxProvider>
          <BlogProvider>
            <CourseProvider>
              <NavigationProvider>
                <div className="layout-container">
                  <Header />
                  <main className="min-h-screen">
                    {loading ? <BookLoader /> : children} {/* Show BookLoader while loading */}
                  </main>
                  <LocationComponent locationData={locationData} />
                  <Footer />
                  <ScrollToTopButton />
                </div>
              </NavigationProvider>
            </CourseProvider>
          </BlogProvider>
        </ReduxProvider>
      </LoaderProvider>
    </Provider>
  );
}
