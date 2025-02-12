import React from 'react'
import { PresentationalItemCardListQuickEditProps } from './types'
import ItemCardQuickEdit from '../ItemCard/ItemCardQuickEdit/ItemCardQuickEdit';

const PresentationalItemCardListQuickEdit: React.FC<PresentationalItemCardListQuickEditProps> = ({
  items,
  onUpdateItem
}) => (items.map((item) => (
    <ItemCardQuickEdit 
      key={item.id} 
      {...item} 
      onUpdateItem={onUpdateItem}
    />
  ))
)

export { PresentationalItemCardListQuickEdit as default }