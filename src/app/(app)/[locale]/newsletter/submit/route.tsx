import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

import { getPayload } from 'payload'
import config from '@payload-config'

const SignupSchema = z.object({
  email: z.string().trim().email(),
})

export async function POST(request: NextRequest) {
  let email: string

  try {
    email = SignupSchema.parse(await request.json()).email
  } catch (error) {
    console.error(error);
    return new NextResponse(null, { status: 400 });
  }

  const payload = await getPayload({ config })

  try {
    // `email` carries no unique index, so without this check a repeat signup
    // silently creates a second row and the user is told nothing.
    const existing = await payload.find({
      collection: 'newsletter-signups',
      where: { email: { equals: email } },
      limit: 1,
    });

    if (existing.totalDocs > 0) {
      return new NextResponse(null, { status: 409 });
    }

    await payload.create({
      collection: 'newsletter-signups',
      data: { email },
    });
  } catch (error) {
    console.error(error);
    return new NextResponse(null, { status: 500 });
  }

  return new NextResponse(null, {
    status: 201,
  });
}
