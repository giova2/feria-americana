import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import SellerProfile from '@/components/SellerProfile/SellerProfile';
import { getSellerInformation as getSellerInformationQuery } from '@/db/helpers/seller';
import { getServerSession } from 'next-auth';
import React from 'react'

type Params = {
  id: string
}

const SellerPage = async ({ id }: Params) => {
  const session = await getServerSession(authOptions) // TODO: end the authentication verification
  // const sellerId = session?.user?.user_metadata.sellerId || []
  const seller = await getSellerInformationQuery(id)
  console.log({session, seller})
  if(seller){
    return(<SellerProfile {...seller}/>);
  }
}

export { SellerPage as default }