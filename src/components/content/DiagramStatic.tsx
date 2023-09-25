import * as React from 'react';

const StaticDiagram = (props: { horizontal: boolean }) => {
  const { horizontal } = props;

  return (
    <div className="mx-8 my-8 flex flex-row justify-between">
      <div
        className={`grid ${
          horizontal
            ? 'grid-rows-2 grid-cols-6 grid-flow-row'
            : 'grid-rows-3 grid-cols-2 grid-flow-col'
        } 
         gap-2`}
      >
        <div className="inline-flex p-6 items-center justify-center bg-gray-300 text-2xl">
          $4500
        </div>
        <div
          className={`flex ${
            horizontal ? 'flex-row space-x-2' : 'flex-col space-y-2'
          } items-center justify-center ${horizontal ? 'col-span-4' : ''}`}
        >
          {Array.from({ length: horizontal ? 35 : 7 }).map((_, i) => (
            <div
              key={i}
              className={`${
                horizontal ? 'h-full w-4' : 'h-2 w-full'
              } bg-gray-300 mx-[3px]`}
            >
              {}
            </div>
          ))}
          {!horizontal &&
            Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="h-2 w-2 bg-gray-300">
                {}
              </div>
            ))}
        </div>
        <div className={`flex ${horizontal ? 'items-center' : 'items-start'}`}>
          <div
            className={`inline-block rounded-xl lg:text-xl w-full py-1 ${
              horizontal ? 'ml-4 text-center' : 'mt-4 items-start text-center'
            } `}
          >
            No Flexibility
          </div>
        </div>
        <span
          className={`flex ${
            horizontal ? 'items-start' : 'items-center'
          } justify-start pl-2 lg:text-xl`}
        >
          Deposit
        </span>
        <div
          className={`flex items-start pl-2 ${
            horizontal && 'col-span-4'
          } justify-start`}
        >
          <span className="text-start lg:text-xl">
            Monthly Payments of{' '}
            <span className="font-bold text-red-700 lg:text-2xl">$1361</span>{' '}
            for 36 months
          </span>
        </div>
        <span
          className={`flex justify-start text-center pl-2 col-span-1 lg:text-xl ${
            horizontal ? 'justify-center' : 'mt-4 py-1 items-start'
          }`}
        >
          End of Term
        </span>
      </div>
    </div>
  );
};

export default StaticDiagram;
