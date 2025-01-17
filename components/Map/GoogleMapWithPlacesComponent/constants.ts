import { Libraries } from "@react-google-maps/api";

export const CONTAINER_STYLE = {
  width: '100%',
  height: '400px'
};

export const LIBRARIES = ["places"] as Libraries

export const NEXT_PUBLIC_GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ''

export const ICON = (path: google.maps.SymbolPath) => ({
  path,
  scale: 6,
  fillColor: 'white',
  fillOpacity: 1,
  strokeColor: 'black',
  strokeWeight: 0.5,
})