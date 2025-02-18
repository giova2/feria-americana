import { Form, Input } from '@heroui/react';
import React from 'react'
import { PrimaryButton } from '../ui/button';

const FashionEventForm: React.FC = (props) => {
  return(
    <Form className="space-y-4">
      <Input placeholder="Event Name" />
      <Input placeholder="Location" />
      <Input type="date" />
      <PrimaryButton type="submit" addClassName="w-full">Create Event</PrimaryButton>
    </Form>
  );
}

export { FashionEventForm as default }