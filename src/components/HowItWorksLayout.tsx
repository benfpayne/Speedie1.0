import * as React from 'react';
import CarCalculator from './CarCalculator';
import Card from './containers/Card';
import VerticalBox from './containers/VerticalBox';
import Footer from './footer';
import Header from './header';
import PreFooter from './PreFooter';
import TitleHeader from './typography/TitleHeader';

export default function HowItWorksLayout(props: any) {
  return (
    <div>
      <Header />
      <TitleHeader
        title="How it works"
        subtitle="Speedie finance is not your traditional loan."
        enableButton={true}
        className="font-sans p-24 text-center"
      />
      <div className="flex flex-col items-center md:flex-col xl:flex-row mb-12">
        <VerticalBox
          step="1"
          title="Start with a deposit"
          explanation="First, like any other loan, you have to put some money down. Usually this is 10% of the price of the car. This deposit is a “good faith” payment to the bank - it gives the bank security and shows commitment to taking care of the car."
        />
        <VerticalBox
          step="2"
          title="Drive your car and enjoy it!"
          explanation="Every month you make payments to cover the cost of the car’s depreciation. These payments are significantly lower than a regular loan since you’re not paying a large amount of interest. Only the value that the car has reduced. Enjoy driving your brand new car for the period of your contract."
        />
        <VerticalBox
          step="3"
          title="Choose your path"
          explanation="When your contract is up, choose to return, trade-in or buy the car."
          enableButton={true}
        />
      </div>
      <section id="offer-lowest-repayments" className="bg-primaryBackground">
        <div className="grid grid-rows-2 grid-cols-1 lg:grid-rows-1 lg:grid-cols-2 gap-6">
          <TitleHeader
            title="We offer the lowest repayments in the market."
            subtitle="Speedie finance is not your traditional loan. We use machine learning and a series of algorithms to accurately predict a cars value year to year."
            enableButton={false}
            className="font-sans p-24 sm:px-16 lg:px-24 lg:py-48"
          />
          <TitleHeader
            title="This design isn't completed on figma yet"
            subtitle="Your monthly payments on Speedie finance cover the depreciation (loss in value) of your car over the time period of your deal, rather than the principal and interest of a traditional loan. 

            The depreciation is usually much less than the principal and interest of a traditional loan - this is how the payments are much lower.
            In other words you pay based on the cars depreciation over the course of your deal.
            
            Since we know how much the car will be worth, we’re able to give you a few options at the end of your deal. 
            
            You can either trade your car in for another one, return it to use and walk away, or pay whatever is owing on the car and keep it for yourself.
            "
            enableButton={false}
            className="font-sans p-24 sm:px-16 lg:px-24 lg:py-48"
          />
        </div>
      </section>
      <section
        id="your-best-life"
        className="hidden sm:hidden md:hidden lg:block xl:block"
      >
        <div className="grid grid-rows-1 grid-cols-1 lg:grid-rows-1 lg:grid-cols-2">
          <div className="grid grid-rows-2 grid-cols-1 gap-24 p-24 lg:grid-rows-2 lg:grid-cols-2">
            <Card
              title="Affordable prices"
              description="Customers choose Speedie when they want to drive a new car at an affordable price"
            />
            <Card
              title="Newest wheels on the block"
              description="You love cars and want to drive the newest models. Trade in your car every couple of years"
            />
            <Card
              title="Here for a good time, not a long time"
              description="Moving around often? Choose Speedie when you’re staying somewhere for a year or two and need a car to get around. Simply return at the end of the deal. "
            />
            <Card
              title="Try before you buy "
              description="You’re unsure whether you want to buy the car but you want to drive it → try it out for a year paying the depreciation, if you like it buy it, if you don’t simply give the car back and walk away."
            />
          </div>
          <div className="py-24">
            <TitleHeader
              title="Speedie lets you live your best life"
              subtitle="Whatever your life goals speedie finance can adapt to fit them"
              enableButton={false}
              className="font-sans p-24 sm:px-16 lg:px-24 lg:py-48"
            />
          </div>
        </div>
      </section>
      <section
        id="your-best-life-inverse"
        className="sm:block md:block lg:hidden xl:hidden "
      >
        <div className="grid grid-rows-1 grid-cols-1 lg:grid-rows-1 lg:grid-cols-2">
          <div className="py-24 md:pt-0 sm:pt-0">
            <TitleHeader
              title="Speedie lets you live your best life"
              subtitle="Whatever your life goals speedie finance can adapt to fit them"
              enableButton={false}
              className="font-sans p-24 sm:px-16 lg:px-24 lg:py-48"
            />
          </div>
          <div className="grid grid-rows-2 grid-cols-1 gap-24 px-12 pb-12 pt-0 sm:px-12 sm:pb-12 sm:pt-0 md:px-12 md:pb-12 md:pt-0 lg:p-24 lg:grid-rows-2 lg:grid-cols-2">
            <Card
              title="Affordable prices"
              description="Customers choose Speedie when they want to drive a new car at an affordable price"
            />
            <Card
              title="Newest wheels on the block"
              description="You love cars and want to drive the newest models. Trade in your car every couple of years"
            />
            <Card
              title="Here for a good time, not a long time"
              description="Moving around often? Choose Speedie when you’re staying somewhere for a year or two and need a car to get around. Simply return at the end of the deal. "
            />
            <Card
              title="Try before you buy "
              description="You’re unsure whether you want to buy the car but you want to drive it → try it out for a year paying the depreciation, if you like it buy it, if you don’t simply give the car back and walk away."
            />
          </div>
        </div>
      </section>
      <section id="car-calculator" className="pt-24 pb-24 bg-accentTwo">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="font-sans text-5xl font-bold leading-[4rem] md:text-center">
            Check it our for yourself
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
