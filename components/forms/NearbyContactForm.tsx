import { Form, Input } from '@heroui/react';
import React from 'react'
import { PrimaryButton } from '../ui/button';

const NearByContactForm: React.FC = (props) => {
  return(
    <Form className="space-y-4">
      <Input placeholder="Your Location" />
      <PrimaryButton type="submit" className="w-full">Find Connections</PrimaryButton>
    </Form>
  );
}

export { NearByContactForm as default }