import '@fontsource/playfair-display';
import '@fontsource/poppins';
import '@fontsource/roboto';
import React from 'react';
import { CarDataProvider } from './src/components/CarDataContext'; // Adjust the path accordingly
import './src/styles/global.css';

export const wrapRootElement = ({ element }) => {
  return <CarDataProvider>{element}</CarDataProvider>;
};
