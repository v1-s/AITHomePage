export const fetchCourses = async () => {
    const response = await fetch("/api/courses");
    if (!response.ok) throw new Error("Failed to fetch courses");
    return response.json();
  };
  
  export const fetchCourseById = async (id: string) => {
    const courses = await fetchCourses();
    return courses.find((course: { id: string }) => course.id === id);
  };
  