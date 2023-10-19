import * as React from 'react';
import NavigationButton from '../NavigationButton';

export default function TitleHeader(props : any) {
  const {title, subtitle, enableButton=false, className} = props;
  return (
    <div className={className}>
      <h1 className="mb-4 text-4xl font-extrabold leading-tight text-gray md:text-5xl lg:text-6xl lg:leading-tight">
        {title}
      </h1>
      <p className="mb-6 text-lg font-normal text-gray-500 lg:text-xl">
        {subtitle}
      </p>
      {enableButton ? <NavigationButton title="Apply Now" href="#"/> : ""}
    </div>
  );
}


