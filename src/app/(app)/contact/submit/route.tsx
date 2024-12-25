import { NextRequest, NextResponse } from 'next/server'
import { FormFieldsSchema, type FormFields } from '@/components/ContactForm/FormConfig'

import { getPayload } from 'payload'
import config from '@payload-config'


export async function POST(request: NextRequest) {
  const body: FormFields = await request.json()

  try {
    FormFieldsSchema.parse(body);
  } catch (e) {
    console.error(e);
    return new NextResponse(null, {
      status: 400,
    });
  }

  const payload = await getPayload({ config })

  try {
    await payload.create({
      collection: 'contact-forms',
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
