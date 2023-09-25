import { yupResolver } from '@hookform/resolvers/yup';
import type { HeadFC, PageProps } from 'gatsby';
import * as React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import carAnimation from '../images/lotties/car.json';

import Lottie from 'lottie-react';
import storeCustomerData from '../CustomerDataClient';
import Footer from '../components/footer';
import Header from '../components/header';

const ContactPage: React.FC<PageProps> = (props: any) => {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = React.useState(false);

  // This form schema is only for the desktop form
  const formSchema = yup.object({
    email: yup
      .string()
      .email('Please enter a valid email address')
      .required('Please enter your email address')
  });

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(formSchema)
  });

  async function onSubmit(data: any) {
    const customerData = {
      email: data.email,
      selectedMake: null,
      selectedModel: null,
      selectedDescription: null
    };

    typeof window !== 'undefined' &&
      process.env.NODE_ENV !== 'development' &&
      window.gtag('event', 'generate_lead', {
        currency: 'AUD',
        value: 0
      });

    console.log('storing email...');
    setIsLoading(true);
    // Generate a random delay between 1 to 3 seconds
    const delay = Math.floor(Math.random() * (2000 - 1000 + 1)) + 1000;

    // Wait for the specified delay
    await new Promise((resolve) => setTimeout(resolve, delay));
    await storeCustomerData(customerData);
    setIsLoading(false);
    setIsSubmitted(true);
  }

  return (
    <div className="w-screen h-screen">
      <Header />
      <div className="flex my-24 justify-center">
        <h1 className="font-serif text-3xl mb-8 font-bold">Contact us</h1>
      </div>
      <div className="flex flex-col items-center justify-center mb-12 mx-8">
        <form
          className="flex"
          onSubmit={handleSubmit((data) => onSubmit(data))}
        >
          <div className="flex flex-col items-center justify-center">
            <div className="flex flex-col">
              <input
                {...register('email')}
                type="email"
                name="email"
                id="index-email"
                className="md:w-96 border-b-2 border-t-0 border-l-0 border-r-0 border-gray-200 focus:shadow-none focus:ring-none focus:outline-none focus:border-primary mr-4"
                placeholder="Enter your email to register your interest..."
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
            {!isSubmitted && !isLoading ? (
              <button className="underline underline-offset-2 mt-8 rounded-3xl py-3 px-8 bg-primary text-white">
                Submit
              </button>
            ) : isLoading ? (
              <Lottie
                animationData={carAnimation}
                loop={true}
                className="w-auto h-48"
              />
            ) : (
              <span className="mt-8">
                Thank you for registering, we'll be in touch soon!
              </span>
            )}
          </div>
        </form>
        <span className="mt-20 text-2xl">
          Or alternatively, contact us at{' '}
          <a href="mailto:info@speedie.co.nz" className="underline italic">
            info@speedie.co.nz
          </a>
        </span>
      </div>
      <Footer footnotes={false} />
    </div>
  );
};

export const Head: HeadFC = () => <title>Contact Us</title>;

export default ContactPage;
