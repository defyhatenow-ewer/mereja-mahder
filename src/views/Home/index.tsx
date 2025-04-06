import React from 'react'
import type { Payload } from 'payload'

export default async function Home({ payload }: { payload: Payload }) {
  const page = await payload.findByID({
    collection: 'pages',
    id: '123',
  })

  return <p>Home</p>
}
