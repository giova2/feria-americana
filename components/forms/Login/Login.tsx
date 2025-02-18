"use client"

import React, { useTransition } from 'react'
import { Form, Spinner } from "@heroui/react";
import { PrimaryButton } from '../../ui/button';
import { GoogleIcon } from '@/resources/icons';
import { googleSignIn } from './server-action';
import { useSession } from "next-auth/react"
import { useRouter } from 'next/navigation';

function Login() {
  const { data: session } = useSession()
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  if(session){
    router.push('/')
    return null
  }

  return (
  <>
    <Form action={() =>startTransition(googleSignIn)} >
      <PrimaryButton 
        disabled={isPending}
        isLoading={isPending}
        endContent={<GoogleIcon width={15}/>}
        spinner={<Spinner size='sm'/>}
      >
        SignIn With google
      </PrimaryButton>
    
    </Form>
  </>

  )
}

export default Login