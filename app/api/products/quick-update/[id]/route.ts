import { quickUpdateProduct } from "@/db/helpers/product/products";
import { NextRequest, NextResponse } from "next/server";
import { z } from 'zod'
 
const schema = z.object({
  // id: z.string(),
  name: z.string().max(50).trim(),
  description: z.string().max(150).trim().nullable(),
  price: z.number() // TODO: how to validate this correctly
})
 
type Params = {
  id: string,
}

export async function PUT(req: NextRequest, context: { params: Promise<Params> }) {
  const { id } = (await context.params)
  // TODO: I should check the session here
  const formDataReceived = await req.formData()
  const result = schema.safeParse({
    name: formDataReceived.get('name'),
    description: formDataReceived.get('description'),
    price: Number(formDataReceived.get('price')),
  })
  if(result.success){
    console.log({ data: result.data })
    const data = await quickUpdateProduct(id, result.data)
    return NextResponse.json(data);
  }
  return NextResponse.json(result.error)
}
