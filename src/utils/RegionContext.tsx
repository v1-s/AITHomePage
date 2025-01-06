import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Define the context with the default values
export const RegionContext = createContext({
  region: 'global',
  updateRegion: (newRegion: string) => {
    console.log(newRegion); // Use the newRegion parameter to avoid the warning
  },
});

export const useRegion = () => {
  return useContext(RegionContext);
};

export const RegionProvider = ({ children }: { children: ReactNode }) => {
  const [region, setRegion] = useState('global');

  // Load the region from localStorage when the component mounts
  useEffect(() => {
    const savedRegion = localStorage.getItem('region') || 'global';
    setRegion(savedRegion);
  }, []);

  // Function to update the region
  const updateRegion = (newRegion: string) => {
    setRegion(newRegion); // Update the state with the new region
    localStorage.setItem('region', newRegion); // Save the new region to localStorage
  };

  return (
    <RegionContext.Provider value={{ region, updateRegion }}>
      {children}
    </RegionContext.Provider>
  );
};
