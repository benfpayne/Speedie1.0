import { Combobox, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import * as React from 'react';
import { Fragment } from 'react';

const ProgressiveForm = (props) => {
  const {
    filteredMakes,
    filteredModels,
    filteredDescriptions,
    makeQuery,
    setMakeQuery,
    modelQuery,
    setModelQuery,
    descriptionQuery,
    setDescriptionQuery,
    selectedMake,
    setSelectedMake,
    selectedModel,
    setSelectedModel,
    selectedDescription,
    setSelectedDescription,
    formError,
    setFormError
  } = props;

  return (
    <div className="flex justify-center py-8 z-10">
      <div className="relative min-w-[320px] w-[320px] mx-16 flex flex-col">
        <Fragment>
          <h1 className="font-serif text-3xl mb-8">I want a new</h1>
          <Combobox
            className="w-[300px] bg-primary rounded-e-3xl mb-8"
            value={selectedMake}
            onChange={(make) => {
              setSelectedMake(make);
              setSelectedModel('');
              setSelectedDescription('');
              setFormError(false);
            }}
          >
            <div className="relative mt-1">
              <div className="z-50 relative cursor-default overflow-hidden rounded-e-3xl bg-primary text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
                <Combobox.Button as="div">
                  <Combobox.Input
                    className="w-full border-none py-4 pl-5 pr-10 text-base leading-5 bg-primary placeholder:text-white placeholder:opacity-70 text-white focus:ring-0"
                    displayValue={(make: string) => make}
                    onChange={(event) => setMakeQuery(event.target.value)}
                    placeholder="Car Brand"
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-4">
                    <ChevronDownIcon
                      className="h-5 w-5 text-white"
                      aria-hidden="true"
                    />
                  </div>
                </Combobox.Button>
              </div>
              <Transition
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
                afterLeave={() => setMakeQuery('')}
              >
                <Combobox.Options className="z-40 absolute pt-10 -mt-8 max-h-60 w-full overflow-auto rounded-b-3xl bg-accent py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                  {filteredMakes.length === 0 && makeQuery !== '' ? (
                    <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                      Nothing found.
                    </div>
                  ) : (
                    filteredMakes.map((make: string) => (
                      <Combobox.Option
                        key={make}
                        className={({ active }) =>
                          `relative cursor-default select-none py-2 pl-5 pr-4 ${
                            active ? 'bg-primary text-white' : 'text-gray-900'
                          }`
                        }
                        value={make}
                      >
                        {({ selected, active }) => (
                          <>
                            <span
                              className={`block truncate ${
                                selected ? 'font-medium' : 'font-normal'
                              }`}
                            >
                              {make}
                            </span>
                          </>
                        )}
                      </Combobox.Option>
                    ))
                  )}
                </Combobox.Options>
              </Transition>
            </div>
          </Combobox>
          <Combobox
            className="w-[300px] bg-primary rounded-e-3xl mb-8"
            value={selectedModel}
            onChange={(model) => {
              setSelectedModel(model);
              setSelectedDescription('');
              setFormError(false);
            }}
          >
            <div className={`relative mt-1 ${selectedMake ? '' : 'disabled'}`}>
              <div className="z-30 relative cursor-default overflow-hidden rounded-e-3xl bg-primary text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
                <Combobox.Button>
                  <Combobox.Input
                    className="w-full border-none py-4 pl-5 pr-10 text-base leading-5 bg-primary placeholder:text-white placeholder:opacity-70 text-white focus:ring-0"
                    displayValue={(model: string) => model}
                    onChange={(event) => setModelQuery(event.target.value)}
                    placeholder="Model"
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-4">
                    <ChevronDownIcon
                      className="h-5 w-5 text-white"
                      aria-hidden="false"
                    />
                  </div>
                </Combobox.Button>
              </div>
              <Transition
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
                afterLeave={() => setModelQuery('')}
              >
                <Combobox.Options className="z-20 absolute pt-10 -mt-8 max-h-60 w-full overflow-auto rounded-b-3xl bg-accent py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                  {filteredModels.length === 0 && modelQuery !== '' ? (
                    <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                      Nothing found.
                    </div>
                  ) : (
                    filteredModels.map((model) => (
                      <Combobox.Option
                        key={model}
                        className={({ active }) =>
                          `relative cursor-default select-none py-2 pl-5 pr-4 ${
                            active ? 'bg-primary text-white' : 'text-gray-900'
                          }`
                        }
                        value={model}
                      >
                        {({ selected, active }) => (
                          <>
                            <span
                              className={`block truncate ${
                                selected ? 'font-medium' : 'font-normal'
                              }`}
                            >
                              {model}
                            </span>
                          </>
                        )}
                      </Combobox.Option>
                    ))
                  )}
                </Combobox.Options>
              </Transition>
            </div>
          </Combobox>
          <Combobox
            className="w-[300px] bg-primary rounded-e-3xl mb-4"
            value={selectedDescription}
            onChange={(description) => {
              setSelectedDescription(description);
              setFormError(false);
            }}
          >
            <div className={`relative mt-1 ${selectedModel ? '' : 'disabled'}`}>
              <div className="z-10 relative cursor-default overflow-hidden rounded-e-3xl bg-primary text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
                <Combobox.Button>
                  <Combobox.Input
                    className="w-full border-none py-4 pl-5 pr-10 text-base leading-5 bg-primary placeholder:text-white placeholder:opacity-70 text-white focus:ring-0"
                    displayValue={(description: string) => description}
                    placeholder="Description"
                    onChange={(event) =>
                      setDescriptionQuery(event.target.value)
                    }
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-4">
                    <ChevronDownIcon
                      className="h-5 w-5 text-white"
                      aria-hidden="true"
                    />
                  </div>
                </Combobox.Button>
              </div>
              <Transition
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
                afterLeave={() => setDescriptionQuery('')}
              >
                <Combobox.Options className="absolute pt-10 -mt-8 max-h-60 w-full overflow-auto rounded-b-3xl bg-accent py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                  {filteredDescriptions.length === 0 &&
                  descriptionQuery !== '' ? (
                    <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                      Nothing found.
                    </div>
                  ) : (
                    filteredDescriptions.map((description: string) => (
                      <Combobox.Option
                        key={description}
                        className={({ active }) =>
                          `relative cursor-default select-none py-2 pl-5 pr-4 ${
                            active ? 'bg-primary text-white' : 'text-gray-900'
                          }`
                        }
                        value={description}
                      >
                        {({ selected, active }) => (
                          <>
                            <span
                              className={`block truncate ${
                                selected ? 'font-medium' : 'font-normal'
                              }`}
                            >
                              {description}
                            </span>
                          </>
                        )}
                      </Combobox.Option>
                    ))
                  )}
                </Combobox.Options>
              </Transition>
            </div>
          </Combobox>
          {formError ? (
            <div className="mt-2 text-center text-red-400">
              {' '}
              Please select an option{' '}
            </div>
          ) : null}
        </Fragment>
      </div>
    </div>
  );
};

export default ProgressiveForm;
