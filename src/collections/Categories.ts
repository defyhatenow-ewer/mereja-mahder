import type { CollectionConfig } from 'payload'

import { slugField } from '@/fields/slug'
import { isLoggedIn } from '@/access/isLoggedIn'
import { isAdminOrEditor } from '@/access/isAdminOrEditor'
import { anyone } from '@/access/anyone'

export const Categories: CollectionConfig = {
  slug: 'categories',
  access: {
    create: isLoggedIn,
    delete: isAdminOrEditor,
    read: anyone,
    update: isAdminOrEditor,
  },
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'relatedPosts',
      type: 'join',
      collection: 'posts',
      on: 'categories',
    },
    ...slugField(),
  ],
}
