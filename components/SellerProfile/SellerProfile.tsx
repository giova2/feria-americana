import React from 'react'
import { SellerProfileProps } from './types'
import SellerLocationsMap from '../Map/SellerLocationsMap';
import SellerBasicInfoForm from '../forms/SellerBasicInfoForm/SellerBasicInfoForm';
import SellerProductsForm from '../forms/SellerProductsForm/SellerProductsForm';

const SellerProfile: React.FC<SellerProfileProps> = ({ seller, locations, products }) => {
  return(<>
    <SellerBasicInfoForm seller={seller}/>
    <SellerLocationsMap locations={locations.map(({lat, lng, address}) => ({lat: parseFloat(lat), lng: parseFloat(lng), address}))}/>
    <SellerProductsForm products={products}/>
  </>
  );
}

export { SellerProfile as default }