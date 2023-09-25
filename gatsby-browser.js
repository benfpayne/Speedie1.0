import "@fontsource/josefin-sans";
import "@fontsource/playfair-display";
import React from 'react';
import { CarDataProvider } from './src/components/CarDataContext'; // Adjust the path accordingly
import "./src/styles/global.css";

export const wrapRootElement = ({ element }) => {
  return <CarDataProvider>{element}</CarDataProvider>;
};
