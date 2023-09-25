import { navigate } from 'gatsby';
import * as React from 'react';

//Images

import Fade from 'react-reveal/Fade';
import * as images from '../images/cars';
import Diagram from './content/Diagram';
import StaticDiagram from './content/DiagramStatic';
import Explanation from './content/Explanation';
import PreFooter from './content/PreFooter';
import Footer from './footer';
import Header from './header';
import { CarRecord } from './types/CarRecord';
import { PaymentCalculations } from './types/PaymentCalculations';

export interface CarFinanceInfo {
  carRecord: CarRecord;
  paymentCalculations: PaymentCalculations;
}

export default function HomePageDesktopLayout(props: any) {
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

  return (
    <div className="w-screen">
      <Header />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-12">
        <div className="min-h-[480px]">
          {/* Reuse for mobile  */}
          <h2 className="font-serif text-3xl mt-24 text-center">
            New age car finance, tailored to your needs.
          </h2>
          <div className="flex justify-between items-center">
            <div className="flex flex-col items-start w-1/2 mr-32">
              <span className="font-serif text-2xl">
                Buy the car you want on your own terms.
              </span>
              <button
                onClick={() => navigate('/calculator')}
                className="transition-opacity duration-300 hover:opacity-75 drop-shadow-xl rounded-3xl py-4 px-16 mt-12 bg-primary"
              >
                <span className="decoration-1 text-accentTwo text-xl">
                  Use our calculator
                </span>
              </button>
            </div>
            <div className="min-h-72 min-w-[293px] overflow-hidden">
              <img
                className={`object-cover ${fadeIn ? 'fade-in' : 'fade-out'}`}
                alt="car"
                src={imageUrl}
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col text-center mb-8 mt-2">
          <span className="font-serif font-extrabold underline text-4xl">
            <Fade Reveal>What is PCP? How does it work?</Fade>
          </span>
          <span className="mt-12 mx-32 font-medium text-lg">
            <Fade Reveal>
              Buying a new car tends to be quite difficult, you have two
              options:
            </Fade>
            <br />
            <div className="inline-block bg-red-200 rounded-3xl px-8 py-4 my-4">
              <Fade Reveal>Have enough cash to pay the car outright</Fade>
            </div>
            <Fade Reveal>or</Fade>
            <div className="inline-block bg-red-200 rounded-3xl px-8 py-4 my-4">
              <Fade Reveal>
                Take out a car loan and pay high monthly payments over many
                years.{' '}
              </Fade>
            </div>
          </span>
        </div>
        <div className="mx-auto max-w-7xl px-4 py-16 my-20 sm:px-6 lg:px-8 bg-accentTwo rounded-3xl">
          <Fade Reveal>
            <h1 className="font-serif underline text-3xl mb-12 text-center">
              Example of a regular car loan
            </h1>
            <div className="text-lg mb-4 max-w-[70%] mx-auto">
              Lets say you want to buy a $45,000 Toyota Corolla with a 10%
              deposit, an 8% Interest Rate and a loan term of 36 Months. A
              general finance structure would look like this:
            </div>
            <StaticDiagram horizontal={true} />
            <div className="flex font-serif underline text-3xl my-12 items-center text-center justify-center max-w-[50%] mx-auto">
              Here's the same example, but on a Personal Contract Purchase (PCP)
            </div>
            <Diagram
              carFinanceInfo={{
                // Hardcoded diagram for the home page
                paymentCalculations: {
                  balloonPayment: 27600,
                  depositAmount: 4500,
                  totalPaymentPerPeriod: 148
                }
              }}
              horizontal={true}
            />
          </Fade>
          <div className="text-center text-lg mb-4">
            The monthly payments are less than{' '}
            <span className="font-bold text-xl underline">half</span> that of a
            regular car loan!
          </div>
        </div>
        <Fade Reveal>
          <Explanation />
        </Fade>
        <div className="font-serif underline font-bold text-center text-3xl mx-auto">
          <Fade Reveal>Flexibility</Fade>
        </div>
        <div className="text-center bg-accentTwo mt-12 mb-16 rounded-3xl py-8">
          <Fade Reveal>
            <span className="text-xl font-serif">
              At the end of a PCP contract, you have three options
            </span>
            <div className="flex flex-col mt-4 text-left text-xl max-w-[50%] mx-auto justify-between">
              <span className="my-1 font-bold">1. Return the car</span>
              <span className="my-1 font-bold">
                2. Pay the optional final balloon payment (GMFV) to keep the car
              </span>
              <span className="my-1 font-bold">
                3. Use your equity to go towards a new car
              </span>
            </div>
          </Fade>
        </div>
        <Fade Reveal>
          <PreFooter />
        </Fade>
      </div>
      <Fade Reveal>
        <Footer />
      </Fade>
    </div>
  );
}
