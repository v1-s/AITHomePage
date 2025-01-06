import React, { createContext, useContext, useState, useCallback, ReactNode, useMemo } from "react";

// Blog type definition
type Blog = {
  id: number;
  blog_name: string;
  blog_content: string;
  baseurl: string;
  blog_writter: string;
  blog_category: string;
  no_of_views: number;
  created_at: string;
  selectedBlog?: Blog | null;
  image: string;
};

interface BlogContextType {
  selectedBlog: Blog | null;
  setSelectedBlog: (blog: Blog | null) => void;
}

// Initialize context with proper type
const BlogContext = createContext<BlogContextType | undefined>(undefined);

export const BlogProvider = ({ children }: { children: ReactNode }) => {
  const [selectedBlog, setSelectedBlog] = useState<Blog | null>(null);

  const handleSetSelectedBlog = useCallback((blog: Blog | null) => {
    setSelectedBlog(blog);
  }, []);

  // Use useMemo to optimize context value
  const value = useMemo(() => ({ selectedBlog, setSelectedBlog: handleSetSelectedBlog }), [selectedBlog, handleSetSelectedBlog]);

  return (
    <BlogContext.Provider value={value}>
      {children}
    </BlogContext.Provider>
  );
};

export const useBlogContext = () => {
  const context = useContext(BlogContext);
  if (!context) {
    throw new Error("useBlogContext must be used within a BlogProvider");
  }
  return context;
};
