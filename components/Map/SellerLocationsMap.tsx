'use client'
import React, { useState } from 'react'
import { SellerLocation } from '../SellerProfile/types';
import { VENDOR_LOCATIONS } from '@/mocks/locations';
import GoogleMapWithPlacesComponent from './GoogleMapWithPlacesComponent/GoogleMapWithPlacesComponent';
import SellerLocationsList from './SellerLocationsList/SellerLocationsList';

type SellerLocationsMapProps = {
  locations?: SellerLocation[]
}

const SellerLocationsMap: React.FC<SellerLocationsMapProps> = ({ 
  locations = VENDOR_LOCATIONS 
}) => {
  const [locationsState, setLocationsState] = useState<SellerLocation[]>(locations)
  const [selectedLocation, setSelectedLocation] = useState(locations[0])

  const onPlaceChangedAutocomplete = (placesAutocomplete?: google.maps.places.Autocomplete) => {
    const location = placesAutocomplete?.getPlace()?.geometry?.location
    const formattedAddress = placesAutocomplete?.getPlace().formatted_address

    setLocationsState((prevLocations) => (location ? [
      ...prevLocations,
      { lat: location.lat(), lng: location.lng(), address: formattedAddress || '' }
    ] : [...prevLocations]))
  }

  const handleSelectLocation = (address: string) => {
    const location = locationsState.find(({ address: locationAddress }) => locationAddress === address)
    if(location){
      setSelectedLocation(location)
    } 
  }
  
  return(
    <>
      <GoogleMapWithPlacesComponent
        selectedLocation={selectedLocation}
        locations={locationsState}
        onPlaceChangedAutocomplete={onPlaceChangedAutocomplete}
      />
      <SellerLocationsList 
        locations={locationsState}
        selectedLocation={selectedLocation}
        onSelectLocation={handleSelectLocation}
      />
    </>

  );
}

export { SellerLocationsMap as default }