import * as React from 'react';
import Fade from 'react-reveal/Fade';

export const Cons = () => {
  return (
    <div className="flex flex-col mt-12 text-left max-w-[80%] mx-auto justify-center bg-gray-200 p-4 rounded-3xl">
      <Fade Reveal>
        <ul className="list-disc list-inside">
          <li className="mb-6 font-bold">
            Ownership <br />
            <br />
            <span className="font-normal">
              The main con / difference between a regular car loan and PCP is
              that you do not own the car during the contract, and paying all
              the monthly payments does not mean you own the car at the end of
              the contract. Untill you pay the balloon payment at the end of the
              contract, legal ownership of the car is with the finance company.{' '}
              <br />
              <br />
              This differs to a regular car loan / hire purchase, where each
              time you pay the monthly payments you pay off a small amount of
              the loan as well which sees you owning the car at the end of the
              contract term.
            </span>
          </li>
          <li className="font-bold">
            Usage
            <br />
            <br />
            <span className="font-normal">
              PCP Contracts tends to have a certain amount of kilometre's you
              can drive the car over the contracted term. For example, a 36
              month contract may have a contracted limit of 36,000 km’s you can
              drive the car for. If you exceed the allocated kilometres, you
              will pay for every kilometre you go over the contracted amount
              (which tends to be quite expensive). You are also required to keep
              the car on a good condition, and any excess wear and tear may see
              you pay extra at the end of the finance term.
            </span>
          </li>
        </ul>
      </Fade>
    </div>
  );
};
