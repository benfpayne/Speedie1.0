import { Transition } from '@headlessui/react';
import { Link } from 'gatsby';
import * as React from 'react';
import { Fragment, useEffect, useState } from 'react';

//Images
import { CarDataClient } from '../CarDataClient';
import AudiRS6 from '../images/AudiRS6.png';
import carAnimation from '../images/lotties/car.json';
import TeslaModel3 from '../images/TeslaModel3.png';

import Lottie from 'lottie-react';
import Diagram from '../components/content/Diagram';
import Explanation from '../components/content/Explanation';
import Footer from '../components/footer';
import Header from '../components/header';
import CalcResults from '../components/mobileLandingForm/CalcResults';
import ProgressiveForm from '../components/mobileLandingForm/ProgressiveForm';
import { CarRecord } from '../components/types/CarRecord';
import { Distance, Term } from '../components/types/labels';
import { PaymentCalculations } from '../components/types/PaymentCalculations';
import useCarDataClient from '../hooks/useCarDataClient';
import { useCarDataContext } from './CarDataContext';

export interface CarFinanceInfo {
  carRecord: CarRecord;
  paymentCalculations: PaymentCalculations;
}

export default function CalculatorMobileLayout(props: any) {
  const carDataClient = new CarDataClient(props.data.allSqliteCarRecords);
  const {
    carMakes,
    carModels,
    carDescriptions,
    fetchCarModels,
    fetchCarDescriptions
  } = useCarDataClient(props.data.allSqliteCarRecords);
  function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
  }

  const term: Term[] = [
    {
      id: 1,
      term: 12,
      name: '1 year'
    },
    {
      id: 2,
      term: 24,
      name: '2 years'
    },
    {
      id: 3,
      term: 36,
      name: '3 years'
    },
    {
      id: 4,
      term: 48,
      name: '4 years'
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

  const [categories] = useState({
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

  const onSubmit = async () => {
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

  return (
    <Fragment>
      <div
        className={classNames(
          ' w-screen relative flex flex-col bg-white',
          carFinanceInfo === null
            ? ' h-screen overflow-hidden'
            : ' h-auto overflow-visible'
        )}
      >
        <Header />
        {/* BACKGROUND CAR */}
        <Transition
          show={carFinanceInfo === null}
          enter="transition-opacity duration-[350ms]"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity ease-out duration-[350ms]"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="absolute top-3/4 right-2/4 -translate-y-20 ">
            <img className="h-[105px] w-[330px] max-w-none z-0" src={AudiRS6} />
          </div>
        </Transition>
        {/* CAR IN FOCUS */}
        <Transition
          show={carFinanceInfo === null}
          enter="transition-opacity ease-out duration-[350ms]"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity ease out duration-[350ms]"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="absolute top-3/4 left-1/3 -translate-y-8 z-0">
            <img className="h-[208px] w-[375px] max-w-none" src={TeslaModel3} />
          </div>
        </Transition>
        {carFinanceInfo ? (
          <div className="max-w-7xl mx-8 sm:px-6 lg:px-12">
            <div className="flex py-8">
              <div className="relative min-w-[320px] w-96">
                <CalcResults />
              </div>
            </div>
          </div>
        ) : isLoading ? (
          <div className="max-w-7xl mx-8 sm:px-6 lg:px-12">
            <h2 className="mt-16 self-center text-center text-2xl">
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
            <ProgressiveForm
              carMakes={carMakes}
              carModels={carModels}
              carDescriptions={carDescriptions}
              selectedMake={selectedMake}
              setSelectedMake={setSelectedMake}
              selectedModel={selectedModel}
              setSelectedModel={setSelectedModel}
              selectedDescription={selectedDescription}
              setSelectedDescription={setSelectedDescription}
              formError={formError}
              setFormError={setFormError}
              filteredMakes={filteredMakes}
              filteredModels={filteredModels}
              filteredDescriptions={filteredDescriptions}
              makeQuery={makeQuery}
              setMakeQuery={setMakeQuery}
              modelQuery={modelQuery}
              setModelQuery={setModelQuery}
              descriptionQuery={descriptionQuery}
              setDescriptionQuery={setDescriptionQuery}
            />
            {carFinanceInfo
              ? null
              : selectedDescription !== '' &&
                !isLoading && (
                  <div className="flex justify-center my-2 z-0">
                    <button
                      className="rounded-3xl py-3 px-16 bg-accentTwo drop-shadow-xl"
                      onClick={() => onSubmit()}
                    >
                      <span className="font-bold underline underline-offset-4 decoration-1 text-lg">
                        calculate
                      </span>
                    </button>
                  </div>
                )}
          </Fragment>
        )}
      </div>
      {carFinanceInfo ? (
        <div className="mx-8 mt-8">
          <Explanation />
          <div className="flex font-serif underline text-3xl items-center text-center justify-center mx-auto">
            Here's what your PCP Contract looks like
          </div>
          {carFinanceInfo && (
            <Diagram carFinanceInfo={carFinanceInfo} horizontal={false} />
          )}
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
    </Fragment>
  );
}
