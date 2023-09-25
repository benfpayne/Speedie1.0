import type { HeadFC, PageProps } from 'gatsby';
import { graphql } from 'gatsby';
import * as React from 'react';

//Images
import HomePageDesktopLayout from '../components/HomePageDesktopLayout';
import HomePageMobileLayout from '../components/HomePageMobileLayout';

const IndexPage: React.FC<PageProps> = (props: any) => {
  return (
    <div>
      <div className="sm:hidden">
        <HomePageMobileLayout {...props} />
      </div>
      <div className="hidden sm:block">
        <HomePageDesktopLayout {...props} />
      </div>
    </div>
  );
};

export default IndexPage;

export const Head: HeadFC = () => <title>Speedie Home Page</title>;

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
