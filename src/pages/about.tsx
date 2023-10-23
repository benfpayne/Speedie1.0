import type { HeadFC, PageProps } from 'gatsby';
import { Link } from 'gatsby';
import * as React from 'react';
import Footer from '../components/footer';
import Header from '../components/header';
import Raptor from '../images/cars/fordRaptor.svg';

const AboutPage: React.FC<PageProps> = (props: any) => {
  return (
    <div>
      <Header />
      <section id="about-us" className="pb-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col-reverse md:flex-row justify-between items-center">
            <div className="md:pt-12 md:w-1/2 md:mr-16">
              <h1 className="font-sans text-5xl font-bold text-primary leading-[4rem]">
                About us
              </h1>
              <p className="mt-6 text-xl">
                We're a group of four passionate car enthusiasts trying to help
                Kiwi's drive their dream cars.
              </p>
              <p className="mt-6 text-xl">
                Speedie financing is based on Personal Contract Purchase (PCP) -
                the most popular and convenient financing method in the U.K.
              </p>
              <p className="mt-6 text-xl font-bold text-primary">
                Watch this space.
              </p>
              <hr className="my-4" />
              <p className="mt-6 text-xl">
                <Link
                  to={'/contact'}
                  className="underline  font-bold text-primary"
                >
                  click here
                </Link>{' '}
                to send us a message or alternatively contact us at{' '}
                <a
                  href="mailto:info@speedie.co.nz"
                  className="underline italic"
                >
                  info@speedie.co.nz
                </a>
              </p>
            </div>
            <div className="overflow-hidden w-1/2 min-w-[293px]">
              <img className="h-auto " alt="car" src={Raptor} />
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export const Head: HeadFC = () => <title>About Us</title>;

export default AboutPage;
