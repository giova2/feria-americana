'use client'
import React, { useState } from 'react'
import { SellerProductsFormProps } from './types'
import Title from '@/components/ui/title';
import ItemCardList from '@/components/ItemCardList';
import { submitProductsQuickUpdateForm } from './server-action';

const SellerProductsForm: React.FC<SellerProductsFormProps> = ({ products }) => {
  const [items, setItems] = useState([ ...products]);

  const handleItemUpdate = async (itemId: string, updatedData) => {
    // Simulate API call - replace with your actual API call
    console.log(`Updating record ${itemId} with data:`, updatedData);
    // Example API call using fetch:
    // const response = await fetch(`/api/records/${recordId}`, {
    //   method: 'PUT' or 'PATCH',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(updatedData),
    // });
    // if (!response.ok) {
    //   throw new Error(`HTTP error! status: ${response.status}`);
    // }
    // const updatedRecord = await response.json();
    // After successful API call, update local state (records) to reflect changes
    const formData = new FormData();
    formData.append('name', updatedData.name);
    formData.append('description', updatedData.description);
    formData.append('price', updatedData.price);
    formData.append('id', itemId);

    const response = await submitProductsQuickUpdateForm(null, formData);

    if(response?.success) { 
      setItems(currentitems =>
        currentitems.map(item => item.id === itemId ? { ...item, ...updatedData } : item)
      );
    }else{
      console.log('TODO: handle edge cases')
    }
  };

  return(
    <>
      <Title>Quick edit cards</Title>
      <ItemCardList items={items} onUpdateItem={handleItemUpdate} />
    </>
  );
}

export { SellerProductsForm as default }