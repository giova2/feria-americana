import { Form, Input } from '@heroui/react';
import React from 'react'
import { PrimaryButton } from './ui/button';
import { Search } from 'lucide-react';

const TopSection: React.FC = () => {
  return(
    <div className="container px-4 md:px-6">
      <div className="flex flex-col space-y-4 text-center">
        <div className="flex flex-col items-start space-y-2">
          <h1 className="text-left text-3xl font-bold tracking-tighter sm:text-5xl">
            Connect, Shop, and Make a Difference
          </h1>
          <p className="text-left max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Buy, sell, or donate clothes while connecting with fashion enthusiasts in your area.
          </p>
        </div>
        <div className="w-full max-w-sm space-y-2">
          <Form className="flex">
            <Input variant="bordered" className="flex-1" placeholder="Search for items or events" type="text" />
            <PrimaryButton type="submit">
              <Search className="h-4 w-4 mr-2" />
              Search
            </PrimaryButton>
          </Form>
        </div>
      </div>
    </div>
  );
}

export { TopSection as default }