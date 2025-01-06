// import { useRouter } from "next/navigation";
// import { useContext, useState, ReactNode, createContext } from 'react';

// const NavigationContext = createContext<{
//   activePage: string;
//   setActivePage: React.Dispatch<React.SetStateAction<string>>;
//   navigateTo: (path: string) => void;
// }>({
//   activePage: "",
//   setActivePage: () => {},
//   navigateTo: () => {},
// });

// export const NavigationProvider = ({ children }: { children: ReactNode }) => {
//   const [activePage, setActivePage] = useState<string>("");
//   const router = useRouter();

//   const navigateTo = (path: string) => {
//     setActivePage(path);
//     router.push(path);  // Make sure to use router.push() for Next.js routing
//   };

//   return (
//     <NavigationContext.Provider value={{ activePage, setActivePage, navigateTo }}>
//       {children}
//     </NavigationContext.Provider>
//   );
// };

// export const useNavigation = () => useContext(NavigationContext);
// src/app/utils/navigationContext.tsx
import React, { createContext, useContext } from 'react';

// Define the type for the context
interface NavigationContextType {
  links: { name: string; path: string }[];
}

// Create the context
const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

// Create a custom hook to use the NavigationContext
export const useNavigation = () => {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error('useNavigation must be used within a NavigationProvider');
  }
  return context;
};

// Create the provider component
export const NavigationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const links = [
    { name: 'Home', path: '/' },
    { name: 'Corporate Training', path: '/corporateTraining' },
    
  
   
  ];

  return (
    <NavigationContext.Provider value={{ links }}>
      {children}
    </NavigationContext.Provider>
  );
};