import { Listbox, Transition } from '@headlessui/react';
import type { HeadFC, PageProps } from 'gatsby';
import { graphql, navigate } from 'gatsby';
import * as React from 'react';
import { Fragment, useState } from 'react';
import Marquee from 'react-fast-marquee';
import Header from '../components/header';

//Images
import { ArrowLongRightIcon, ChevronDownIcon } from '@heroicons/react/20/solid';
import Footer from '../components/footer';
import AstonMartinLogo from '../images/carLogos/aston.png';
import AudiLogo from '../images/carLogos/audi.png';
import BYDLogo from '../images/carLogos/byd.png';
import FordLogo from '../images/carLogos/ford.png';
import LamborghiniLogo from '../images/carLogos/lamborghini.png';
import MercedesLogo from '../images/carLogos/mercedes.png';
import NissanLogo from '../images/carLogos/nissan.png';
import PolestarLogo from '../images/carLogos/polestar.png';
import PorscheLogo from '../images/carLogos/porsche.png';
import TeslaLogo from '../images/carLogos/tesla.png';
import ToyotaLogo from '../images/carLogos/toyota.png';
import Model3 from '../images/cars/tesla.svg';

const exampleCars = [
  {
    id: 1,
    name: 'Tesla Model 3',
    speedieWeeklyPayment: 258,
    otherWeeklyPayment: 502
  },
  {
    id: 2,
    name: 'Toyota Hilux',
    speedieWeeklyPayment: 113,
    otherWeeklyPayment: 328
  },
  {
    id: 3,
    name: 'Porsche 911 GT3',
    speedieWeeklyPayment: 1697,
    otherWeeklyPayment: 3375
  },
  {
    id: 4,
    name: 'BMW 3 Series',
    speedieWeeklyPayment: 477,
    otherWeeklyPayment: 668
  },
  {
    id: 5,
    name: 'Ford Ranger',
    speedieWeeklyPayment: 316,
    otherWeeklyPayment: 703
  }
];

const IndexPage: React.FC<PageProps> = (props: any) => {
  const [selectedCar, setSelectedCar] = useState(exampleCars[0]);

  return (
    <div>
      <Header />
      <section id="landing-banner" className="pb-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row-reverse justify-between items-center">
            <div className="overflow-hidden w-1/2 min-w-[293px]">
              <img className="h-auto " alt="car" src={Model3} />
            </div>
            <div className="flex flex-col items-start text-center md:text-left md:w-1/2 md:mr-16">
              <h1 className="font-sans text-5xl font-bold text-primary leading-[4rem]">
                Drive the car you want for less
              </h1>
              <p className="mt-6 text-xl">
                New age car financing with lower weekly payments and more
                flexibility
              </p>
              <div className="w-full text-center md:text-left">
                <button
                  onClick={() => navigate('/calculator')}
                  className="transition-opacity duration-300 hover:opacity-75 w-32 rounded-3xl py-2 mt-6 bg-primary text-white text-base"
                >
                  Start now
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section
        id="lower-repayments"
        className="bg-primaryBackground py-12 md:py-24"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex flex-col items-start w-full md:pr-8 md:w-1/2">
              <div>
                <h1 className="font-sans text-4xl font-bold text-black leading-[4rem]">
                  Lower repayments?
                </h1>
                <h1 className="font-sans text-4xl font-bold text-primary leading-[4rem]">
                  Heck yes.
                </h1>
              </div>
              <p className="mt-4 text-xl leading-8">
                Say goodbye to traditional principal and interest payments. At
                Speedie, we ask you to pay depreciation only.
              </p>
            </div>
            <div className="flex flex-col justify-start w-full md:w-1/2 mt-8 md:mt-0">
              <Listbox value={selectedCar} onChange={setSelectedCar}>
                <div className="relative mt-1 text-left lg:text-center text-xl">
                  For a
                  <Listbox.Button className="relative cursor-default py-1 ml-2 pr-10 text-primary font-bold border-b-2 border-primary">
                    <span className="block truncate">{selectedCar.name}</span>
                    <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                      <ChevronDownIcon
                        className="h-5 w-5 text-primary"
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
                    <Listbox.Options className="absolute left-1/2 -translate-x-1/2 text-lg mt-1 max-h-60 w-[275px] overflow-auto rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      {exampleCars.map((car) => (
                        <Listbox.Option
                          key={car.id}
                          className={({ active }) =>
                            `relative cursor-default select-none py-2 pl-4 pr-4 ${
                              active
                                ? 'bg-orange-100 text-primary font-bold'
                                : 'text-gray-900'
                            }`
                          }
                          value={car}
                        >
                          {({ selected }) => (
                            <>
                              <span
                                className={`block truncate ${
                                  selected ? 'font-medium' : 'font-normal'
                                }`}
                              >
                                {car.name}
                              </span>
                            </>
                          )}
                        </Listbox.Option>
                      ))}
                    </Listbox.Options>
                  </Transition>
                </div>
              </Listbox>
              <div className="grid grid-rows-2 grid-cols-1 lg:grid-rows-1 lg:grid-cols-2 gap-6 mt-6">
                <div className="flex flex-col p-4 pb-16 bg-greenBackground rounded-xl text-white w-full">
                  <p className="font-serif text-4xl">Speedie</p>
                  <p className="text-xs mt-4">Paying depreciation only</p>
                  <div className="text-accentGreen mt-8 text-xs">
                    <span className="text-[2.5rem] font-bold mr-2">
                      ${selectedCar.speedieWeeklyPayment}
                    </span>
                    monthly repayment
                  </div>
                </div>
                <div className="flex flex-col p-4 pb-16 bg-white rounded-xl w-full">
                  <p className="font-sans text-4xl">Others</p>
                  <p className="text-xs mt-4">Paying principal and interest</p>
                  <div className="mt-8 text-xs">
                    <span className="text-[2.5rem] font-bold mr-2">
                      ${selectedCar.otherWeeklyPayment}
                    </span>
                    monthly repayment
                  </div>
                </div>
              </div>
              <button
                onClick={() => navigate('/calculator')}
                className="transition-opacity duration-300 hover:opacity-75 w-32 rounded-3xl py-2 mt-4 bg-primary text-white text-base"
              >
                Start now
              </button>
            </div>
          </div>
        </div>
      </section>
      <section id="Flexible options" className="py-12 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="font-sans text-4xl text-center font-bold text-black leading-[4rem]">
            Flexible terms to suit your lifestyle
          </h1>
          <p className="mt-4 text-xl text-center leading-8">
            Don't get locked into a deal that provides no options. At Speedie,
            we know life changes fast, we provide you different options at the
            end of your deal to fit make sure your better off.
          </p>
          <div className="flex justify-center mt-4 text-xl leading-8">
            <button className="flex items-center border-b-2 border-primary">
              {' '}
              <span className="mr-4">Learn more </span>
              <ArrowLongRightIcon
                className="h-5 w-5 text-black"
                aria-hidden="true"
              />
            </button>
          </div>

          <div className="grid grid-rows-3 grid-cols-1 lg:grid-rows-1 lg:grid-cols-3 gap-8 mt-8">
            <div className="flex p-[1.5rem] rounded-xl bg-greenBackground h-auto lg:items-end lg:h-[34rem] lg:w-80">
              <div className="flex flex-col text-white">
                <h1 className="text-[2.5rem] font-sans font-bold">Swap</h1>
                <p className="text-xl">
                  Want the newest model? Simply trade in you car for a new one
                </p>
                <div className="mt-6 lg:pb-8">
                  <button
                    onClick={() => navigate('/calculator')}
                    className="flex items-center border-b-2 border-primary"
                  >
                    {' '}
                    <span className="mr-4">Browse cars </span>
                    <ArrowLongRightIcon
                      className="h-5 w-5 text-white"
                      aria-hidden="true"
                    />
                  </button>
                </div>
              </div>
            </div>
            <div className="flex p-[1.5rem] rounded-xl bg-primary h-auto lg:items-end lg:h-[34rem] lg:w-80">
              <div className="flex flex-col text-white">
                <h1 className="text-[2.5rem] font-sans font-bold">Return</h1>
                <p className="text-xl">
                  Don't need the car anymore? Give it back to us for no extra
                  cost
                </p>
                <div className="mt-6 lg:pb-8">
                  <button
                    onClick={() => navigate('/calculator')}
                    className="flex items-center border-b-2 border-accentGreen"
                  >
                    {' '}
                    <span className="mr-4">Browse cars</span>
                    <ArrowLongRightIcon
                      className="h-5 w-5 text-white"
                      aria-hidden="true"
                    />
                  </button>
                </div>
              </div>
            </div>
            <div className="flex p-[1.5rem] rounded-xl bg-primaryBackground h-auto lg:items-end lg:h-[34rem] lg:w-80">
              <div className="flex flex-col">
                <h1 className="text-[2.5rem] font-sans font-bold">Buy</h1>
                <p className="text-xl">
                  Love it so much you want to keep it? Simply pay off the
                  balance on the car.
                </p>
                <div className="mt-6 lg:pb-8">
                  <button
                    onClick={() => navigate('/calculator')}
                    className="flex items-center border-b-2 border-black"
                  >
                    {' '}
                    <span className="mr-4">Browse cars </span>
                    <ArrowLongRightIcon
                      className="h-5 w-5 text-black"
                      aria-hidden="true"
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section id="one-stop-shop" className="bg-grayBackground py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="font-sans text-4xl text-center font-bold text-black leading-[4rem]">
            More cars more options
          </h1>
          <p className="mt-4 text-xl text-center leading-8 mb-12">
            Don’t limit yourself to a single brand or model. Leverage our
            network to finance a diverse selection of cars.
          </p>
          <Marquee play={true} pauseOnHover={true}>
            <img src={AudiLogo} className="h-auto w-auto mr-12" />
            <img src={MercedesLogo} className="h-auto w-auto mr-12" />
            <img src={ToyotaLogo} className="h-auto w-auto mr-16" />
            <img src={TeslaLogo} className="h-auto w-auto mr-16" />
            <img src={FordLogo} className="h-auto w-auto mr-12" />
            <img src={PorscheLogo} className="h-auto w-auto mr-12" />
            <img src={AstonMartinLogo} className="h-auto w-auto mr-8" />
            <img src={PolestarLogo} className="h-auto w-auto mr-8" />
            <img src={LamborghiniLogo} className="h-auto w-auto mr-6" />
            <img src={NissanLogo} className="h-auto w-auto mr-2" />
            <img src={BYDLogo} className="h-auto w-auto mr-12" />
          </Marquee>
        </div>
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
      <Footer footnotes={false} />
    </div>
  );
};

export default IndexPage;

export const Head: HeadFC = () => <title>Speedie Home Page</title>;

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
