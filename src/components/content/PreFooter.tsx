import { Link } from 'gatsby-link';
import * as React from 'react';

const PreFooter = () => {
  return (
    <div className="mt-8 mx-auto">
      <h1 className="font-serif font-bold text-center text-3xl mx-auto">
        I'm ready! What will my monthly payments be?
      </h1>
      <div className="font-serif text-xl mt-8 text-center">
        Have a look at our{' '}
        <Link to={'/calculator'}>
          <span className="underline">calculator</span>
        </Link>{' '}
        page or alternatively{' '}
        <Link to={'/contact'}>
          <span className="underline">contact us</span>
        </Link>
      </div>
    </div>
  );
};

export default PreFooter;
