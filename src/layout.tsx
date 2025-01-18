import React, { useEffect, useCallback } from "react";
import Head from "next/head"; // Import Head for SEO
import Header from "./components/Header";
import Footer from "./components/Footer";
import ScrollToTopButton from "./components/ScrollToTop";
import LocationComponent from "@/components/Location";
import { Provider } from "react-redux";
import store from "@/redux/store";
import useScrollAnimation from "./utils/useScrollAnimation";
import "intersection-observer";
import { LoaderProvider, useLoader } from "@/utils/LoaderContext";
import { BlogProvider } from "@/utils/BlogContext";
import { CourseProvider } from "@/utils/CourseContext";
import ReduxProvider from "@/components/ReduxProvider";
import locationData from "./utils/Location";
import { RegionProvider } from '@/utils/RegionContext';
import BookLoader from "@/components/BookLoader";
import { usePathname } from "next/navigation";
import {CandidateProvider} from "@/utils/CandidateStoryContext";
import ContactUsButton from "./components/ContactUsButton";
import LimitedSeatsCTA from "./components/LimitedSeatsCTA";
export default function Layout({ children }: { children: React.ReactNode }) {
  console.log("Children received in Layout:", children); // Debugging line

  useScrollAnimation();

  return (
    <Provider store={store}>
      <RegionProvider>
        <LoaderProvider>
          <ReduxProvider>
            <BlogProvider>
              <CourseProvider>
                <CandidateProvider>
                  <Head>
                    <title>AchieversIT - Your Path to Success</title>
                    <meta name="description" content="AchieversIT offers the best courses to help you achieve your career goals." />
                    <link rel="preload" href="/path/to/lcp-image.jpg" as="image" /> {/* Preload LCP image */}
                  </Head>
                  <div className="layout-container">
                    <LoaderConsumer>{children}</LoaderConsumer>
                    <ScrollToTopButton />
                  </div>
                </CandidateProvider>
              </CourseProvider>
            </BlogProvider>
          </ReduxProvider>
        </LoaderProvider>
      </RegionProvider>
    </Provider>
  );
}

function LoaderConsumer({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { loading, setLoading } = useLoader();

  const handleLoading = useCallback(() => {
    setLoading(true);
    const timeoutId = setTimeout(() => setLoading(false), 500); // Simulate a loader duration
    return () => clearTimeout(timeoutId);
  }, [setLoading]);

  useEffect(() => {
    handleLoading();
  }, [pathname, handleLoading]);

  return (
    <>
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-loader z-50">
          <BookLoader />
        </div>
      )}
      {!loading && (
        <>
          <Header />
          <main className="min-h-screen">{children}</main>
          <LocationComponent locationData={locationData} />
          <LimitedSeatsCTA/>
          <ContactUsButton/>
          <Footer />
          <ScrollToTopButton />
        
        </>
      )}
    </>
  );
}

