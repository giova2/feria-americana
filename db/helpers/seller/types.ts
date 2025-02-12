import { Product, Seller, SellerLocations } from '@prisma/client';

export type SellerInformationQuery = {
  seller: Seller | null
  locations: SellerLocations[]
  products: Product[]
}