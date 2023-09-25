import * as React from 'react';
import Fade from 'react-reveal/Fade';

export const Pros = () => {
  return (
    <div>
      <div className="flex flex-col mt-12 text-left max-w-[80%] mx-auto justify-center bg-green-300 p-4 rounded-3xl">
        <Fade Reveal>
          <ul className="list-disc list-inside">
            <li className="mb-6 font-bold">
              Lower Payments <br />
              <br />
              <span className="font-normal">
                One of the main benefits of a PCP contract is the lower monthly
                payments. This would mean better weekly cashflow, or a better
                car for a similar monthly payment on regular finance.
              </span>
            </li>
            <li className="font-bold">
              Flexibility
              <br />
              <br />
              <span className="font-normal">
                One of the main benefits of a PCP contract is the lower monthly
                payments. This would mean better weekly cashflow, or a better
                car for a similar monthly payment on regular finance.
              </span>
            </li>
          </ul>
        </Fade>
      </div>
    </div>
  );
};
