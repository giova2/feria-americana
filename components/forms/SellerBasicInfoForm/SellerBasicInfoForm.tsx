'use client'

import React from 'react'
import { SellerBasicInfoFormProps } from './types'
import { Form, Input } from '@heroui/react';
import { PrimaryButton } from '@/components/ui/button';
import { submitForm } from './server-action'
import { useFormState } from 'react-dom';

const SellerBasicInfoForm: React.FC<SellerBasicInfoFormProps> = ({ seller }) => {
  const [state, formAction, isPending] = useFormState(submitForm, {
    success: false,
    message: ''
  })

  return(
  <Form action={formAction} className='m-4'>
    <Input type='text' required name="name" label="Name" isClearable defaultValue={seller?.name} />
    <Input type='text' name="description" label="Description" isClearable defaultValue={seller?.description ?? ''} />
    <Input type='email' required name="contact_info" label="Contact Info" isClearable defaultValue={seller?.contact_info ?? ''} />
    <Input type='text' required name="location" label="Location" isClearable defaultValue={seller?.location ?? ''} />
    <Input type='text' required name="schedule" label="Schedule" isClearable defaultValue={seller?.schedule ?? ''} />
    <PrimaryButton type='submit' disabled={isPending}>
      {isPending ? 'Saving...' : 'Save'}
    </PrimaryButton>
    {state.message && (
      <div 
        className={`mt-4 p-2 rounded ${
          state.success 
            ? 'bg-green-100 text-green-800' 
            : 'bg-red-100 text-red-800'
        }`}
      >
        {state.message}
      </div>
    )}
    
  </Form>
  
  );
}

export { SellerBasicInfoForm as default }