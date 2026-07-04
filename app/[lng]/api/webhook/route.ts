import { createUser, updatedUser } from '@/actions/user.actio'

import { WebhookEvent } from '@clerk/nextjs/server'
import { headers } from 'next/headers'
import { NextResponse } from 'next/server'
import { Webhook } from 'svix'

export async function POST(req: Request) {
  const hook_secret = process.env.NEXT_CLERK_HOOK_SECRET

  if (!hook_secret) {
    throw new Error('Missing hook secret')
  }

  const headerPayload = headers()
  const svix_id = (await headerPayload).get('svix-id')
  const svix_timestamp = (await headerPayload).get('svix-timestamp')
  const svix_signature = (await headerPayload).get('svix-signature')

  if (!svix_id || !svix_timestamp || !svix_signature) {
    throw new Response('Missing svix headers', {
      status: 400,
    })
  }

  const payload = await req.json()
  const body = JSON.stringify(payload)

  const wh = new Webhook(hook_secret)

  let evt: WebhookEvent

  try {
    evt = wh.verify(body, {
      svix_id,
      svix_timestamp,
      svix_signature,
      body,
    }) as WebhookEvent
  } catch (err) {
    throw new Response('Invalid signature:', {
      status: 401,
    })
  }

  const eventType = evt.type

  if (eventType === 'user.created') {
    const { id, email_addresses, image_url, first_name, last_name } = evt.data
    const user = await createUser({
      clerkId: id,
      email: email_addresses[0].email_address,
      fullName: `${first_name} ${last_name}`,
      picture: image_url,
    })
    return NextResponse.json({ message: 'User created', user })
  }

  if (eventType === 'user.updated') {
    const { id, email_addresses, image_url, first_name, last_name } = evt.data
    const updateUser = await updatedUser({
      clerkId: id,
      updatedUser: {
        fullName: `${first_name} ${last_name}`,
        email: email_addresses[0].email_address,
        picture: image_url,
      },
    })

    return NextResponse.json({ message: 'User updated', updateUser })
  }
}
