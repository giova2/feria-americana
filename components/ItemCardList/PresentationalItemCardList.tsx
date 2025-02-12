import React from 'react'
import { PresentationalItemCardListProps } from './types'
import ItemCard from '../ItemCard/ItemCard';

const PresentationalItemCardList: React.FC<PresentationalItemCardListProps> = ({ items }) => {
  return(items.map((item) => (
      <ItemCard
        key={item.id} 
        {...item} 
      />
    ))
  );
}

export { PresentationalItemCardList as default }