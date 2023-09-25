import type { HeadFC, PageProps } from 'gatsby';
import { graphql } from 'gatsby';
import * as React from 'react';

//Images

import CalculatorDesktopLayout from '../components/CalculatorDesktopLayout';
import CalculatorMobileLayout from '../components/CalculatorMobileLayout';

const CalculatorPage: React.FC<PageProps> = (props: any) => {
  return (
    <div>
      <div className="sm:hidden">
        <CalculatorMobileLayout {...props} />
      </div>
      <div className="hidden sm:block">
        <CalculatorDesktopLayout {...props} />
      </div>
    </div>
  );
};

export default CalculatorPage;

export const Head: HeadFC = () => <title>PCP Calculator</title>;

export const query = graphql`
  {
    allSqliteCarRecords {
      nodes {
        id
        ModelCode
        Make
        Model
        Description
        CleanCarFeebate
        RRPincGST
        _48_50000km
        _48_40000km
        _48_30000km
        _48_20000km
        _48_10000km
        _36_50000km
        _36_40000km
        _36_20000km
        _36_30000km
        _36_10000km
        _24_50000km
        _24_40000km
        _24_30000km
        _24_20000km
        _24_10000km
        _12_40000km
        _12_50000km
        _12_30000km
        _12_10000km
        _12_20000km
      }
      distinct(field: { Make: SELECT })
    }
  }
`;
