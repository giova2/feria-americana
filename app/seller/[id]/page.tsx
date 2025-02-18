import { auth } from '@/auth';
import SellerProfile from '@/components/SellerProfile/SellerProfile';
import { getSellerInformation as getSellerInformationQuery } from '@/db/helpers/seller/seller';
import React from 'react'

type Params = {
  id: string
}

const SellerPage = async ({ id }: Params) => {
  const session = await auth() // TODO: end the authentication verification
  // const sellerId = session?.user?.user_metadata.sellerId || []
  const seller = await getSellerInformationQuery(id)
  console.log({session, seller})
  if(seller){
    return(<SellerProfile {...seller}/>);
  }
}

export { SellerPage as default }