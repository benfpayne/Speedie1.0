import * as React from 'react';
import Pig from '../images/pig.png';
import CarCalculator from './CarCalculator';
import PreFooter from './PreFooter';
import Card from './containers/Card';
import VerticalBox from './containers/VerticalBox';
import Footer from './footer';
import Header from './header';
import TitleHeader from './typography/TitleHeader';

export default function HowItWorksLayout(props: any) {
  return (
    <div>
      <Header />
      <section className="py-12" id="steps">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <TitleHeader
            title="How it works"
            subtitle="Speedie finance is not your traditional loan."
            enableButton={true}
            className="font-sans text-center mb-12"
          />
          <div className="flex flex-col items-center xl:items-start md:flex-col xl:flex-row">
            <VerticalBox
              step="1"
              title="Start with a deposit"
              explanation="First, like any other loan, you have to put some money down. Usually this is 10% of the price of the car. This deposit gives the bank assurance and shows commitment to taking care of the car."
            />
            <VerticalBox
              step="2"
              title="Drive your car and enjoy it!"
              explanation="Every month you make payments to cover the cost of the car’s depreciation. These payments are lower than a regular loan since you’re only paying for the cars lost value. Enjoy driving your brand new car for the period of your contract."
            />
            <VerticalBox
              step="3"
              title="Choose your path"
              explanation="When you contract is up, you get a range of choices to suit your stage of life. Like the car? Keep it. Want a new one? Trade-in. Don't need a car anymore? Return it for no extra cost."
              enableButton={true}
            />
          </div>
        </div>
      </section>
      <section
        id="offer-lowest-repayments"
        className="bg-primaryBackground py-12"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col items-center">
          <img className="mb-8" src={Pig} />
          <h1 className="mb-8 text-5xl font-extrabold leading-tight text-gray lg:leading-tight text-center font-sans">
            We offer the lowest repayments in the market
          </h1>
          <p className="mb-6 text-lg font-normal lg:text-xl text-center">
            Speedie finance is not your traditional loan.{' '}
          </p>
          <p className="mb-6 text-lg font-normal lg:text-xl text-center">
            We use machine learning and a series of algorithms to accurately
            predict a cars value year to year. Your monthly payments on Speedie
            finance cover the depreciation (loss in value) of your car over the
            time period of your deal, rather than the principal and interest of
            a traditional loan. The depreciation is usually much less than the
            principal and interest of a traditional loan - this is how the
            payments are much lower.
          </p>
          <p className="mb-6 text-lg font-normal lg:text-xl text-center">
            Since we know how much the car will be worth, we’re able to give you
            a few options at the end of your deal. You can either trade your car
            in for another one, return it to us and walk away, or pay whatever
            is owing on the car and keep it for yourself.
          </p>
        </div>
      </section>
      <section id="your-best-life" className="py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col-reverse lg:grid lg:grid-rows-1 lg:grid-cols-3">
            <div className="grid grid-rows-4 grid-cols-1 gap-12 lg:grid-rows-2 lg:grid-cols-2 lg:col-span-2">
              <Card
                title="🤑 Affordable prices"
                description="Customers choose Speedie when they want to drive a new car at an affordable price"
              />
              <Card
                title="🏎️ Newest wheels on the block"
                description="You love cars and want to drive the newest models. Trade in your car every couple of years"
              />
              <Card
                title="🪩 Here for a good time, not a long time"
                description="Moving around often? Choose Speedie when you’re staying somewhere for a year or two and need a car to get around. Simply return at the end of the deal. "
              />
              <Card
                title="🛒 Try before you buy "
                description="You’re unsure whether you want to buy the car but you want to drive it → try it out for a year paying the depreciation, if you like it buy it, if you don’t simply give the car back and walk away."
              />
            </div>
            <div className="w-full flex items-center text-center lg:ml-12  lg:col-span-1 lg:text-left">
              <div className="w-full">
                <h1 className="mb-8 text-5xl font-extrabold leading-tight text-gray lg:leading-tight font-sans">
                  Speedie lets you live your best life
                </h1>
                <p className="mb-6 text-lg font-normal lg:text-xl">
                  Whatever your life goals, Speedie finance can adapt to fit
                  them.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section id="car-calculator" className="pt-24 pb-24 bg-accentTwo">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="font-sans text-5xl font-bold leading-[4rem] md:text-center">
            Check it out for yourself
          </h1>
          <p className="text-xl mt-6 md:text-center md:mb-12">
            Use our calculator to see how much you can save with Speedie
          </p>
        </div>
        <CarCalculator data={props.props.data} />
      </section>
      <PreFooter />
      <Footer />
    </div>
  );
}
