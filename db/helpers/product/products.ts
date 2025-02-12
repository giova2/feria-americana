import { prisma, queryDBHandler } from "@prisma/db";
import { ItemCardQuickEditFormProps } from "@/components/ItemCard/ItemCardQuickEdit/types";

export const quickUpdateProduct = async (itemId: string, data: ItemCardQuickEditFormProps) => {
  const query = async () => {
    const product = await prisma.product.update({
      where: {
        id: itemId
      },
      data
    })
    return product
  }
  return await queryDBHandler(query)
}
