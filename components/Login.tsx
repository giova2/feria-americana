"use client"

import React from 'react'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { signIn, useSession } from 'next-auth/react'
import { authActions } from '@/lib/auth/constants';
import { useLoadingContext } from '@/context/Loading';
import { useRouter } from 'next/navigation';

function Login() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const { setShowLoading } = useLoadingContext()
  const session = useSession();

  const router = useRouter();
  // const { setAlertMsg } = useContext(AlertContext);

  const handleSignin = async (e: React.FormEvent) => {
    e.preventDefault()
    setShowLoading(true);
    signIn("credentials", {
      email,
      password,
      action: authActions.login,
      redirect: false,
    }).then(async (res) => {
      if (res?.ok) {
        // setAlertMsg("Welcome!", { severity: "success" });
        router.push("/");
      } else if (res?.error?.includes("EmailVerificationFailed")) {
        console.log("EmailVerificationFailed");
      } else {
        // setAlertMsg(res?.error ?? "Something went wrong", {
        //   severity: "error",
        // });
      }
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
    <div className='max-w-screen-sm min-h-56 m-auto mt-4 flex flex-col justify-center items-stretch'>
      <h2 className='text-center'>Login</h2>
      <form className="space-y-4 mt-2" onSubmit={handleSignin}>
        <Input placeholder="Email" onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}/>
        <Input placeholder="Password" type="password" onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}/>
        <Button type="submit" className="w-full">Login</Button>
      </form>
    </div>
  )
}

export default Login