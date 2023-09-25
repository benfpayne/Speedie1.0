import type { HeadFC, PageProps } from 'gatsby';
import { Link } from 'gatsby';
import * as React from 'react';
import Footer from '../components/footer';
import Header from '../components/header';

const AboutPage: React.FC<PageProps> = (props: any) => {
  return (
    <div>
      <Header />
      <div className="w-screen mx-auto px-8 text-center">
        <h1 className="font-serif my-24 text-3xl font-bold">About us</h1>
        <div className="text-center">
          We are a group of 4 passionate individuals trying to bring the most
          popular and convenient way to finance a car in the UK, to New Zealand.
        </div>
        <div className="mt-12">Watch this space.</div>
        <div className="mt-12">
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

export const Head: HeadFC = () => <title>About Us</title>;

export default AboutPage;
