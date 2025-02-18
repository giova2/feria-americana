import { prisma, queryDBHandler } from "@prisma/db";
import { SellerInformationQuery } from "./types";

export const getSeller = async (sellerId: string) => {
  const query = async () => {
    const seller = await prisma.seller.findFirst({
      where: {
        id: sellerId
      }
    })
    return seller
  }
  return await queryDBHandler(query)
}


export const getSellerFromUserId = async (userId: string) => {
  const query = async () => {
    const seller = await prisma.seller.findFirst({
      where: {
        user_id: userId
      }
    })
    return seller
  }
  return await queryDBHandler(query)
}


export const getSellerInformation = async (sellerId: string): Promise<SellerInformationQuery> => {
  const query = async () => {
    const seller = await prisma.seller.findFirst({
      where: {
        id: sellerId
      }
    })
    const locations = await prisma.sellerLocations.findMany({
      where: {
        seller_id: sellerId
      }
    })

    const products = await prisma.product.findMany({
      where: {
        seller_id: sellerId
      }
    })
    return { seller, locations, products }
  }
  return await queryDBHandler<Promise<SellerInformationQuery>>(query)
}
