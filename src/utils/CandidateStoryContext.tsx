import React, { createContext, useState, useContext } from 'react';

export type CandidateContextType = {
  name: string;
  image: string;
  prevcompnayrole: string;
  prevcompanyname: string;
  prevcmpnyimage: string;
  presentrole: string;
  presentcompnayname: string;
  presentimage: string;
};

interface CandidateContextProps {
  candidateData: CandidateContextType | null;
  setCandidateData: React.Dispatch<React.SetStateAction<CandidateContextType | null>>;
}

const CandidateContext = createContext<CandidateContextProps | undefined>(undefined);

export const CandidateProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [candidateData, setCandidateData] = useState<CandidateContextType | null>(null);

  return (
    <CandidateContext.Provider value={{ candidateData, setCandidateData }}>
      {children}
    </CandidateContext.Provider>
  );
};

export const useCandidate = (): CandidateContextProps => {
  const context = useContext(CandidateContext);
  if (!context) {
    throw new Error('useCandidate must be used within a CandidateProvider');
  }
  return context;
};
