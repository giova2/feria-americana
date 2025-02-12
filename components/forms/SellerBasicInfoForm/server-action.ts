'use server'

import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { getServerSession } from "next-auth"


export const submitForm =  async (prevState: unknown, formData: FormData)  => {
  'use server'
  const session = await getServerSession(authOptions)
  console.log({ serverActionSession: session, formData})

  if(!session){
    return { 
      success: false, 
      message: 'You must be logged in to perform this action' 
    }
  }
  const response =  await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/seller/${session.user.app_metadata.sellerId}`, {
  // const response =  await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/seller/533676b8-33e6-4ba2-941e-06d10b9046cb`, {
    method: 'POST',
    body: formData,
  })

  // // // Handle response if necessary
  // if(response){
  return {
    success: true,
    userId: session!.user!.id,
    message: `Action performed by ${session!.user!.name}`
  }
  // }
  //   console.log({ response })
  // }
  // const data = await response.json()
  // ...
}