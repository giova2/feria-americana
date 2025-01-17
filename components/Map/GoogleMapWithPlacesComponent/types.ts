import { GoogleAutocompleteProps } from "../GoogleAutocomplete/types"

export type LatLng ={
  lat: number, 
  lng: number,
}

export type GoogleMapWithPlacesComponentProps = {
  locations: LatLng[]
  selectedLocation: LatLng
} & GoogleAutocompleteProps