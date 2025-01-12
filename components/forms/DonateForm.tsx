import React from 'react'
import { Form, Input } from '@nextui-org/react';
import { PrimaryButton } from '../ui/button';

const DonateForm: React.FC = (props) => {
  return(
    <Form className="space-y-4">
      <Input placeholder="Item Description" />
      <Input placeholder="Condition" />
      <Input type="file" />
      <PrimaryButton type="submit" className="w-full">Offer Donation</PrimaryButton>
    </Form>
  );
}

export { DonateForm as default }