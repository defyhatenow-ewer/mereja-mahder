import type { CollectionConfig } from 'payload'

import { slugField } from '@/fields/slug'
import { isLoggedIn } from '@/access/isLoggedIn'
import { isAdminOrAuthor } from '@/access/isAdminOrAuthor'
import { addUserBeforeCreate } from './hooks/addUserBeforeCreate'

export const Forums: CollectionConfig = {
  slug: 'forums',
  access: {
    create: isLoggedIn,
    delete: isAdminOrAuthor(),
    read: isLoggedIn,
    update: isAdminOrAuthor(),
  },
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'author',
      type: 'relationship',
      relationTo: 'users',
      required: true,
    },
    {
      name: 'title',
      type: 'text',
      required: true,
      index: true,
    },
    {
      name: 'description',
      type: 'text',
      required: true,
    },
    {
      name: 'messages',
      type: 'join',
      collection: 'messages',
      on: 'forum',
    },
    ...slugField(),
  ],
  hooks: {
    beforeChange: [addUserBeforeCreate],
  },
}
