'use client'
import React from 'react';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import Loader from '../../Loader';
import { GoogleMapWithPlacesComponentProps } from './types';
import GoogleAutocomplete from '../GoogleAutocomplete/GoogleAutocomplete';
import { CONTAINER_STYLE, ICON, LIBRARIES, NEXT_PUBLIC_GOOGLE_MAPS_API_KEY } from './constants';
import { isSameLocation } from './utils';

const GoogleMapWithPlacesComponent: React.FC<GoogleMapWithPlacesComponentProps> = ({ 
  locations,
  selectedLocation,
  onPlaceChangedAutocomplete
} ) => {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-with-places",
    googleMapsApiKey: NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    libraries: LIBRARIES
  });

  const center = {
    lat: locations.reduce((acc, { lat }) => (acc + lat), 0)/(locations.length || 1), 
    lng: locations.reduce((acc, { lng }) => (acc + lng), 0)/(locations.length || 1), 
  };
  
  if(!isLoaded){
    return <Loader className='h-[400px]'/>
  }
  const SELECTED_ICON = {
    ...ICON(google.maps.SymbolPath.BACKWARD_CLOSED_ARROW),
    fillColor: 'white',
    fillOpacity: 1,
    strokeColor: 'blue',
    strokeWeight: 2,
  }
  
  const NORMAL_ICON = ICON(google.maps.SymbolPath.BACKWARD_CLOSED_ARROW)
  
  return (
    <>
      <GoogleAutocomplete onPlaceChangedAutocomplete={ onPlaceChangedAutocomplete } />
      <GoogleMap
        mapContainerStyle={ CONTAINER_STYLE }
        center={ center }
        zoom={ 6 }
      >
        {locations.map((location) => (
          <Marker 
            key={`${location.lat}${location.lng}`} 
            position={location} 
            icon={isSameLocation(location, selectedLocation) ? SELECTED_ICON : NORMAL_ICON}/>
        ))}
      </GoogleMap>
    </>
  );
};

export default GoogleMapWithPlacesComponent;