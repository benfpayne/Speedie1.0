import type { HeadFC, PageProps } from 'gatsby';
import { Link } from 'gatsby';
import * as React from 'react';
import Footer from '../components/footer';
import Header from '../components/header';

const FaqsPage: React.FC<PageProps> = (props: any) => {
  return (
    <div>
      <Header />
      <div className="w-screen mx-auto px-8">
        <h1 className="font-serif my-24 text-3xl font-bold text-center">
          FAQs
        </h1>
        <div className="max-w-[80%] mx-auto">
          <div className="font-serif text-xl font-bold my-8">
            What's the process for getting a car on PCP?
          </div>
          The same process as getting a car on regular finance - find the car
          you want (new or newly used) and get in contact with us. Once you
          complete the simple credit checks and dot the i’s and cross the t’s
          you should be on your way in your flash new car!
          <br />
          <br />
          <div className="font-serif text-xl font-bold my-8">
            Can I sell a car on PCP?
          </div>
          Unfortunately not - as you do not own the car. There may be options
          (paying of the monthly payments and balloon payment early) which sees
          you owning the car and having the ability to sell, but in short you
          cannot sell a car on PCP since it is technically not your car to sell.
          <br />
          <br />
          <div className="font-serif text-xl font-bold my-8">
            Do I need to pay for insurance on the car?
          </div>
          Yes - you are responsible for the wear and tear, alongside any
          potential incidents regarding the car.
          <br />
          <br />
          <div className="font-serif text-xl font-bold my-8">
            Who pays for repairs on a PCP car?
          </div>
          It depends what sort of repairs are needed. If the car develops a
          fault and the car is within manufacturer warranty, repairs may well be
          covered by this. If the car is involved in a collision, your insurance
          company should fund repairs, though liaise with the finance company
          before these are made.
          <br />
          <br />
          If the car sustains a parking ding, for example, be wary about
          organising repairs yourself: the finance firm may be able to tell
          (perhaps with a paint depth gauge) if the car is handed back at the
          end of the deal, charging you for conducting an “unauthorised repair”.
          All of this should be specified in your PCP contract, but the finance
          firm will most likely need to be told of any damage and organise
          repairs themselves, as poor repairs can reduce a car’s value.
          <br />
          <br />
          <div className="font-serif text-xl font-bold my-8">
            Can I buy a second hand car on PCP?
          </div>
          Yes, but there are some restrictions. The car needs to be New Zealand
          New (Ie bought new in New Zealand and not an import), bought from a
          dealership and is one to three years old.
          <br />
          <br />
        </div>
        <div className="mt-12 text-center">
          <Link to={'/contact'} className="underline italic">
            click here
          </Link>{' '}
          to send us a message or alternatively contact us at{' '}
          <a href="mailto:info@speedie.co.nz" className="underline italic">
            info@speedie.co.nz
          </a>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export const Head: HeadFC = () => <title>FAQs</title>;

export default FaqsPage;
