import { Form, Input } from '@nextui-org/react';
import React from 'react'
import { PrimaryButton } from '../ui/button';

const FashionEventForm: React.FC = (props) => {
  return(
    <Form className="space-y-4">
      <Input placeholder="Event Name" />
      <Input placeholder="Location" />
      <Input type="date" />
      <PrimaryButton type="submit" className="w-full">Create Event</PrimaryButton>
    </Form>
  );
}

export { FashionEventForm as default }