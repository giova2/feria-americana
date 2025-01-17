import React from 'react'
import { Form, Input } from '@nextui-org/react';
import { PrimaryButton } from '../ui/button';

// type SellFormProps = {
  
// }

const SellForm = () => {
  return(
    <Form className="space-y-4">
      <Input placeholder="Item Name" />
      <Input placeholder="Description" />
      <Input placeholder="Price" type="number" />
      <Input type="file" />
      <PrimaryButton type="submit" className="w-full">List Item</PrimaryButton>
    </Form>
  );
}

export { SellForm as default }

