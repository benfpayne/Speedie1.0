import Lottie from 'lottie-react';
import * as React from 'react';
import { Fragment, useState } from 'react';
import carAnimation from '../../images/lotties/car.json';

import { Listbox, Tab, Transition } from '@headlessui/react';
import { ArrowLeftIcon, ChevronDownIcon } from '@heroicons/react/20/solid';

const StepFour: React.FC<PageProps> = (props) => {
  const {
    carFinanceInfo,
    selectedMake,
    selectedModel,
    selectedDescription,
    fetchCarFinanceInfo,
    setSelectedMake,
    setSelectedModel,
    setSelectedDescription,
    setCarFinanceInfo,
    setModalOpen,
    term,
    years,
    setYears,
    kilometers,
    setKilometers,
    distance
  } = props;

  function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
  }

  let [categories] = useState({
    Exchange: [
      {
        id: 1,
        title: 'Exchange your car for a new one!',
        description:
          "PCP allows you to exchange your car for a new one at the end of your contract. Drive your dream car, and every new version of it into the future! (Or choose a different car, it's up to you...)"
      }
    ],
    Return: [
      {
        id: 1,
        title: 'Give the car back to us!',
        description:
          "Moving overseas or decided you'll run to work instead? No worries, you can give the car back to us at the end of the contract and we'll take care of the rest!"
      }
    ],
    Buy: [
      {
        id: 1,
        title: "Pay whatever is left, and it's yours!",
        description:
          "Love the car so much you want to keep it? Just pay whatever is left on the loan and it's yours to keep!"
      }
    ]
  });

  return (
    <div className="w-full flex flex-col py-6">
      {carFinanceInfo ? (
        <Fragment>
          <div className="px-6 py-3 pb-10">
            <h2 className="font-serif text-3xl text-center mb-8">
              Your {carFinanceInfo.carRecord.Make}{' '}
              {carFinanceInfo.carRecord.Model}{' '}
              {carFinanceInfo.carRecord.Description} Will Cost
            </h2>
            <div className="flex flex-col items-center">
              <div className="text-xl bg-accentTwo p-6 rounded-3xl text-center mb-4">
                <span className="underline">
                  $
                  {Math.floor(
                    carFinanceInfo.paymentCalculations.totalPaymentPerPeriod / 4
                  )}
                </span>{' '}
                per <br />
                week*
              </div>

              <div className="mb-2 text-gray-400 italic">vs</div>
              <div className="text-xl text-gray-400 italic rounded-3xl text-center mb-6">
                <span className="underline">
                  $
                  {Math.floor(
                    carFinanceInfo.paymentCalculations
                      .comparisonPPPForRegularFinance / 4
                  )}
                </span>{' '}
                per <br />
                week**
              </div>
            </div>
            <div className="flex flex-col items-center">
              <Listbox
                className="z-40 w-[250px] bg-primary rounded-3xl mb-3"
                value={years}
                onChange={(value) => {
                  setYears(value);
                  fetchCarFinanceInfo(
                    selectedMake,
                    selectedModel,
                    selectedDescription
                  );
                }}
              >
                <div className="relative mt-1">
                  <Listbox.Button className="z-40 relative w-full cursor-default rounded-3xl bg-primary py-4 pl-5 pr-10 text-left focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                    <span className="block truncate text-white text-base text-center pl-[20px]">
                      {years.name}
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
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <Listbox.Options className="z-30 absolute pt-10 -mt-8 max-h-60 w-full overflow-auto rounded-b-3xl bg-accent py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                      {term.map((year, yearIdx) => (
                        <Listbox.Option
                          key={yearIdx}
                          className={({ active }) =>
                            `relative cursor-default select-none text-center py-2 pl-5 pr-4 ${
                              active ? 'bg-primary text-white' : 'text-gray-900'
                            }`
                          }
                          value={year}
                        >
                          {({ selected }) => (
                            <>
                              <span
                                className={`block truncate ${
                                  selected ? 'font-medium' : 'font-normal'
                                }`}
                              >
                                {year.name}
                              </span>
                            </>
                          )}
                        </Listbox.Option>
                      ))}
                    </Listbox.Options>
                  </Transition>
                </div>
              </Listbox>
              <Listbox
                className="z-20 w-[250px] bg-primary rounded-3xl mb-4"
                value={kilometers}
                onChange={(value) => {
                  setKilometers(value);
                  fetchCarFinanceInfo(
                    selectedMake,
                    selectedModel,
                    selectedDescription
                  );
                }}
              >
                <div className="relative mt-1">
                  <Listbox.Button className="z-20 relative w-full cursor-default rounded-3xl bg-primary py-4 pl-5 pr-10 text-left focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                    <span className="block truncate text-white text-center pl-[20px] text-base">
                      {kilometers.name}
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
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <Listbox.Options className="z-10 absolute pt-10 -mt-8 max-h-60 w-full overflow-auto rounded-b-3xl bg-accent py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                      {distance.map((distance, distanceIdx) => (
                        <Listbox.Option
                          key={distanceIdx}
                          className={({ active }) =>
                            `relative cursor-default select-none text-center py-2 pl-5 pr-4 ${
                              active ? 'bg-primary text-white' : 'text-gray-900'
                            }`
                          }
                          value={distance}
                        >
                          {({ selected }) => (
                            <>
                              <span
                                className={`block truncate ${
                                  selected ? 'font-medium' : 'font-normal'
                                }`}
                              >
                                {distance.name}
                              </span>
                            </>
                          )}
                        </Listbox.Option>
                      ))}
                    </Listbox.Options>
                  </Transition>
                </div>
              </Listbox>
              <button
                type="button"
                className="rounded-lg bg-primary underline px-6 py-2 text-lg text-white shadow-sm hover:bg-primary-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rosybrown-600"
                onClick={() => setModalOpen(true)}
              >
                Apply now
              </button>
              <button
                type="button"
                className="flex items-center mt-4 rounded-lg bg-primary px-4 py-1.5 text-base text-white shadow-sm hover:bg-primary-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rosybrown-600"
                onClick={() => {
                  setSelectedMake('');
                  setSelectedModel('');
                  setSelectedDescription('');
                  setCarFinanceInfo(null);
                  props.goToStep(1);
                }}
              >
                <ArrowLeftIcon className="h-4 w-auto mr-2" />{' '}
                <span> Try another car</span>
              </button>
            </div>
          </div>
          <div className="bg-accentTwo px-6 py-3">
            <h2 className="font-serif text-3xl text-center mb-8 mt-8">
              With PCP you have flexibility.
            </h2>
            <div className="text-lg text-center mb-4">
              Speedie uses Personal Contract Finance (PCP), a type of car
              financing that gives you maximum flexibility at the end of your
              contract. At the end you have three options:
            </div>
            <div className="min-h-[280px] mb-8">
              <Tab.Group>
                <Tab.List className="flex space-x-1 rounded-xl bg-silver-200 p-1">
                  {Object.keys(categories).map((category) => (
                    <Tab
                      key={category}
                      className={({ selected }) =>
                        classNames(
                          'w-full rounded-lg py-2.5 text-base font-medium leading-5 text-white',
                          'ring-white ring-opacity-60 ring-offset-2 ring-offset-silver-100 focus:outline-none focus:ring-2',
                          selected
                            ? 'bg-primary shadow'
                            : 'text-black hover:bg-white/[0.12] hover:text-white'
                        )
                      }
                    >
                      {category}
                    </Tab>
                  ))}
                </Tab.List>
                <Tab.Panels className="mt-2">
                  {Object.values(categories).map((options, idx) => (
                    <Tab.Panel key={idx}>
                      <ul>
                        {options.map((option) => (
                          <div
                            key={option.id}
                            className="relative rounded-md p-3"
                          >
                            <h3 className="text-lg font-bold leading-5 mb-2">
                              {option.title}
                            </h3>
                            <p className="text-lg">{option.description}</p>
                          </div>
                        ))}
                      </ul>
                    </Tab.Panel>
                  ))}
                </Tab.Panels>
              </Tab.Group>
            </div>
          </div>
          <div className="px-6 py-3">
            <h2 className="font-serif text-3xl text-center mb-8 mt-8">
              So how does PCP financing work?
            </h2>
            <div className="text-lg text-center mb-4">
              How are the payments so low? How can I trade my car in and get a
              new one? Why is there a limit on how far I can drive my car?
            </div>
            <div className="text-lg text-center mb-4">
              Have a look at our <a>why pcp?</a> page or alternatively contact
              us to find out more.
            </div>
          </div>{' '}
        </Fragment>
      ) : (
        <Fragment>
          <h2 className="ml-8 text-3xl">calculating...</h2>
          <Lottie
            animationData={carAnimation}
            loop={true}
            className="w-auto h-48"
          />{' '}
        </Fragment>
      )}
      {/* <div className="flex justify-center">
        <button className="h-full mt-8 rounded-3xl py-3 px-8 bg-primary" onClick={() => props.previousStep()}>
          <span className="font-bold text-white">Back</span>
        </button>
      </div> */}
    </div>
  );
};

export default StepFour;
