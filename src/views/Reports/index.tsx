import React from 'react'
import type { Payload } from 'payload'

export default async function Reports({ payload }: { payload: Payload }) {
  const page = await payload.findByID({
    collection: 'pages',
    id: '123',
  })

  console.log(page.id)

  return <p>Reports view</p>
}
