import type { HeadFC, PageProps } from 'gatsby';
import * as React from 'react';
import Footer from '../components/footer';
import Header from '../components/header';

const FaqsPage: React.FC<PageProps> = (props: any) => {
  return (
    <div>
      <Header />
      <section id="faqs" className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="font-sans text-5xl font-bold text-primary leading-[4rem]">
            FAQs
          </h1>
          <div className="mt-16">
            <h2 className="text-xl font-bold mb-8">
              What's the process for getting a car on Speedie Finance?
            </h2>
            <p className="text-lg">
              The same process as getting a car on regular finance - find the
              car you want (new or newly used) and get in contact with us. Once
              you complete the simple credit checks and dot the i’s and cross
              the t’s you should be on your way in your flash new car!
            </p>
          </div>
          <div className="mt-16">
            <h2 className="text-xl font-bold mb-8">
              Can I sell my car in the middle of my Speedie finance deal?
            </h2>
            <p className="text-lg">
              Unfortunately not - as you do not own the car. There may be
              options (paying of the monthly payments and balloon payment early)
              which sees you owning the car and having the ability to sell, but
              in short you cannot sell a car on PCP since it is technically not
              your car to sell.
            </p>
          </div>
          <div className="mt-16">
            <h2 className="text-xl font-bold mb-8">
              Is insurance included in my Speedie finance deal?
            </h2>
            <p className="text-lg">
              No insurance is not included. You are responsible for any wear and
              tear, alongside any potential incidents regarding the car. We
              suggest you insure the car like you would any other car.
            </p>
          </div>
          <div className="mt-16">
            <h2 className="text-xl font-bold mb-8">
              Is insurance included in my Speedie finance deal?
            </h2>
            <p className="text-lg">
              No insurance is not included. You are responsible for any wear and
              tear, alongside any potential incidents regarding the car. We
              suggest you insure the car like you would any other car.
            </p>
          </div>
          <div className="mt-16">
            <h2 className="text-xl font-bold mb-8">
              Who pays for repairs on a Speedie finance deal?
            </h2>
            <p className="text-lg">
              It depends what sort of repairs are needed. If the car develops a
              fault and the car is within manufacturer warranty, repairs may
              well be covered by this. If the car is involved in a collision,
              your insurance company should fund repairs, though liaise with the
              finance company before these are made.
            </p>
          </div>
          <div className="mt-16">
            <h2 className="text-xl font-bold mb-8">
              Can I buy a second hand car using Speedie Finance?
            </h2>
            <p className="text-lg">
              Yes, but there are some restrictions. The car needs to be New
              Zealand New (i.e. bought new in New Zealand and not an import),
              bought from a dealership and is one to three years old.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export const Head: HeadFC = () => <title>FAQs</title>;

export default FaqsPage;
