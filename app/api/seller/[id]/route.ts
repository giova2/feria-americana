import { getSeller } from "@/db/helpers/seller";
import { NextRequest, NextResponse } from "next/server";

type Params = {
  id: string,
}

export async function GET(req: NextRequest, context: { params: Params }) {
  const { id } = context.params
  const data = await getSeller(id)
  return NextResponse.json(data);
}
