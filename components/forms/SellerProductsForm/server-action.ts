'use server'

import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { getServerSession } from "next-auth"

export const submitProductsQuickUpdateForm =  async (prevState: unknown, formData: FormData)  => {
  'use server'
  const session = await getServerSession(authOptions)
  console.log({ serverActionSession: session, formData})

  if(!session){
    return { 
      success: false, 
      message: 'You must be logged in to perform this action' 
    }
  }
  try {
    const response =  await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/products/quick-update/${formData.get('id')}`, {
      method: 'PUT',
      body: formData,
    })
    
    console.log({ response })
    // // // Handle response if necessary
    if(response){
      return {
        success: true,
        userId: session!.user!.id,
        message: `Action performed by ${session!.user!.name}`
      }
    }
  } catch (error) {
    console.log('Error doing a quick update', error) 
  }
  // }
  // }
  // const data = await response.json()
  // ...
}