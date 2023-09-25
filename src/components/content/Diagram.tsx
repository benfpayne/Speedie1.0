import { Listbox, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import * as React from 'react';
import { Fragment } from 'react';
import { formatMoney } from '../../utils/currency';
import { CarFinanceInfo } from '../CalculatorDesktopLayout';

const Diagram = (props: {
  carFinanceInfo: CarFinanceInfo;
  horizontal: boolean;
}) => {
  const { carFinanceInfo, horizontal } = props;
  const [selectedEndOption, setSelectedEndOption] = React.useState<
    'Buy' | 'Exchange' | 'Return'
  >('Exchange');

  const endOptions = {
    Buy: (
      <span>
        Pay an optional balloon payment of{' '}
        <span className="font-bold">
          {formatMoney(carFinanceInfo.paymentCalculations.balloonPayment)}
        </span>{' '}
        to keep the car forever!
      </span>
    ),
    Exchange: 'Exchange your car for a new one at the end of your contract!',
    Return: "Moving away or don't need a car? Simply return the car!"
  };
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
          {formatMoney(carFinanceInfo.paymentCalculations.depositAmount)}
        </div>
        <div
          className={`flex ${
            horizontal ? 'flex-row space-x-2' : 'flex-col space-y-2'
          } items-center justify-center ${horizontal ? 'col-span-3' : ''}`}
        >
          {Array.from({ length: horizontal ? 35 : 7 }).map((_, i) => (
            <div
              key={i}
              className={`${
                horizontal ? 'h-full' : 'h-2 w-full'
              } bg-gray-300 mx-[3px]`}
              style={{ width: horizontal ? 'calc(100% / 35)' : '' }}
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
        <Listbox
          className={`bg-primary rounded-e-3xl max-h-24 w-full ${
            horizontal ? 'col-span-2' : ''
          }`}
          value={selectedEndOption}
          onChange={(value) => {
            setSelectedEndOption(value);
          }}
        >
          <div className="flex relative items-center">
            <Listbox.Button className="transition-opacity duration-300 hover:opacity-75 relative w-full cursor-default rounded-e-3xl bg-primary py-4 pl-5 pr-10 text-left focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
              <span className="block truncate text-white text-xl whitespace-normal">
                {selectedEndOption}
              </span>
              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4">
                <ChevronDownIcon
                  className="h-5 w-5 text-white"
                  aria-hidden="true"
                />
              </span>
            </Listbox.Button>
            <Transition
              as={Fragment}
              enter="transition ease-in duration-100"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="z-10 absolute mt-56 w-full overflow-auto rounded-b-3xl bg-accent text-xl shadow-lg focus:outline-none sm:text-sm ">
                {Object.keys(endOptions).map((option, optionIdx) => {
                  return (
                    <Listbox.Option
                      key={optionIdx}
                      className={({ active }) =>
                        `relative cursor-default select-none py-4 pl-5 pr-2  ${
                          active ? 'bg-primary text-white' : 'text-gray-900'
                        }`
                      }
                      value={option}
                    >
                      {({ selected }) => (
                        <>
                          <span
                            className={`block truncate text-xl ${
                              selected ? 'font-medium' : 'font-normal'
                            }`}
                          >
                            {option}
                          </span>
                        </>
                      )}
                    </Listbox.Option>
                  );
                })}
              </Listbox.Options>
            </Transition>
          </div>
        </Listbox>
        <div
          className={`flex ${
            horizontal ? 'items-start' : 'items-center'
          } justify-start pl-2 lg:text-xl`}
        >
          Deposit
        </div>
        <div
          className={`flex items-start pl-2 ${
            horizontal ? 'col-span-3' : ''
          } justify-start text-start`}
        >
          <span className="lg:text-xl">
            Monthly Payments of{' '}
            <span className="font-bold text-green-500 lg:text-2xl">
              {formatMoney(
                carFinanceInfo.paymentCalculations.totalPaymentPerPeriod * 4
              )}
            </span>{' '}
            for 36 months
          </span>
        </div>
        <div
          className={`flex justify-start text-start pl-2 lg:text-xl ${
            horizontal ? 'col-span-2 items-start' : ''
          }`}
        >
          <span>{endOptions[selectedEndOption]}</span>
        </div>
      </div>
    </div>
  );
};

export default Diagram;
