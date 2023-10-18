import * as React from 'react';

export default function VerticalBox(props: any) {
  const { step, title, explanation, enableButton=false } = props;
  return (
    <div className="flex flex-col items-center w-auto md:w-auto lg:w-1/2 mb-12">
      <h1 className="font-sans text-5xl font-bold text-primary leading-[4rem]">
        {step}
      </h1>
      <h1 className="font-sans text-2xl font-black leading-[4rem]">{title}</h1>
      <p className="mt-4 px-20 text-base leading-8 text-center">
        {explanation}
      </p>
      {enableButton ?  <a href="#" className="text-primary hover:text-tan">Learn more about your options</a> : ""}
    </div>
  );
}
