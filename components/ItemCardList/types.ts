import { Product } from "@prisma/client"

export type ItemCardListProps = {
  items: Product[]
  onUpdateItem?: (itemId: string, itemData: unknown) => void
}

export type PresentationalItemCardListProps = ItemCardListProps

export type PresentationalItemCardListQuickEditProps = {
  items: Product[]
  onUpdateItem: (itemId: string, itemData: unknown) => void
}