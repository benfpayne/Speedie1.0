import * as React from 'react';

export default function NavigationButton(props : any) {
  const { title, href } = props;
  return (
    <div>
      <a
        href={href}
        className="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-white bg-primary rounded-3xl hover:bg-tan focus:ring-4 focus:ring-blue-300"
      >
        {title}
        <svg
          className="w-3.5 h-3.5 ml-2"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 14 10"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M1 5h12m0 0L9 1m4 4L9 9"
          />
        </svg>
      </a>
    </div>
  );
}

// See https://stackoverflow.com/questions/21715162/when-should-i-use-a-button-button-or-a-link-a-in-html#:~:text=use%20a%20when%20you,use%20for%20navigation.
// tldr;  use <a> for links and navigation between page / views.
// use <button> for actions like submitting a form.
