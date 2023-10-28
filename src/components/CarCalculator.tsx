import { Combobox, Transition } from '@headlessui/react';
import Lottie from 'lottie-react';
import * as React from 'react';
import { Fragment, useEffect } from 'react';

//Images
import { CarDataClient } from '../CarDataClient';

import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { storeCustomerDataWithEmail } from '../CustomerDataClient';
import { sendEmail } from '../EmailClient';
import { CarRecord } from '../components/types/CarRecord';
import { PaymentCalculations } from '../components/types/PaymentCalculations';
import useCarDataClient from '../hooks/useCarDataClient';
import { formatMoney } from '../utils/currency';
import { useCarDataContext } from './CarDataContext';

import Model3 from '../images/cars/tesla.svg';
import carAnimation from '../images/lotties/car.json';
import scrollAnimation from '../images/lotties/scroll.json';

export interface CarFinanceInfo {
  carRecord: CarRecord;
  paymentCalculations: PaymentCalculations;
}
export default function CarCalculator(props: any) {
  const carDataClient = new CarDataClient(props.data.allSqliteCarRecords);
  const {
    carMakes,
    carModels,
    carDescriptions,
    fetchCarModels,
    fetchCarDescriptions
  } = useCarDataClient(props.data.allSqliteCarRecords);

  // Form state
  const {
    selectedMake,
    setSelectedMake,
    selectedModel,
    setSelectedModel,
    selectedDescription,
    setSelectedDescription,
    makeQuery,
    setMakeQuery,
    modelQuery,
    setModelQuery,
    descriptionQuery,
    setDescriptionQuery,
    years,
    setYears,
    kilometers,
    setKilometers,
    formError,
    setFormError,
    carFinanceInfo,
    setCarFinanceInfo,
    calculating,
    setCalculating,
    modalOpen,
    setModalOpen,
    submitted,
    setSubmitted,
    emailLoading,
    setEmailLoading
  } = useCarDataContext();

  // Calculate when all fields have an input
  useEffect(() => {
    if (
      selectedMake === '' ||
      selectedModel === '' ||
      selectedDescription === ''
    ) {
      return;
    }
    calculate(null);
  }, [selectedMake, selectedModel, selectedDescription]);

  // Fetch model once make is selected
  useEffect(() => {
    fetchCarModels(selectedMake);
  }, [selectedMake]);

  // Fetch description once model is selected
  useEffect(() => {
    fetchCarDescriptions(selectedMake, selectedModel);
  }, [selectedModel]);

  const fetchCarFinanceInfo = async (
    make: string,
    model: string,
    description: string
  ) => {
    const carRecord = await carDataClient.getCarRecord(
      make,
      model,
      description
    );
    const paymentCalculations = await carDataClient.getAllPaymentCalculations(
      carRecord,
      years.term,
      kilometers.kilometers
    );
    const info: CarFinanceInfo = {
      carRecord,
      paymentCalculations
    };
    setCarFinanceInfo(info);
  };

  // Search results
  const filteredMakes =
    makeQuery === ''
      ? carMakes
      : carMakes.filter((make: string) =>
          make
            .toLowerCase()
            .replace(/\s+/g, '')
            .includes(makeQuery.toLowerCase().replace(/\s+/g, ''))
        );

  const filteredModels =
    modelQuery === ''
      ? carModels
      : carModels.filter((model: string) =>
          model
            .toLowerCase()
            .replace(/\s+/g, '')
            .includes(modelQuery.toLowerCase().replace(/\s+/g, ''))
        );

  const filteredDescriptions =
    descriptionQuery === ''
      ? carDescriptions
      : carDescriptions.filter((description: string) =>
          description
            .toLowerCase()
            .replace(/\s+/g, '')
            .includes(descriptionQuery.toLowerCase().replace(/\s+/g, ''))
        );

  const calculate = async (values: any) => {
    console.log('calculating');
    console.log(selectedMake);
    console.log(selectedModel);
    console.log(selectedDescription);
    setCalculating(true);

    // reset email for plan
    setSubmitted(false);

    // Generate a random delay between 1 to 3 seconds
    const delay = Math.floor(Math.random() * (3000 - 1000 + 1)) + 1000;

    // Wait for the specified delay
    await new Promise((resolve) => setTimeout(resolve, delay));
    fetchCarFinanceInfo(selectedMake, selectedModel, selectedDescription);
    setCalculating(false);

    typeof window !== 'undefined' &&
      process.env.NODE_ENV !== 'development' &&
      window.gtag('event', 'select_content', {
        content_type: `${selectedMake}_${selectedModel}`,
        content_id: `${selectedMake}_${selectedModel}`
      });
  };

  const formSchema = yup.object({
    email: yup
      .string()
      .email('Please enter a valid email address')
      .required('Please enter your email address')
  });

  async function onSubmit(values: any): Promise<any> {
    const paymentCalculations: PaymentCalculations =
      carFinanceInfo.paymentCalculations;
    const emailTemplateData = {
      CarName: `${selectedMake} ${selectedModel} ${selectedDescription}`,
      PurchasePrice: paymentCalculations.purchasePriceRetail.toLocaleString(),
      TermLength: '3',
      nMonths: '36',
      Kilometres: '30,000',
      DepositAmount: paymentCalculations.depositAmount.toLocaleString(),
      InterestRate: '7',
      PcpAmount: paymentCalculations.totalPaymentPerPeriod.toLocaleString(),
      NormalAmount:
        paymentCalculations.comparisonPPPForRegularFinance.toLocaleString(),
      TotalPayablePcp:
        paymentCalculations.totalPaymentOverTerm.toLocaleString(),
      TotalPayableNormal:
        paymentCalculations.totalFinanceAgreementCost.toLocaleString(),
      BalloonPayment: paymentCalculations.balloonPayment.toLocaleString()
    };
    const customerData = {
      email: values.email,
      selectedMake,
      selectedModel,
      selectedDescription
    };

    setEmailLoading(true);
    const response = await storeCustomerDataWithEmail(
      customerData,
      emailTemplateData
    );
    const randomDelay = Math.floor(Math.random() * 2000) + 1000;

    if (response != 500) {
      sendEmail(customerData, emailTemplateData);
    }

    typeof window !== 'undefined' &&
      process.env.NODE_ENV !== 'development' &&
      window.gtag('event', 'generate_lead', {
        currency: 'AUD',
        value: 0
      });

    setTimeout(() => {
      setEmailLoading(false); // Hide loading animation
      if (response === 200) {
        setSubmitted(true);
      }
    }, randomDelay);
  }

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(formSchema)
  });

  console.log(carFinanceInfo);

  return (
    <section id="Car calculator" className="pt-12 md:py-12 md:bg-accentTwo">
      <div className="mx-auto max-w-7xl md:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:rounded-lg">
          <div className="w-full pt-12 px-4 sm:px-6 md:w-1/2 md:bg-white md:p-12 md:pt-20 md:pb-20 md:rounded-l-xl">
            <h2 className="text-2xl font-bold mb-8">
              Tell us about your <span className="text-primary">dream car</span>
            </h2>
            <div className="mb-8">
              <div className="font-bold mb-2">Make</div>
              <Combobox
                className="w-full mb-8 z-40"
                value={selectedMake}
                onChange={(make) => {
                  setSelectedMake(make);
                  setSelectedModel('');
                  setSelectedDescription('');
                  setFormError(false);
                }}
              >
                <div className="relative mt-1">
                  <div className="z-50 relative cursor-default overflow-hidden border border-grayAccent rounded-xl text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2">
                    <Combobox.Button className="w-full">
                      <Combobox.Input
                        className="w-full border-none py-4 pl-5 pr-10 text-base leading-5 bg-white placeholder:text-black placeholder:opacity-70 text-black focus:ring-0"
                        displayValue={(make: string) => make}
                        onChange={(event) => setMakeQuery(event.target.value)}
                        placeholder="Make"
                      />
                      <div className="absolute inset-y-0 right-0 flex items-center pr-4">
                        <ChevronDownIcon
                          className="h-7 w-7 text-black"
                          aria-hidden="true"
                        />
                      </div>
                    </Combobox.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                    afterLeave={() => setMakeQuery('')}
                  >
                    <Combobox.Options className="z-40 absolute pt-10 -mt-8 max-h-60 w-full overflow-auto rounded-b-xl bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                      {filteredMakes.length === 0 && makeQuery !== '' ? (
                        <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                          Nothing found.
                        </div>
                      ) : (
                        filteredMakes.map((make: string) => (
                          <Combobox.Option
                            key={make}
                            className={({ active }) =>
                              `relative cursor-default select-none py-2 pl-5 pr-4 ${
                                active
                                  ? 'bg-primary text-white font-bold'
                                  : 'text-gray-900'
                              }`
                            }
                            value={make}
                          >
                            {({ selected, active }) => (
                              <>
                                <span
                                  className={`block truncate ${
                                    selected ? 'font-medium' : 'font-normal'
                                  }`}
                                >
                                  {make}
                                </span>
                              </>
                            )}
                          </Combobox.Option>
                        ))
                      )}
                    </Combobox.Options>
                  </Transition>
                </div>
              </Combobox>
              <div className="font-bold mb-2">Model</div>
              <Combobox
                className="z-30 w-full bg-white rounded-xl mb-8"
                value={selectedModel}
                onChange={(model) => {
                  setSelectedModel(model);
                  setSelectedDescription('');
                  setFormError(false);
                }}
              >
                <div
                  className={`relative mt-1 ${selectedMake ? '' : 'disabled'}`}
                >
                  <div className="z-30 relative cursor-default overflow-hidden rounded-xl border border-grayAccent bg-white text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
                    <Combobox.Button className="w-full">
                      <Combobox.Input
                        className="w-full border-none py-4 pl-5 pr-10 text-base leading-5 bg-white placeholder:text-black placeholder:opacity-70 text-black focus:ring-0"
                        displayValue={(model: string) => model}
                        onChange={(event) => setModelQuery(event.target.value)}
                        placeholder="Model"
                      />
                      <div className="absolute inset-y-0 right-0 flex items-center pr-4">
                        <ChevronDownIcon
                          className="h-7 w-7 text-black"
                          aria-hidden="true"
                        />
                      </div>
                    </Combobox.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                    afterLeave={() => setModelQuery('')}
                  >
                    <Combobox.Options className="z-20 absolute pt-10 -mt-8 max-h-60 w-full overflow-auto rounded-b-xl bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                      {filteredModels.length === 0 && modelQuery !== '' ? (
                        <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                          Nothing found.
                        </div>
                      ) : (
                        filteredModels.map((model) => (
                          <Combobox.Option
                            key={model}
                            className={({ active }) =>
                              `relative cursor-default select-none py-2 pl-5 pr-4 ${
                                active
                                  ? 'bg-primary text-white'
                                  : 'text-gray-900'
                              }`
                            }
                            value={model}
                          >
                            {({ selected, active }) => (
                              <>
                                <span
                                  className={`block truncate ${
                                    selected ? 'font-medium' : 'font-normal'
                                  }`}
                                >
                                  {model}
                                </span>
                              </>
                            )}
                          </Combobox.Option>
                        ))
                      )}
                    </Combobox.Options>
                  </Transition>
                </div>
              </Combobox>
              <div className="font-bold mb-2">Description</div>
              <Combobox
                className="w-full bg-white rounded-e-3xl mb-4"
                value={selectedDescription}
                onChange={(description) => {
                  setSelectedDescription(description);
                  setFormError(false);
                }}
              >
                <div
                  className={`relative mt-1 ${selectedModel ? '' : 'disabled'}`}
                >
                  <div className="z-20 relative cursor-default overflow-hidden rounded-xl border border-grayAccent bg-white text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
                    <Combobox.Button className="w-full">
                      <Combobox.Input
                        className="w-full border-none py-4 pl-5 pr-10 text-base leading-5 bg-white placeholder:text-black placeholder:opacity-70 text-black focus:ring-0"
                        displayValue={(description: string) => description}
                        placeholder="Description"
                        onChange={(event) =>
                          setDescriptionQuery(event.target.value)
                        }
                      />
                      <div className="absolute inset-y-0 right-0 flex items-center pr-4">
                        <ChevronDownIcon
                          className="h-7 w-7 text-black"
                          aria-hidden="true"
                        />
                      </div>
                    </Combobox.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                    afterLeave={() => setDescriptionQuery('')}
                  >
                    <Combobox.Options className="z-10 absolute pt-10 -mt-8 max-h-60 w-full overflow-auto rounded-b-xl bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                      {filteredDescriptions.length === 0 &&
                      descriptionQuery !== '' ? (
                        <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                          Nothing found.
                        </div>
                      ) : (
                        filteredDescriptions.map((description: string) => (
                          <Combobox.Option
                            key={description}
                            className={({ active }) =>
                              `relative cursor-default select-none py-2 pl-5 pr-4 ${
                                active
                                  ? 'bg-primary text-white'
                                  : 'text-gray-900'
                              }`
                            }
                            value={description}
                          >
                            {({ selected, active }) => (
                              <>
                                <span
                                  className={`block truncate ${
                                    selected ? 'font-medium' : 'font-normal'
                                  }`}
                                >
                                  {description}
                                </span>
                              </>
                            )}
                          </Combobox.Option>
                        ))
                      )}
                    </Combobox.Options>
                  </Transition>
                </div>
              </Combobox>
              {formError ? (
                <div className="mt-2 text-center text-red-400">
                  {' '}
                  Please select an option{' '}
                </div>
              ) : null}
            </div>
            <div className="flex overflow-hidden">
              <div className="min-w-[130px]">
                <div className="mb-3">
                  <p className="font-sans font-bold mb-1">Estimated price</p>
                  {calculating ? (
                    <p className="italic text-primary">calculating...</p>
                  ) : (
                    <p className="font-sans font-bold text-primary">
                      {carFinanceInfo.carRecord.RRPincGST}
                    </p>
                  )}
                </div>
                <div className="mb-3">
                  <p className="font-sans font-bold mb-1">Interest rate</p>
                  <p>7%</p>
                </div>
                <div className="mb-3">
                  <p className="font-sans font-bold mb-1">Deposit</p>
                  <p>10%</p>
                </div>
                <div className="mb-3">
                  <p className="font-sans font-bold mb-1">Loan term</p>
                  <p>3 years</p>
                </div>
              </div>
              <div className="grow">
                <img
                  className="min-h-[400px] min-w-[400px] -mt-20 "
                  alt="car"
                  src={Model3}
                />
              </div>
            </div>
            <div className="flex justify-center block md:hidden">
              <Lottie
                className="h-10 w-10 pb-2"
                animationData={scrollAnimation}
              />
            </div>
          </div>
          <div className="w-full bg-primaryTwo md:w-1/2 py-12 sm:pt-12 px-4 sm:px-6 md:p-12 md:pt-20 md:pb-20 md:rounded-r-xl">
            <div className="text-6xl mb-8">🎉</div>
            <div className="font-sans text-white text-xl">
              {calculating ? (
                <Fragment>
                  Estimating your weekly payments...
                  <div>
                    <Lottie
                      animationData={carAnimation}
                      loop={true}
                      className="w-1/2 h-52 -ml-12"
                    />
                  </div>
                </Fragment>
              ) : (
                <Fragment>
                  {' '}
                  Drive a{' '}
                  <span className="font-bold">
                    {carFinanceInfo.carRecord.Make}{' '}
                    {carFinanceInfo.carRecord.Model}{' '}
                    {carFinanceInfo.carRecord.Description}
                  </span>{' '}
                  from just{' '}
                </Fragment>
              )}
            </div>
            {calculating ? null : (
              <Fragment>
                <div>
                  <div className="text-accentGreen mt-8 text-xs">
                    <span className="text-5xl font-bold mr-2">
                      {formatMoney(
                        carFinanceInfo.paymentCalculations.totalPaymentPerPeriod
                      )}
                    </span>
                    per week
                  </div>
                  <div className="mt-8 text-white">
                    saving you{' '}
                    <span className="text-primary font-bold bg-accentGreen px-1.5 py-1">
                      {formatMoney(
                        carFinanceInfo.paymentCalculations
                          .comparisonPPPForRegularFinance -
                          carFinanceInfo.paymentCalculations
                            .totalPaymentPerPeriod
                      )}{' '}
                      a week
                    </span>{' '}
                    compared to regular car financing
                  </div>
                  <div className="mt-8 text-sm text-white">
                    Tell me how - make this link -
                  </div>
                </div>
              </Fragment>
            )}

            <div className="mt-20 text-white">
              <div className="text-lg font-bold">👀 Like what you see?</div>
              <div className="mt-2 leading-7">
                Drop us your email and we'll send you a free payment breakdown
                and options for your{' '}
                {calculating
                  ? null
                  : `${carFinanceInfo.carRecord.Make} 
                ${carFinanceInfo.carRecord.Model} 
                ${carFinanceInfo.carRecord.Description}`}
              </div>
            </div>
            {emailLoading ? (
              <Lottie
                className="w-1/2 h-52 -ml-12"
                animationData={carAnimation}
              />
            ) : (
              <Fragment>
                {submitted ? (
                  <div className="mt-4 text-white">
                    <div className="text-lg font-bold">
                      🎉 All done! Check your email for your free plan
                    </div>
                    <div className="mt-2">
                      We have hundreds of cars to choose from, why not calculate
                      another...
                    </div>
                  </div>
                ) : (
                  <form
                    onSubmit={handleSubmit((data) => onSubmit(data))}
                    className="mt-4"
                  >
                    <div>
                      <label className="text-white text-sm">
                        Email address
                      </label>
                      <input
                        {...register('email')}
                        type="email"
                        name="email"
                        id="index-email"
                        className="text-sm rounded w-full mt-2 mb-4 border-none focus:shadow-none focus:ring-none focus:outline-none focus:border-primary"
                        placeholder="you@example.com"
                      />
                      {errors.email && (
                        <div className="flex items-center pointer-events-none text-red-600 mb-4">
                          <svg
                            className="h-5 w-5 text-red-500 mr-1"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                              clipRule="evenodd"
                            />
                          </svg>
                          {errors.email.message}
                        </div>
                      )}
                    </div>
                    <div className="">
                      <button className="font-sans transition-opacity duration-300 hover:opacity-75 pl-12 pr-12 rounded-3xl py-2 bg-greenBackground text-accentGreen text-lg">
                        Get free plan
                      </button>
                    </div>
                  </form>
                )}
              </Fragment>
            )}
          </div>
          <div></div>
        </div>
      </div>
    </section>
  );
}
