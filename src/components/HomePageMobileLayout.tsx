import { navigate } from 'gatsby';
import * as React from 'react';
import { Fragment } from 'react';

//Images
import AudiRS6 from '../images/AudiRS6.png';
import TeslaModel3 from '../images/TeslaModel3.png';

import { Transition } from '@headlessui/react';
import Fade from 'react-reveal/Fade';
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

export default function HomePageMobileLayout(props: any) {
  function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
  }
  return (
    <Fragment>
      <Header />
      <div
        className={classNames(' w-screen overflow-clip flex flex-col bg-white')}
      >
        {/* BACKGROUND CAR */}
        <div className="relative">
          <Transition
            show={true}
            enter="transition-opacity duration-[350ms]"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-out duration-[350ms]"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="relative right-1/3 translate-y-8 z-0">
              <img
                className="h-[105px] w-[330px] max-w-none z-0"
                src={AudiRS6}
              />
            </div>
          </Transition>
          {/* CAR IN FOCUS */}
          <Transition
            show={true}
            enter="transition-opacity ease-out duration-[350ms]"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease out duration-[350ms]"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="relative left-1/3 z-0">
              <img
                className="h-[208px] w-[375px] max-w-none"
                src={TeslaModel3}
              />
            </div>
          </Transition>
        </div>
        <div className="flex flex-col items-start mx-8 mt-8 mb-8">
          <span className="font-serif text-3xl">
            New age car finance, tailored to your needs.
          </span>
          <button
            onClick={() => navigate('/calculator')}
            className="transition-opacity duration-300 hover:opacity-75 drop-shadow-xl rounded-3xl py-3 px-8 mt-8 bg-primary"
          >
            <span className="decoration-1 text-accentTwo">
              Use our calculator
            </span>
          </button>
        </div>
      </div>
      <div className="mx-8 sm:px-6 lg:px-12 mt-16">
        <div className="flex flex-col text-center mb-8">
          <span className="font-serif font-extrabold underline text-4xl">
            <Fade Reveal>What is PCP? How does it work?</Fade>
          </span>
          <span className="mt-12 font-medium text-lg">
            <Fade Reveal>
              Buying a new car tends to be quite difficult, you have two
              options:
            </Fade>
            <br />
            <div className="inline-block bg-red-200 rounded-3xl p-4 my-4">
              <Fade Reveal>Have enough cash to pay the car outright</Fade>
            </div>
            <Fade Reveal>or</Fade>
            <div className="inline-block bg-red-200 rounded-3xl p-4 my-4">
              <Fade Reveal>
                Take out a car loan and pay high monthly payments over many
                years.{' '}
              </Fade>
            </div>
          </span>
        </div>
        <div className="mx-auto max-w-7xl px-4 py-16 my-20 sm:px-6 lg:px-8 bg-accentTwo rounded-3xl">
          <h1 className="font-serif underline text-3xl mb-12 text-center">
            <Fade Reveal>Example of a regular car loan</Fade>
          </h1>
          <div className="text-lg mb-4 max-w-[75%] mx-auto">
            <Fade Reveal>
              Lets say you want to buy a $45,000 Toyota Corolla with a 10%
              deposit, an 8% Interest Rate and a loan term of 36 Months. A
              general finance structure would look like this:
            </Fade>
          </div>
          <Fade Reveal>
            <StaticDiagram horizontal={false} />
          </Fade>
          <div className="flex font-serif underline text-3xl my-12 items-center text-center justify-center ">
            <Fade Reveal>
              Here's the same example, but on a Personal Contract Purchase (PCP)
            </Fade>
          </div>
          <Fade Reveal>
            <Diagram
              carFinanceInfo={{
                // Hardcoded diagram for the home page
                paymentCalculations: {
                  balloonPayment: 27600,
                  depositAmount: 4500,
                  totalPaymentPerPeriod: 148
                }
              }}
              horizontal={false}
            />
          </Fade>
          <div className="text-center text-lg mb-4">
            The monthly payments are more than{' '}
            <span className="font-bold text-xl underline">half</span> that of a
            regular car loan!
          </div>
        </div>
        <Explanation />
        <div className="font-serif underline font-bold text-center text-3xl mx-auto">
          <Fade Reveal>Flexibility</Fade>
        </div>
        <div className="text-center bg-accentTwo mt-12 rounded-3xl py-8">
          <Fade Reveal>
            <span className="text-lg font-serif">
              At the end of a PCP contract, you get three options
            </span>
            <div className="flex flex-col mt-4 text-left max-w-[80%] mx-auto justify-center">
              <ol className="list-decimal list-inside">
                <li className="my-1 font-bold">Return the car</li>
                <li className="my-1 font-bold">
                  Pay the optional final balloon payment (GMFV) to keep the car
                </li>
                <li className="my-1 font-bold">
                  Use your equity to go towards a new car
                </li>
              </ol>
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
    </Fragment>
  );
}
