import { Combobox, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import * as React from "react";
import { Fragment } from "react";

const StepOne: React.FC<PageProps> = (props) => {
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
    setFormError,
  } = props;

  return (
    <div className="w-full flex flex-col items-center justify-start px-3 pt-3">
      <h2 className="font-serif text-3xl">I want a new</h2>
      <div className="mt-8">
        <Combobox
          className="w-[250px] bg-primary rounded-3xl mb-4"
          value={selectedMake}
          onChange={(make) => {
            setSelectedMake(make);
            setSelectedModel("");
            setSelectedDescription("");
            setFormError(false);
          }}
        >
          <div className="relative mt-1">
            <div className="z-50 relative cursor-default overflow-hidden rounded-3xl bg-primary text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
              <Combobox.Input
                className="w-full border-none py-4 pl-5 pr-10 text-base leading-5 bg-primary placeholder:text-white placeholder:opacity-70 text-white focus:ring-0"
                displayValue={(make: string) => make}
                onChange={(event) => setMakeQuery(event.target.value)}
                placeholder="Make"
              />
              <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-4">
                <ChevronDownIcon
                  className="h-5 w-5 text-white"
                  aria-hidden="true"
                />
              </Combobox.Button>
            </div>
            <Transition
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
              afterLeave={() => setMakeQuery("")}
            >
              <Combobox.Options className="z-40 absolute pt-10 -mt-8 max-h-60 w-full overflow-auto rounded-b-3xl bg-accent py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {filteredMakes.length === 0 && makeQuery !== "" ? (
                  <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                    Nothing found.
                  </div>
                ) : (
                  filteredMakes.map((make: string) => (
                    <Combobox.Option
                      key={make}
                      className={({ active }) =>
                        `relative cursor-default select-none py-2 pl-5 pr-4 ${active ? "bg-primary text-white" : "text-gray-900"
                        }`
                      }
                      value={make}
                    >
                      {({ selected, active }) => (
                        <>
                          <span
                            className={`block truncate ${selected ? "font-medium" : "font-normal"
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
        {selectedMake === "" ? null : (
          <Combobox
            className="w-[250px] bg-primary rounded-3xl mb-4"
            value={selectedModel}
            onChange={(model) => {
              setSelectedModel(model);
              setSelectedDescription("");
              setFormError(false);
            }}
          >
            <div className="relative mt-1">
              <div className="z-30 relative cursor-default overflow-hidden rounded-3xl bg-primary text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
                <Combobox.Input
                  className="w-full border-none py-4 pl-5 pr-10 text-base leading-5 bg-primary placeholder:text-white placeholder:opacity-70 text-white focus:ring-0"
                  displayValue={(model: string) => model}
                  onChange={(event) => setModelQuery(event.target.value)}
                  placeholder="Model"
                />
                <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-4">
                  <ChevronDownIcon
                    className="h-5 w-5 text-white"
                    aria-hidden="true"
                  />
                </Combobox.Button>
              </div>
              <Transition
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
                afterLeave={() => setModelQuery("")}
              >
                <Combobox.Options className="z-20 absolute pt-10 -mt-8 max-h-60 w-full overflow-auto rounded-b-3xl bg-accent py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                  {filteredModels.length === 0 && modelQuery !== "" ? (
                    <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                      Nothing found.
                    </div>
                  ) : (
                    filteredModels.map((model) => (
                      <Combobox.Option
                        key={model}
                        className={({ active }) =>
                          `relative cursor-default select-none py-2 pl-5 pr-4 ${active ? "bg-primary text-white" : "text-gray-900"
                          }`
                        }
                        value={model}
                      >
                        {({ selected, active }) => (
                          <>
                            <span
                              className={`block truncate ${selected ? "font-medium" : "font-normal"
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
        )}
        {selectedModel === "" ? null : (
          <Combobox
            className="w-[250px] bg-primary rounded-3xl mb-4"
            value={selectedDescription}
            onChange={(description) => {
              setSelectedDescription(description);
              setFormError(false);
            }}
          >
            <div className="relative mt-1">
              <div className="z-10 relative cursor-default overflow-hidden rounded-3xl bg-primary text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
                <Combobox.Input
                  className="w-full border-none py-4 pl-5 pr-10 text-base leading-5 bg-primary placeholder:text-white placeholder:opacity-70 text-white focus:ring-0"
                  displayValue={(description: string) => description}
                  placeholder="Description"
                  onChange={(event) => setDescriptionQuery(event.target.value)}
                />
                <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-4">
                  <ChevronDownIcon
                    className="h-5 w-5 text-white"
                    aria-hidden="true"
                  />
                </Combobox.Button>
              </div>
              <Transition
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
                afterLeave={() => setDescriptionQuery("")}
              >
                <Combobox.Options className="absolute pt-10 -mt-8 max-h-60 w-full overflow-auto rounded-b-3xl bg-accent py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                  {filteredDescriptions.length === 0 &&
                    descriptionQuery !== "" ? (
                    <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                      Nothing found.
                    </div>
                  ) : (
                    filteredDescriptions.map((description: string) => (
                      <Combobox.Option
                        key={description}
                        className={({ active }) =>
                          `relative cursor-default select-none py-2 pl-5 pr-4 ${active ? "bg-primary text-white" : "text-gray-900"
                          }`
                        }
                        value={description}
                      >
                        {({ selected, active }) => (
                          <>
                            <span
                              className={`block truncate ${selected ? "font-medium" : "font-normal"
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
        )}
        {formError ? (
          <div className="mt-2 text-center text-red-400">
            {" "}
            Please select an option{" "}
          </div>
        ) : null}
      </div>
      {selectedMake && selectedModel && selectedDescription &&
        <button className="h-full mt-8 rounded-3xl py-3 px-8 bg-primary" onClick={() => props.nextStep()}>
          <span className="font-bold text-white">Calculate</span>
        </button>}
    </div>
  );
};

export default StepOne;
