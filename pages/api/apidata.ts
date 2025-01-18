export const logBasicInfo = (data: any): void => {
    if (process.env.NODE_ENV !== "production") {
      console.log(
        "%cBasic Info Data:",
        "color: #1E90FF; font-weight: bold; background: #E6F7FF; padding: 4px; border-radius: 4px;",
        data
      );
    }
  };
  
  export const logCourseSkills = (data: any): void => {
    if (process.env.NODE_ENV !== "production") {
      console.log(
        "%cCourse Skills Data:",
        "color: #32CD32; font-weight: bold; background: #E6FFE6; padding: 4px; border-radius: 4px;",
        data
      );
    }
  };
  
  export const logFAQs = (data: any): void => {
    if (process.env.NODE_ENV !== "production") {
      console.log(
        "%cFAQs Data:",
        "color: #FFA500; font-weight: bold; background: #FFF4E6; padding: 4px; border-radius: 4px;",
        data
      );
    }
  };
  
  export const logError = (error: any, description: string): void => {
    console.error(
      `%c${description}:`,
      "color: #FF5722; font-weight: bold; background: #FFE6E6; padding: 4px; border-radius: 4px;",
      error
    );
  };
  


// ---------------------------------------------------
export const logBlogDetails = (data: any): void => {
    if (process.env.NODE_ENV !== "production") {
      console.log(
        "%cBlog Details Data:",
        "color: #9370DB; font-weight: bold; background: #F5F5FF; padding: 4px; border-radius: 4px;",
        data
      );
    }
  };
  
  export const logBlogError = (error: any, description: string): void => {
    console.error(
      `%c${description}:`,
      "color: #FF4500; font-weight: bold; background: #FFEFEB; padding: 4px; border-radius: 4px;",
      error
    );
  };
  
  export const logGeneralInfo = (info: any, description: string): void => {
    if (process.env.NODE_ENV !== "production") {
      console.log(
        `%c${description}:`,
        "color: #4682B4; font-weight: bold; background: #F0F8FF; padding: 4px; border-radius: 4px;",
        info
      );
    }
  };
  