import { LatLng } from "./types";

export const isSameLocation = (locationA: LatLng, locationB: LatLng) => (
  locationA.lat === locationB.lat &&
  locationA.lng === locationB.lng

)
