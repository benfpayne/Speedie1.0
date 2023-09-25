import * as React from 'react';
import Fade from 'react-reveal/Fade';

const Explanation = () => {
  return (
    <div className="flex flex-col">
      <div className="font-serif underline font-bold text-center text-3xl mx-auto mb-8">
        How are the weekly payments so much lower?
      </div>
      {/* <div className="font-serif text-center mt-4">
        Simple! Through <span className="underline">PCP Financing</span>
      </div> */}
      <div className="text-center bg-accentTwo mt-12 rounded-3xl py-8">
        <div className="text-xl font-serif mx-8">
          <Fade Reveal>A PCP Contract is made up of three components</Fade>
        </div>
        <div
          className={`flex flex-col mt-4 text-left text-xl mx-8 justify-center items-center`}
        >
          <Fade Reveal>
            <ol className="list-decimal list-inside">
              <li className="my-2 font-bold">Deposit</li>
              <li className="my-2 font-bold">Monthly Repayments</li>
              <li className="my-2 font-bold">Optional final payment</li>
            </ol>
          </Fade>
        </div>
      </div>
      <div className="flex flex-col my-16 max-w-[80%] mx-auto text-xl">
        <Fade Reveal>
          <span>
            In a PCP (Personal Contract Purchase), the deposit and monthly
            repayments are based off of the car's{' '}
            <span className="italic font-bold tooltip">
              depreciation
              <span className="tooltiptext">
                Depreciation is the difference between a car's value when you
                buy it and when you come to sell it
              </span>
            </span>{' '}
            - unlike a normal car lease, where its based off the entire value of
            the car.
          </span>
          <br />
          <br />
          The value of the car after estimated depreciation is the Guaranteed
          Minimum Future Value (GMFV). If you love your new car and want to buy
          it outright, you can pay the GMFV as a balloon payment at the end of
          the term!
          <div className="inline-flex rounded-3xl px-8 py-4 my-16 bg-accentTwo text-center mx-auto">
            <span className="text-xl bold underline">
              In other words - you only pay for what you use of the car!
            </span>
          </div>
          <div className="">
            PCP contracts give you maximum flexibility at the end of the term.
            You have three options - Buy, Exchange, or Return.
          </div>
        </Fade>
      </div>
    </div>
  );
};

export default Explanation;
