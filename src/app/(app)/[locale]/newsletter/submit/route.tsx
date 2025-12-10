import { NextRequest, NextResponse } from 'next/server'

import { getPayload } from 'payload'
import config from '@payload-config'


// TODO: validate against zod
export async function POST(request: NextRequest) {
  const body = await request.json()

  const payload = await getPayload({ config })

  try {
    await payload.create({
      collection: 'newsletter-signups',
      data: body,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.error();
  }

  return new NextResponse(null, {
    status: 201,
  });
}
