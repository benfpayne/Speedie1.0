import { Listbox, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import * as React from 'react';
import { Fragment } from 'react';

const StepThree: React.FC<PageProps> = (props) => {
  const { kilometers, setKilometers, distance } = props;

  const [hasMounted, setHasMounted] = React.useState(false);
  React.useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return null;
  }

  return (
    <div className="w-full flex flex-col items-center px-3 pt-3">
      <h2 className="font-serif text-3xl">For</h2>
      <div className="relative mt-8 rounded-3xl shadow-sm">
        <Listbox
          className="w-[250px] bg-primary rounded-3xl z-10"
          value={kilometers}
          onChange={setKilometers}
        >
          <div className="relative mt-1">
            <Listbox.Button className="z-10 relative w-full cursor-default rounded-3xl bg-primary py-4 pl-5 pr-10 text-left focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
              <span className="block truncate text-white text-base">
                {kilometers.name}
              </span>
              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4">
                <ChevronDownIcon
                  className="h-5 w-5 text-white"
                  aria-hidden="true"
                />
              </span>
            </Listbox.Button>
            <Transition
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute pt-10 -mt-8 max-h-60 w-full overflow-auto rounded-b-3xl bg-accent py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {distance.map((distance, distanceIdx) => (
                  <Listbox.Option
                    key={distanceIdx}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-5 pr-4 ${
                        active ? 'bg-primary text-white' : 'text-gray-900'
                      }`
                    }
                    value={distance}
                  >
                    {({ selected }) => (
                      <>
                        <span
                          className={`block truncate ${
                            selected ? 'font-medium' : 'font-normal'
                          }`}
                        >
                          {distance.name}
                        </span>
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </Listbox>
      </div>
    </div>
  );
};

export default StepThree;
