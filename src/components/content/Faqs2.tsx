import { Disclosure, Transition } from '@headlessui/react';
import { ChevronUpIcon } from '@heroicons/react/20/solid';
import * as React from 'react';
import Fade from 'react-reveal/Fade';

const Faqs2 = () => {
  return (
    <div className="max-w-[80%] mx-auto">
      <Fade Reveal>
        <h1 className="font-serif underline font-bold text-center text-3xl mx-auto">
          Questions
        </h1>
        {faqData.map((faq, index) => (
          <Disclosure key={index} as="div" className="text-xl my-8">
            {({ open }) => (
              <>
                <Disclosure.Button className="flex w-full justify-between rounded-lg bg-purple-100 px-4 py-2 text-left text-lg font-medium text-purple-900 hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
                  <span>{faq.question}</span>
                  <ChevronUpIcon
                    className={`${
                      open ? 'rotate-180 transform' : ''
                    } h-5 w-5 text-purple-500`}
                  />
                </Disclosure.Button>
                <Transition
                  enter="transition duration-100 ease-out"
                  enterFrom="transform scale-95 opacity-0"
                  enterTo="transform scale-100 opacity-100"
                  leave="transition duration-75 ease-out"
                  leaveFrom="transform scale-100 opacity-100"
                  leaveTo="transform scale-95 opacity-0"
                >
                  <Disclosure.Panel className="px-4 pt-4 pb-2 text-md text-gray-500">
                    {faq.answer}
                  </Disclosure.Panel>
                </Transition>
              </>
            )}
          </Disclosure>
        ))}
      </Fade>
    </div>
  );
};

const faqData = [
  {
    question: "What's the process for getting a car on PCP?",
    answer: (
      <>
        The same process as getting a car on regular finance - find the car you
        want (new or newly used) and get in contact with us. Once you complete
        the simple credit checks and dot the i’s and cross the t’s you should be
        on your way in your flash new car!
      </>
    )
  },
  {
    question: 'Can I sell a car on PCP?',
    answer: (
      <>
        Unfortunately not - as you do not own the car. There may be options
        (paying of the monthly payments and balloon payment early) which sees
        you owning the car and having the ability to sell, but in short you
        cannot sell a car on PCP since it is technically not your car to sell.
      </>
    )
  },
  {
    question: 'Do I need to pay for insurance on the car?',
    answer: (
      <>
        Yes - you are responsible for the wear and tear, alongside any potential
        incidents regarding the car.
      </>
    )
  },
  {
    question: 'Who pays for repairs on a PCP car?',
    answer: (
      <>
        It depends what sort of repairs are needed. If the car develops a fault
        and the car is within manufacturer warranty, repairs may well be covered
        by this. If the car is involved in a collision, your insurance company
        should fund repairs, though liaise with the finance company before these
        are made.
        <br />
        <br />
        If the car sustains a parking ding, for example, be wary about
        organising repairs yourself: the finance firm may be able to tell
        (perhaps with a paint depth gauge) if the car is handed back at the end
        of the deal, charging you for conducting an “unauthorised repair”. All
        of this should be specified in your PCP contract, but the finance firm
        will most likely need to be told of any damage and organise repairs
        themselves, as poor repairs can reduce a car’s value.
      </>
    )
  },
  {
    question: 'Can I buy a second hand car on PCP?',
    answer: (
      <>
        Yes, but there are some restrictions. The car needs to be New Zealand
        New (Ie bought new in New Zealand and not an import), bought from a
        dealership and is one to three years old.
      </>
    )
  },
  {
    question: "How is the depreciation calculated? What's equity?",
    answer: (
      <>
        The GMFV (value after estimated depreciation) is estimated using vehicle
        pricing data that is shared between finance firms, dealerships,
        insurance companies and other large organisations involved in car sales.
        <br />
        <br />
        In a perfect world, these estimates would be 100% accurate, and the
        deposit and ongoing payments would sum up perfectly to the GMFV.
        However, finance firms are often conservative with GFMV predictions
        (they tend to overestimate the amount of depreciation). So there's a
        chance the balloon payment might be lower than the car's value. In such
        cases, the difference can be used as a deposit for a new car.
        <br />
        <br />
        For instance, if the balloon payment is $27,600, but the car's worth is
        $30,000, the $2,400 difference can be used as a deposit for a new car.
        However, to use this equity, you typically need to buy another car from
        the same dealership/brand. Otherwise, if you return the car or choose a
        different brand/dealership, you won't get the $2,400. Nevertheless, you
        can still opt to pay the balloon payment, buying the $30,000 car for
        $27,600.
      </>
    )
  },
  {
    question: 'What are the Pros of PCP?',
    answer: (
      <ul className="list-disc list-inside">
        <li className="mb-6 font-bold">
          Lower Payments <br />
          <br />
          <span className="font-normal">
            One of the main benefits of a PCP contract is the lower monthly
            payments. This would mean better weekly cashflow, or a better car
            for a similar monthly payment on regular finance.
          </span>
        </li>
        <li className="font-bold">
          Flexibility
          <br />
          <br />
          <span className="font-normal">
            One of the main benefits of a PCP contract is the lower monthly
            payments. This would mean better weekly cashflow, or a better car
            for a similar monthly payment on regular finance.
          </span>
        </li>
      </ul>
    )
  },
  {
    question: 'What are the Cons of PCP?',
    answer: (
      <ul className="list-disc list-inside">
        <li className="mb-6 font-bold">
          Ownership <br />
          <br />
          <span className="font-normal">
            The main con / difference between a regular car loan and PCP is that
            you do not own the car during the contract, and paying all the
            monthly payments does not mean you own the car at the end of the
            contract. Untill you pay the balloon payment at the end of the
            contract, legal ownership of the car is with the finance company.{' '}
            <br />
            <br />
            This differs to a regular car loan / hire purchase, where each time
            you pay the monthly payments you pay off a small amount of the loan
            as well which sees you owning the car at the end of the contract
            term.
          </span>
        </li>
        <li className="font-bold">
          Usage
          <br />
          <br />
          <span className="font-normal">
            PCP Contracts tends to have a certain amount of kilometre's you can
            drive the car over the contracted term. For example, a 36 month
            contract may have a contracted limit of 36,000 km’s you can drive
            the car for. If you exceed the allocated kilometres, you will pay
            for every kilometre you go over the contracted amount (which tends
            to be quite expensive). You are also required to keep the car on a
            good condition, and any excess wear and tear may see you pay extra
            at the end of the finance term.
          </span>
        </li>
      </ul>
    )
  }
];

export default Faqs2;
