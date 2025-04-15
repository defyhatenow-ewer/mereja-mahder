import type { CollectionConfig } from 'payload'

import { slugField } from '@/fields/slug'
import { isAdminOrEditor } from '@/access/isAdminOrEditor'
import { anyone } from '@/access/anyone'
import { LinkBlock } from '../../blocks/LinkBlock/config'
import { isAdminOrEditorWithSpaceAccess } from '@/access/isAdminOrEditorWithSpaceAccess'
import { beforeCreateBanner } from './hooks/beforeCreateBanner'

export const Banners: CollectionConfig<'banners'> = {
  slug: 'banners',
  access: {
    create: isAdminOrEditor,
    delete: isAdminOrEditorWithSpaceAccess(),
    read: anyone,
    update: isAdminOrEditorWithSpaceAccess(),
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
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'links',
      type: 'blocks',
      blocks: [LinkBlock],
      required: true,
    },
    {
      name: 'space',
      type: 'relationship',
      relationTo: 'spaces',
      admin: {
        position: 'sidebar',
      },
      required: true,
      unique: true,
    },
    ...slugField(),
  ],
  hooks: {
    beforeChange: [beforeCreateBanner],
  },
}
