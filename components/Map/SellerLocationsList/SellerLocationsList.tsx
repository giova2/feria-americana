'use client'
import React from 'react'
import { SellerLocationsListProps } from './types'
import PresentationalListBox from './PresentationalListBox';

const SellerLocationsList: React.FC<SellerLocationsListProps> = ({
  locations,
  selectedLocation,
  onSelectLocation
}) => {
  
  const handleDeleteLocation = (address: string) => {
    console.log('TODO: delete the location for this seller ', address)
  }

  return(
    <PresentationalListBox 
      locations={locations}
      selectedLocation={selectedLocation}
      onSelectLocation={onSelectLocation}
      onDelete={handleDeleteLocation}
    />
  );
}

export { SellerLocationsList as default }