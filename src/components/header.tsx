import { Dialog } from '@headlessui/react';
import { Bars2Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { Link, type PageProps } from 'gatsby';
import * as React from 'react';
import { useState } from 'react';

const Header: React.FC<PageProps> = (props) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigation = [
    { name: 'about', href: '/about' },
    { name: 'calculator', href: '/calculator' },
    { name: 'contact', href: '/contact' },
    { name: 'faqs', href: '/faqs' },
    { name: 'how it works', href: '/how-it-works' }
  ];

  function classNames(...classes: any) {
    return classes.filter(Boolean).join(' ');
  }

  return (
    <header className="sticky top-0 z-50 bg-white">
      <nav
        className="flex justify-between md:justify-start mx-auto max-w-7xl items-end p-6 px-8 lg:px-12"
        aria-label="Global"
      >
        <Link to="/">
          <span className="sr-only">speedie</span>
          <h2 className="font-serif transition-opacity duration-300 hover:opacity-50 text-2xl lg:text-4xl font-bold pr-20">
            Speedie
          </h2>
        </Link>
        <div className="flex md:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Bars2Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <div className="hidden md:flex sm:gap-x-12">
          {navigation.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className={classNames(
                'transition-opacity duration-300 hover:opacity-50 text-xl leading-6',
                item.href + '/' === 'props.location.pathname'
                  ? 'text-primary'
                  : 'text-gray-900'
              )}
            >
              {item.name}
            </Link>
          ))}
        </div>
      </nav>
      <Dialog
        as="div"
        className="md:hidden"
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
      >
        <div className="fixed inset-0 z-50" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-8 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <Link to="/">
              <span className="sr-only">speedie</span>
              <h2 className="font-serif transition-opacity duration-300 hover:opacity-50 text-2xl lg:text-4xl font-bold pr-20">
                Speedie
              </h2>
            </Link>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className="px-2.5 block rounded-lg py-4 text-xl leading-7 text-gray-900 hover:bg-gray-50"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  );
};

export default Header;
