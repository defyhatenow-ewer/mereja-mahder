import type { CollectionConfig } from 'payload'

import { isLoggedIn } from '@/access/isLoggedIn'
import { isAdminOrAuthor } from '@/access/isAdminOrAuthor'
import { addUserBeforeCreate } from './hooks/addUserBeforeCreate'

export const Messages: CollectionConfig = {
  slug: 'messages',
  access: {
    create: isLoggedIn,
    delete: isAdminOrAuthor(),
    read: isLoggedIn,
    update: isAdminOrAuthor(),
  },
  admin: {},
  fields: [
    {
      name: 'author',
      type: 'relationship',
      relationTo: 'users',
      required: true,
    },
    {
      name: 'forum',
      type: 'relationship',
      relationTo: 'forums',
      required: true,
    },
    {
      name: 'text',
      type: 'text',
      required: true,
    },
    {
      name: 'replyTo',
      type: 'relationship',
      relationTo: 'messages',
    },
  ],
  hooks: {
    beforeChange: [addUserBeforeCreate],
  },
}
