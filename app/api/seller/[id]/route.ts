import { getSeller } from "@/db/helpers/seller/seller";
import { NextRequest, NextResponse } from "next/server";
import { z } from 'zod'
 
const schema = z.object({
  // id: z.string(),
  name: z.string().max(50).trim(),
  description: z.string().max(150).trim().nullable(),
  contact_info: z.string().max(50).trim().email().nullable(),
  location: z.string().max(100).trim().nullable(),
  schedule: z.string().max(150).trim().nullable(),
})
 
type Params = {
  id: string,
}

export async function GET(req: NextRequest, context: { params: Promise<Params> }) {
  const { id } = (await context.params)
  const data = await getSeller(id)
  return NextResponse.json(data);
}

export async function POST(req: NextRequest) {
  // TODO: I should check the session here
  console.log({ postSellerBody: req.body })
  const parsed = schema.parse(req.body)
  console.log({ parsed })
  // const data = await getSeller(parsed)
  // return NextResponse.json(parsed);
}
