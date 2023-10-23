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
import Merc from '../images/cars/merc.svg';

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
    <div>
      <Header />
      <section id="contact-us" className="pb-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col-reverse md:flex-row justify-between items-center">
            <div className="md:w-1/2 md:mr-16">
              <h1 className="font-sans text-5xl font-bold text-primary leading-[4rem]">
                Contact us
              </h1>
              <form
                className="flex mt-4"
                onSubmit={handleSubmit((data) => onSubmit(data))}
              >
                <div>
                  {!isSubmitted && !isLoading ? (
                    <div className="flex flex-col">
                      <input
                        {...register('email')}
                        type="email"
                        name="email"
                        id="index-email"
                        className="md:w-96 pl-0 pr-0 border-b-2 border-t-0 border-l-0 border-r-0 border-gray-200 focus:shadow-none focus:ring-none focus:outline-none focus:border-primary mr-4"
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
                  ) : null}
                  {!isSubmitted && !isLoading ? (
                    <button className="transition-opacity duration-300 hover:opacity-75 w-32 rounded-3xl py-2 mt-6 bg-primary text-white text-base">
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
                  <p className="mt-6 text-xl">
                    Or alternatively, contact us at{' '}
                    <a
                      href="mailto:info@speedie.co.nz"
                      className="underline italic"
                    >
                      info@speedie.co.nz
                    </a>
                  </p>
                </div>
              </form>
            </div>
            <div className="overflow-hidden w-1/2 min-w-[293px]">
              <img className="h-auto " alt="car" src={Merc} />
            </div>
          </div>
        </div>
      </section>
      <Footer footnotes={false} />
    </div>
  );
};

export const Head: HeadFC = () => <title>Contact Us</title>;

export default ContactPage;
