import { ArrowLeftIcon } from '@heroicons/react/20/solid';
import { yupResolver } from '@hookform/resolvers/yup';
import Lottie from 'lottie-react';
import * as React from 'react';
import { Fragment } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { storeCustomerDataWithEmail } from '../../CustomerDataClient';
import { sendEmail } from '../../EmailClient';
import carAnimation from '../../images/lotties/car.json';
import { useCarDataContext } from '../CarDataContext';
import { PaymentCalculations } from '../types/PaymentCalculations';

const CalcResults = (props) => {
  const {
    carFinanceInfo,
    setCarFinanceInfo,
    fetchCarFinanceInfo,
    selectedMake,
    setSelectedMake,
    selectedModel,
    setSelectedModel,
    selectedDescription,
    setSelectedDescription,
    years,
    setYears,
    term,
    distance,
    kilometers,
    setKilometers,
    submitted,
    setSubmitted,
    emailLoading,
    setEmailLoading
  } = useCarDataContext();

  // This form schema is only for the desktop form
  const formSchema = yup.object({
    email: yup
      .string()
      .email('Please enter a valid email address')
      .required('Please enter your email address')
  });

  async function onSubmit(values: any): Promise<any> {
    const customerData = {
      email: values.email,
      selectedMake,
      selectedModel,
      selectedDescription
    };

    console.log('storing email...');
    setEmailLoading(true);

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
    const response = await storeCustomerDataWithEmail(
      customerData,
      emailTemplateData
    );

    if (response != 500) {
      sendEmail(customerData, emailTemplateData);
    }

    const randomDelay = Math.floor(Math.random() * 2000) + 1000;

    typeof window !== 'undefined' &&
      process.env.NODE_ENV !== 'development' &&
      window.gtag('event', 'generate_lead', {
        currency: 'AUD',
        value: 0
      });

    setTimeout(() => {
      setEmailLoading(false); // Hide emailLoading animation
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
    <Fragment>
      <h1 className="font-serif text-3xl mb-8">
        Your {carFinanceInfo.carRecord.Make} {carFinanceInfo.carRecord.Model}{' '}
        {carFinanceInfo.carRecord.Description} Will Cost
      </h1>
      <div className="flex flex-col items-center">
        <div className="text-2xl bg-accentTwo p-6 px-12 rounded-3xl text-center">
          <span className="font-bold">
            ${carFinanceInfo.paymentCalculations.totalPaymentPerPeriod}
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
              Check your email in the next few days to see your customised plan.
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
                  Want to know more? Enter your email below to receive a{' '}
                  <strong>free customised </strong>
                  plan.
                </div>
                <form onSubmit={handleSubmit((data) => onSubmit(data))}>
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
  );
};

export default CalcResults;
