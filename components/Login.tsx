"use client"

import React from 'react'
import { signIn, useSession } from 'next-auth/react'
import { authActions } from '@/lib/auth/constants';
import { useLoadingContext } from '@/context/Loading';
import { useRouter } from 'next/navigation';
import { Form, Input, Button} from "@nextui-org/react";
import { useAlertContext } from '@/context/Alert';
import { MsgSeverityEnum } from '@/types/alert';
import { PrimaryButton } from './ui/button';

function Login() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [errors, setErrors] = React.useState<Record<string, string>>({});
  const { setShowLoading } = useLoadingContext()
  const session = useSession();

  const router = useRouter();
  const { setAlertMsg } = useAlertContext()

  const handleSignin = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrors({})
    setShowLoading(true)
    signIn("credentials", {
      email,
      password,
      action: authActions.login,
      redirect: false,
    }).then(async (res) => {
      if (res?.ok) {
        setAlertMsg("Welcome!", { severity: MsgSeverityEnum.SUCCESS });
        router.push("/");
      }
      if(res?.error){
        setAlertMsg(res.error, { severity: MsgSeverityEnum.ERROR });
        setErrors({ general: res.error })
      }
    })
    .catch((error) => {
      setAlertMsg(error ?? "Something went wrong", {
        severity: MsgSeverityEnum.ERROR,
      });
    })
    .finally(() =>{
      setShowLoading(false);
    });
  };

  console.log({ LoginSession: session })
  if(session.status === "authenticated"){
    router.push('/')
    return null
  }

  return (
    <div className='max-w-screen-sm min-h-56 m-auto mt-4 flex flex-col justify-center items-center'>
      <Form className="w-full max-w-xs mt-2" validationBehavior="native" onSubmit={handleSignin}>
        <Input
          isRequired
          errorMessage="Please enter a valid email"
          label="Email"
          labelPlacement="outside"
          name="email"
          placeholder="Enter your email"
          type="email"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
        />
        <Input 
          isRequired
          errorMessage="Please enter a password"
          label="Password"
          labelPlacement="outside"
          name="password"
          placeholder="Password" 
          type="password" 
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
        />
        {errors?.general && <span className="text-danger text-small">{errors.general}</span>}
        <PrimaryButton type="submit">
          Login
        </PrimaryButton>
      </Form>
    </div>
  )
}

export default Login