import * as React from 'react';
import { Fragment } from 'react';

import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/20/solid';

const MobileFormNav: React.FC<PageProps> = (props) => {
  const {
    selectedMake,
    selectedModel,
    selectedDescription,
    setFormError,
    fetchCarFinanceInfo
  } = props;

  function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
  }

  const next = () => {
    if (props.currentStep === 1) {
      if (
        selectedMake === '' ||
        selectedModel === '' ||
        selectedDescription === ''
      ) {
        setFormError(true);
      } else {
        props.nextStep();
      }
    } else if (props.currentStep === 3) {
      props.nextStep();
      fetchCarFinanceInfo(selectedMake, selectedModel, selectedDescription);
    } else {
      props.nextStep();
    }
  };

  return (
    <div
      className={
        classNames(props.currentStep !== 4 ? 'h-[50px]' : 'hidden') + 'w-64'
      }
    >
      {props.currentStep !== 4 ? (
        <div className="flex h-full bg-black opacity-25">
          {props.currentStep === 1 ? (
            <Fragment>
              <button
                onClick={() => next()}
                className="w-full flex justify-center items-center"
              >
                <ArrowRightIcon className="h-10 w-10 fill-white" />
              </button>
            </Fragment>
          ) : (
            <Fragment>
              <button className="w-1/2 flex justify-center items-center">
                <ArrowLeftIcon
                  onClick={() => props.previousStep()}
                  className="h-10 w-10 fill-white"
                />
              </button>
              <button
                onClick={() => next()}
                className="w-1/2 flex justify-center items-center"
              >
                <ArrowRightIcon className="h-10 w-10 fill-white" />
              </button>
            </Fragment>
          )}
        </div>
      ) : null}
    </div>
  );
};

export default MobileFormNav;
