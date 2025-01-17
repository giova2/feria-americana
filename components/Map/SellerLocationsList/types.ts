import { SellerLocation } from "@/components/SellerProfile/types"

export type SellerLocationsListProps = {
  locations: SellerLocation[]
  selectedLocation: SellerLocation
  onSelectLocation: (address: string) => void
}