import { Product } from '@prisma/client'
import { BaseSyntheticEvent } from 'react'
import { UseFormRegister, FieldErrors } from 'react-hook-form'

export type ItemCardQuickEditFormProps = {
  description: Product['description']
  name: Product['name']
  price: Product['price']
}

export type ItemCardQuickEditProps = Product & {
  onUpdateItem: (itemId: string, itemData: unknown) => void
}

export type PresentationalItemCardQuickEditProps = Product & {
  isEditingDescription: boolean,
  isEditingName: boolean,
  isEditingPrice: boolean,
  onDescriptionClick: () => void
  onDescriptionBlur: (e?: BaseSyntheticEvent) => Promise<void>
  onDescriptionKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void
  onNameClick: () => void
  onNameBlur: (e?: BaseSyntheticEvent) => Promise<void>
  onNameKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void
  onPriceClick: () => void
  onPriceBlur: (e?: BaseSyntheticEvent) => Promise<void>
  onPriceKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void
  onSubmit: () => void
  register: UseFormRegister<ItemCardQuickEditFormProps> // TODO: Change this to reduce the scope to the actual values that should be editable
  errors: FieldErrors<ItemCardQuickEditFormProps> // TODO: Change this to reduce the scope to the actual values that should be editable
}