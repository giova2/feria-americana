import React from 'react'
import PresentationalItemCardList from './PresentationalItemCardList'
import { ItemCardListProps } from './types'
import PresentationalItemCardListQuickEdit from './PresentationalItemCardListQuickEdit'

const ItemCardList: React.FC<ItemCardListProps> = ({ items, onUpdateItem }) => {
  if(onUpdateItem){
    return(<PresentationalItemCardListQuickEdit items={items} onUpdateItem={onUpdateItem}/>)
  }
  return(<PresentationalItemCardList items={items} />);
}

export { ItemCardList as default }