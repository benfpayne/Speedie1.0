import React, { createContext, useContext, useState } from 'react';
import { Distance, Term } from './types/labels';

const CarDataContext = createContext();

export const useCarDataContext = () => {
  return useContext(CarDataContext);
};

export const CarDataProvider = ({ children }) => {
  const term: Term[] = [
    {
      id: 1,
      term: 12,
      name: '1 year'
    },
    {
      id: 2,
      term: 24,
      name: '2 years'
    },
    {
      id: 3,
      term: 36,
      name: '3 years'
    },
    {
      id: 4,
      term: 48,
      name: '4 years'
    }
  ];

  const distance: Distance[] = [
    {
      id: 1,
      kilometers: 10000,
      name: '10,000 KMs'
    },
    {
      id: 2,
      kilometers: 20000,
      name: '20,000 KMs'
    },
    {
      id: 3,
      kilometers: 30000,
      name: '30,000 KMs'
    },
    {
      id: 4,
      kilometers: 40000,
      name: '40,000 KMs'
    },
    {
      id: 5,
      kilometers: 50000,
      name: '50,000 KMs'
    }
  ];

  const [selectedMake, setSelectedMake] = useState('');
  const [selectedModel, setSelectedModel] = useState('');
  const [selectedDescription, setSelectedDescription] = useState('');
  const [makeQuery, setMakeQuery] = useState('');
  const [modelQuery, setModelQuery] = useState('');
  const [descriptionQuery, setDescriptionQuery] = useState('');
  const [years, setYears] = useState(term[2]); // Make sure 'term' is defined
  const [kilometers, setKilometers] = useState(distance[2]); // Make sure 'distance' is defined
  const [formError, setFormError] = useState(false);
  const [carFinanceInfo, setCarFinanceInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const [submitted, setSubmitted] = useState(false);
  const [emailLoading, setEmailLoading] = useState(false);

  const contextValue = {
    selectedMake,
    setSelectedMake,
    selectedModel,
    setSelectedModel,
    selectedDescription,
    setSelectedDescription,
    makeQuery,
    setMakeQuery,
    modelQuery,
    setModelQuery,
    descriptionQuery,
    setDescriptionQuery,
    years,
    setYears,
    kilometers,
    setKilometers,
    formError,
    setFormError,
    carFinanceInfo,
    setCarFinanceInfo,
    isLoading,
    setIsLoading,
    modalOpen,
    setModalOpen,
    submitted,
    setSubmitted,
    emailLoading,
    setEmailLoading
  };

  return (
    <CarDataContext.Provider value={contextValue}>
      {children}
    </CarDataContext.Provider>
  );
};
