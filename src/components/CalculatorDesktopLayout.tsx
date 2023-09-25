import { Combobox, Transition } from '@headlessui/react';
import { Link } from 'gatsby';
import * as React from 'react';
import { Fragment, useEffect } from 'react';

//Images
import { CarDataClient } from '../CarDataClient';
import * as images from '../images/cars';
import carAnimation from '../images/lotties/car.json';

import { ArrowLeftIcon, ChevronDownIcon } from '@heroicons/react/20/solid';
import { yupResolver } from '@hookform/resolvers/yup';
import Lottie from 'lottie-react';
import { useForm } from 'react-hook-form';
import Fade from 'react-reveal/Fade';
import * as yup from 'yup';
import Diagram from '../components/content/Diagram';
import Explanation from '../components/content/Explanation';
import Footer from '../components/footer';
import Header from '../components/header';
import { CarRecord } from '../components/types/CarRecord';
import { Distance, Term } from '../components/types/labels';
import { PaymentCalculations } from '../components/types/PaymentCalculations';
import { storeCustomerDataWithEmail } from '../CustomerDataClient';
import { sendEmail } from '../EmailClient';
import useCarDataClient from '../hooks/useCarDataClient';
import { formatMoney } from '../utils/currency';
import { useCarDataContext } from './CarDataContext';

export interface CarFinanceInfo {
  carRecord: CarRecord;
  paymentCalculations: PaymentCalculations;
}
export default function CalculatorDesktopLayout(props: any) {
  const carDataClient = new CarDataClient(props.data.allSqliteCarRecords);
  const {
    carMakes,
    carModels,
    carDescriptions,
    fetchCarModels,
    fetchCarDescriptions
  } = useCarDataClient(props.data.allSqliteCarRecords);

  const term: Term[] = [
    {
      id: 1,
      term: 12,
      name: '1 year term loan'
    },
    {
      id: 2,
      term: 24,
      name: '2 years term loan'
    },
    {
      id: 3,
      term: 36,
      name: '3 years term loan'
    },
    {
      id: 4,
      term: 48,
      name: '4 years term loan'
    }
  ];

  const distance: Distance[] = [
    {
      id: 1,
      kilometers: 10000,
      name: '10,000 KMs'
    },
    {
      id: 2,
      kilometers: 20000,
      name: '20,000 KMs'
    },
    {
      id: 3,
      kilometers: 30000,
      name: '30,000 KMs'
    },
    {
      id: 4,
      kilometers: 40000,
      name: '40,000 KMs'
    },
    {
      id: 5,
      kilometers: 50000,
      name: '50,000 KMs'
    }
  ];

  // Random image fading
  const [currentImageIndex, setCurrentImageIndex] = React.useState(0);
  const [fadeIn, setFadeIn] = React.useState(true);

  React.useEffect(() => {
    // Rotate images every 5 seconds
    const interval = setInterval(() => {
      setFadeIn(false); // Start fading out
      setTimeout(() => {
        setCurrentImageIndex(
          (prevIndex: number) => (prevIndex + 1) % imageArray.length
        );
        setFadeIn(true); // Start fading in
      }, 500); // Wait for fade-out transition duration
    }, 5000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const imageArray = Object.values(images);
  const imageUrl = imageArray[currentImageIndex];

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
    isLoading,
    setIsLoading,
    modalOpen,
    setModalOpen,
    submitted,
    setSubmitted,
    emailLoading,
    setEmailLoading
  } = useCarDataContext();

  // Update when years/kilometres are changed
  useEffect(() => {
    if (
      selectedMake === '' ||
      selectedModel === '' ||
      selectedDescription === ''
    ) {
      return;
    }
    fetchCarFinanceInfo(selectedMake, selectedModel, selectedDescription);
  }, [years, kilometers]);

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
    setIsLoading(true);

    // Generate a random delay between 1 to 3 seconds
    const delay = Math.floor(Math.random() * (3000 - 1000 + 1)) + 1000;

    // Wait for the specified delay
    await new Promise((resolve) => setTimeout(resolve, delay));
    fetchCarFinanceInfo(selectedMake, selectedModel, selectedDescription);
    setIsLoading(false);

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

  return (
    <div className="w-screen">
      <Header />
      <h2 className="font-serif text-3xl mt-24 text-center">
        New age car finance, tailored to your needs.
      </h2>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-12">
        <div className="min-h-[550px]">
          <div className="flex justify-between py-8 mt-12">
            <div className="relative min-w-[320px] w-96 mr-32">
              {carFinanceInfo ? (
                <Fragment>
                  <h1 className="font-serif text-3xl mb-12">
                    Your {carFinanceInfo.carRecord.Make}{' '}
                    {carFinanceInfo.carRecord.Model}{' '}
                    {carFinanceInfo.carRecord.Description} Will Cost
                  </h1>
                  <div className="flex flex-col items-center">
                    <div className="text-2xl bg-accentTwo p-6 px-12 rounded-3xl text-center">
                      <span className="font-bold">
                        {formatMoney(
                          carFinanceInfo.paymentCalculations
                            .totalPaymentPerPeriod
                        )}
                      </span>{' '}
                      per week*
                      <p className="text-sm leading-none mt-2 mx-2 text-center">
                        your estimate on pcp financing
                      </p>
                    </div>
                    <div className="mt-2 mx-2 text-gray-400 italic">vs</div>
                    <div className="flex-1 mb-12">
                      <div className="text-2xl text-gray-400  italic rounded-e-3xl text-center mt-4">
                        <span>
                          $
                          {
                            carFinanceInfo.paymentCalculations
                              .comparisonPPPForRegularFinance
                          }
                        </span>{' '}
                        per week**
                      </div>
                      <p className="text-sm leading-none mt-4 mx-2 text-center text-gray-400 italic">
                        an estimate of traditional car financing
                      </p>
                    </div>
                  </div>
                  <div>
                    {submitted ? (
                      <div className="mb-6">
                        <div className="text-xl font-bold text-center mb-2">
                          Thank you for your interest!
                        </div>
                        <div className="text-lg text-center">
                          Check your email in the next few days to see your
                          customised plan.
                        </div>
                      </div>
                    ) : (
                      <Fragment>
                        {emailLoading ? (
                          <Lottie
                            className="h-[250px] w-auto"
                            animationData={carAnimation}
                          />
                        ) : (
                          <Fragment>
                            <div className="text-xl text-center mb-6">
                              Want to know more? Enter your email below to
                              receive a <strong>free customised </strong>
                              plan.
                            </div>
                            <form
                              onSubmit={handleSubmit((data) => onSubmit(data))}
                            >
                              <div>
                                <input
                                  {...register('email')}
                                  type="email"
                                  name="email"
                                  id="index-email"
                                  className="text-center w-full mb-6 border-b-2 border-t-0 border-l-0 border-r-0 border-gray-200 focus:shadow-none focus:ring-none focus:outline-none focus:border-primary mr-4"
                                  placeholder="your email here"
                                />
                                {errors.email && (
                                  <div className="flex items-center pointer-events-none mt-2 text-red-600">
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
                              <div className="flex justify-center">
                                <button className="h-full text-center rounded-3xl py-3 px-12 bg-accentTwo border-2 border-black border-b-4">
                                  submit
                                </button>
                              </div>
                            </form>
                          </Fragment>
                        )}
                      </Fragment>
                    )}
                  </div>
                  <div className="flex flex-col mt-8">
                    <button
                      type="button"
                      className="flex items-center mt-4 border-b-2 px-4 py-1.5 text-base hover:bg-primary-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rosybrown-600"
                      onClick={() => {
                        setSelectedMake('');
                        setSelectedModel('');
                        setSelectedDescription('');
                        setCarFinanceInfo(null);
                      }}
                    >
                      <ArrowLeftIcon className="h-4 w-auto mr-2" />{' '}
                      <span> Try another car</span>
                    </button>
                  </div>
                </Fragment>
              ) : isLoading ? (
                <div className="flex flex-col">
                  <h2 className="self-center text-2xl">
                    Estimating your weekly payments...
                  </h2>
                  <Lottie
                    animationData={carAnimation}
                    loop={true}
                    className="w-auto h-48"
                  />
                </div>
              ) : (
                <Fragment>
                  <h1 className="font-serif text-3xl mb-16">I want a new...</h1>
                  <Combobox
                    className="w-[300px] bg-primary rounded-e-3xl mb-8 z-40"
                    value={selectedMake}
                    onChange={(make) => {
                      setSelectedMake(make);
                      setSelectedModel('');
                      setSelectedDescription('');
                      setFormError(false);
                    }}
                  >
                    <div className="relative mt-1">
                      <div className="z-50 relative cursor-default overflow-hidden rounded-e-3xl bg-primary text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
                        <Combobox.Button>
                          <Combobox.Input
                            className="w-full border-none py-4 pl-5 pr-10 text-base leading-5 bg-primary placeholder:text-white placeholder:opacity-70 text-white focus:ring-0"
                            displayValue={(make: string) => make}
                            onChange={(event) =>
                              setMakeQuery(event.target.value)
                            }
                            placeholder="Car Brand"
                          />
                          <div className="absolute inset-y-0 right-0 flex items-center pr-4">
                            <ChevronDownIcon
                              className="h-7 w-7 text-white"
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
                        <Combobox.Options className="z-40 absolute pt-10 -mt-8 max-h-60 w-full overflow-auto rounded-b-3xl bg-accent py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
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
                                      ? 'bg-primary text-white'
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
                  <Combobox
                    className="z-30 w-[300px] bg-primary rounded-e-3xl mb-8"
                    value={selectedModel}
                    onChange={(model) => {
                      setSelectedModel(model);
                      setSelectedDescription('');
                      setFormError(false);
                    }}
                  >
                    <div
                      className={`relative mt-1 ${
                        selectedMake ? '' : 'disabled'
                      }`}
                    >
                      <div className="z-30 relative cursor-default overflow-hidden rounded-e-3xl bg-primary text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
                        <Combobox.Button>
                          <Combobox.Input
                            className="w-full border-none py-4 pl-5 pr-10 text-base leading-5 bg-primary placeholder:text-white placeholder:opacity-70 text-white focus:ring-0"
                            displayValue={(model: string) => model}
                            onChange={(event) =>
                              setModelQuery(event.target.value)
                            }
                            placeholder="Model"
                          />
                          <div className="absolute inset-y-0 right-0 flex items-center pr-4">
                            <ChevronDownIcon
                              className="h-7 w-7 text-white"
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
                        <Combobox.Options className="z-20 absolute pt-10 -mt-8 max-h-60 w-full overflow-auto rounded-b-3xl bg-accent py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
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
                  <Combobox
                    className="w-[300px] bg-primary rounded-e-3xl mb-4"
                    value={selectedDescription}
                    onChange={(description) => {
                      setSelectedDescription(description);
                      setFormError(false);
                    }}
                  >
                    <div
                      className={`relative mt-1 ${
                        selectedModel ? '' : 'disabled'
                      }`}
                    >
                      <div className="z-20 relative cursor-default overflow-hidden rounded-e-3xl bg-primary text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
                        <Combobox.Button>
                          <Combobox.Input
                            className="w-full border-none py-4 pl-5 pr-10 text-base leading-5 bg-primary placeholder:text-white placeholder:opacity-70 text-white focus:ring-0"
                            displayValue={(description: string) => description}
                            placeholder="Description"
                            onChange={(event) =>
                              setDescriptionQuery(event.target.value)
                            }
                          />
                          <div className="absolute inset-y-0 right-0 flex items-center pr-4">
                            <ChevronDownIcon
                              className="h-7 w-7 text-white"
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
                        <Combobox.Options className="z-10 absolute pt-10 -mt-8 max-h-60 w-full overflow-auto rounded-b-3xl bg-accent py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
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
                  {carFinanceInfo ? null : selectedDescription ===
                    '' ? null : isLoading ? null : (
                    <div className="flex items-center mt-8">
                      <button
                        onClick={(data) => calculate(data)}
                        className="transition-opacity duration-300 hover:opacity-75 font-bold underline-offset-4 rounded-3xl py-4 px-24 bg-accentTwo text-2xl drop-shadow-xl border-2 border-black border-b-4"
                      >
                        calculate
                      </button>
                    </div>
                  )}
                </Fragment>
              )}
            </div>
            <div className="pt-10 ml-16 pr-16 min-w-5xl overflow-hidden scale-125">
              <img
                className={`h-full w-auto max-w-full  object-contain ${
                  fadeIn ? 'fade-in' : 'fade-out'
                }`}
                alt="car"
                src={imageUrl}
              />
            </div>
          </div>
        </div>
      </div>
      {carFinanceInfo ? (
        <div className="md:mx-16 lg:mx-72 mt-24">
          <Explanation />
          <div className="flex font-serif underline text-3xl items-center text-center justify-center mx-auto mb-16">
            <Fade Reveal>Here's what your PCP Contract looks like</Fade>
          </div>
          <Fade Reveal>
            <Diagram carFinanceInfo={carFinanceInfo} horizontal={true} />
          </Fade>
          <div className="mt-8 mx-auto">
            <h1 className="font-serif font-bold text-center text-xl mx-auto">
              How are the weekly payments so low? Is there a limit to how much I
              can drive the car? Can I buy a used car?
            </h1>
            <div className="font-serif text-xl mt-8 text-center">
              Have a look at our{' '}
              <Link to={'/'}>
                <span className="underline">home page</span>
              </Link>{' '}
              or alternatively{' '}
              <Link to={'/contact'}>
                <span className="underline">contact us</span>
              </Link>
            </div>
          </div>
        </div>
      ) : null}
      <Footer footnotes={true} />
    </div>
  );
}
