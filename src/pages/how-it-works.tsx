import { graphql, HeadFC, PageProps } from 'gatsby';
import * as React from 'react';
import HowItWorksLayout from '../components/HowItWorksLayout';

const HowItWorks: React.FC<PageProps> = (props: any) => {
  return (
    <div>
      <HowItWorksLayout props={props}/>
    </div>
  );
};

export const Head: HeadFC = () => <title>How It Works</title>;

export default HowItWorks;

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