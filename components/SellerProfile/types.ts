import { SellerInformationQuery } from "@/db/helpers/seller/types"

export type SellerLocation = {
  lat: number,
  lng: number,
  address: string
}

export type SellerProfileProps = SellerInformationQuery