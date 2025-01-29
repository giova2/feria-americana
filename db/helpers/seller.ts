import { prisma, queryDBHandler } from "@prisma/db";

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

export const getSellerInformation = async (sellerId: string) => {
  const query = async () => {
    const seller = await prisma.seller.findFirst({
      where: {
        id: sellerId
      }
    })
    const locations = await prisma.seller_locations.findMany({
      where: {
        seller_id: sellerId
      }
    })

    const products = await prisma.seller_product.findMany({
      where: {
        seller_id: sellerId
      }
    })
    return { ...seller, locations, products }
  }
  return await queryDBHandler(query)
}
