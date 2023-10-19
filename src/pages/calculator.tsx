import type { HeadFC, PageProps } from 'gatsby';
import { graphql } from 'gatsby';
import * as React from 'react';
import CarCalculator from '../components/CarCalculator';
import Footer from '../components/footer';
import Header from '../components/header';

const CalculatorPage: React.FC<PageProps> = (props: any) => {
  return (
    <div>
      <Header />
      <section id="car-calculator" className="pt-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="font-sans text-5xl font-bold leading-[4rem] md:text-center">
            Car finance calculator
          </h1>
          <p className="text-xl mt-6 md:text-center md:mb-12">
            Work out your weekly payments with Speedie finance.
          </p>
        </div>
        <CarCalculator data={props.data} />
      </section>
      <section id="Get started today" className="bg-accentGreen py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row">
            <div className="w-full md:w-2/5 flex justify-between">
              <div className="w-full flex flex-col justify-center items-center mb-8 md:mb-0 md:mr-8">
                <h1 className="font-sans text-4xl text-center font-bold text-black leading-[4rem]">
                  Get started today
                </h1>
                <p className="mt-4 text-xl text-center leading-8 mb-4">
                  Kickstart your journey to owning a brand new car in just 5
                  minutes
                </p>
                <button
                  onClick={() => navigate('/calculator')}
                  className="transition-opacity duration-300 hover:opacity-75 w-32 rounded-3xl py-2 mt-4 bg-primary text-white text-base"
                >
                  Sign me up
                </button>
              </div>
            </div>
            <div className="w-full md:w-3/5 grid grid-rows-2 grid-cols-3 gap-4">
              <div className="bg-white rounded-2xl p-4 col-span-3 lg:col-span-2">
                <div className="flex items-center mb-4">
                  <div className="bg-primary flex justify-center items-center h-12 w-12 rounded-xl mr-4">
                    <span>✨</span>
                  </div>
                  <div className="flex flex-col">
                    <p className="text-sm text-primary">Step 1</p>
                    <p className="font-bold">Join our waitlist</p>
                  </div>
                </div>
                <div className="">
                  We’re working hard behind the scenes to get things ready.
                  Secure your spot as one of our first customers.
                </div>
              </div>
              <div className="hidden lg:block lg:col-span-1"></div>
              <div className="hidden lg:block lg:col-span-1"></div>
              <div className="bg-white  rounded-2xl p-4 col-span-3 lg:col-span-2">
                <div className="flex items-center mb-4">
                  <div className="bg-primary flex justify-center items-center h-12 w-12 rounded-xl mr-4">
                    <span>🤘</span>
                  </div>
                  <div className="flex flex-col">
                    <p className="text-sm text-primary">Step 2</p>
                    <p className="font-bold">Relax, we've got it covered</p>
                  </div>
                </div>
                <div className="">
                  Sit back and let us handle the rest. Once we're up and
                  running, we'll get in touch and do our best to put you behind
                  the wheel of your dream car.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section id="Kiwis for Kiwis" className="bg-greenBackground py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center text-white">
            <h2 className="text-4xl font-bold">🥝 Made by Kiwi's for Kiwis</h2>
            <p className="mt-8">
              Car financing made affordable by other Kiwi's trying to make
              driving their dream cars affordable
            </p>
          </div>
        </div>
      </section>
      <Footer footnotes={true} />
    </div>

    // <div>
    //   <div className="sm:hidden">
    //     <CalculatorMobileLayout {...props} />
    //   </div>
    //   <div className="hidden sm:block">
    //     <CalculatorDesktopLayout {...props} />
    //   </div>
    // </div>
  );
};

export default CalculatorPage;

export const Head: HeadFC = () => <title>PCP Calculator</title>;

export const query = graphql`
  {
    allSqliteCarRecords {
      nodes {
        id
        ModelCode
        Make
        Model
        Description
        CleanCarFeebate
        RRPincGST
        _48_50000km
        _48_40000km
        _48_30000km
        _48_20000km
        _48_10000km
        _36_50000km
        _36_40000km
        _36_20000km
        _36_30000km
        _36_10000km
        _24_50000km
        _24_40000km
        _24_30000km
        _24_20000km
        _24_10000km
        _12_40000km
        _12_50000km
        _12_30000km
        _12_10000km
        _12_20000km
      }
      distinct(field: { Make: SELECT })
    }
  }
`;
