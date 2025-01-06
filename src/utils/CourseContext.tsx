import React, { createContext, useContext, useState, useCallback, useMemo, useEffect } from "react";
import courseData from "@/utils/mockData";

interface CurriculumData {
    title: string;
    content: string[];
}

interface Course {
    id: string;
    image: string;
    logo: string;
    partner: string;
    title: string;
    duration: string;
    date: string;
    mode: string;
    badge: string;
    link: string;
    rating: number;
    reviews: string;
    highlights: string[];
    skills: string[];
    curriculumData: CurriculumData[];
}

interface CourseContextProps {
    course: Course | null;
    loading: boolean;
    fetchCourse: (id: string) => void;
}

const CourseContext = createContext<CourseContextProps | undefined>(undefined);

export const useCourse = () => {
    const context = useContext(CourseContext);
    if (!context) {
        throw new Error("useCourse must be used within a CourseProvider");
    }
    return context;
};

export const CourseProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [course, setCourse] = useState<Course | null>(null);
    const [loading, setLoading] = useState(true);

    const fetchCourse = useCallback((id: string) => {
        setLoading(true);
        const allCourses = Object.values(courseData).flat();
        const matchedCourse = allCourses.find((course) => course.id === id) || null;
        setCourse(matchedCourse);
        setLoading(false);
    }, []);

    const value = useMemo(() => ({ course, loading, fetchCourse }), [course, loading, fetchCourse]);

    useEffect(() => {
        // Preload course data if needed
    }, []);

    return (
        <CourseContext.Provider value={value}>
            {children}
        </CourseContext.Provider>
    );
};
