export type SellerLocation = {
  lat: number,
  lng: number,
  address: string
}

export type SellerProfileProps = {
  name: string,
  contactInfo: string,
  locations: SellerLocation[]
}