import React from 'react'
// import Presentational from './Presentational'
import { SellerProfileProps } from './types'
import SellerLocationsMap from '../Map/SellerLocationsMap';

const SellerProfile: React.FC<SellerProfileProps> = (props) => {
  return(
    <SellerLocationsMap />
  );
}

export { SellerProfile as default }