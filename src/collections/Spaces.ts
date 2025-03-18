import type { CollectionConfig } from 'payload'

import { slugField } from '@/fields/slug'
import { isAdmin } from '@/access/isAdmin'
import { isLoggedIn } from '@/access/isLoggedIn'

export const Spaces: CollectionConfig = {
  slug: 'spaces',
  access: {
    create: isAdmin,
    delete: isAdmin,
    read: isAdmin,
    update: isAdmin,
  },
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'select',
      required: true,
      unique: true,
      options: [
        {
          label: 'Africa Factchecking Fellowship',
          value: 'aff',
        },
        {
          label: 'Partners',
          value: 'partners',
        },
        {
          label: 'Women Safe Space',
          value: 'women_safe_space',
        },
      ],
    },
    {
      name: 'users',
      type: 'join',
      collection: 'users',
      on: 'space',
    },
    {
      name: 'pages',
      type: 'join',
      collection: 'pages',
      on: 'space',
    },
    {
      name: 'posts',
      type: 'join',
      collection: 'posts',
      on: 'space',
    },
    ...slugField(),
  ],
}
