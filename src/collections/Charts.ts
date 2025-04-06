import type { CollectionConfig } from 'payload'

import { slugField } from '@/fields/slug'
import {
  lexicalEditor,
  HeadingFeature,
  BlocksFeature,
  FixedToolbarFeature,
  InlineToolbarFeature,
  HorizontalRuleFeature,
} from '@payloadcms/richtext-lexical'
import { Banner } from '../blocks/Banner/config'
import { Code } from '../blocks/Code/config'
import { MediaBlock } from '../blocks/MediaBlock/config'
import { isAdmin } from '@/access/isAdmin'
import { isAdminOrEditorWithSpaceAccessOrSelf } from '@/access/isAdminOrEditorWithSpaceAccessOrSelf'
import { isLoggedIn } from '@/access/isLoggedIn'
import { isLoggedInWithSpaceAccessOrPublished } from '@/access/isLoggedInWithSpaceAccessOrPublished'

export const Charts: CollectionConfig = {
  slug: 'charts',
  access: {
    create: isLoggedIn,
    delete: isAdmin,
    read: isLoggedInWithSpaceAccessOrPublished(),
    update: isAdminOrEditorWithSpaceAccessOrSelf(),
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'description'],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      index: true,
    },
    {
      name: 'iframe',
      type: 'code',
      required: true,
      admin: {
        language: 'html',
      },
      label: 'iFrame',
    },
    {
      name: 'description',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [
            ...rootFeatures,
            HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
            BlocksFeature({ blocks: [Banner, Code, MediaBlock] }),
            FixedToolbarFeature(),
            InlineToolbarFeature(),
            HorizontalRuleFeature(),
          ]
        },
      }),
      required: true,
      label: false,
    },
    {
      name: 'space',
      type: 'relationship',
      relationTo: 'spaces',
      required: true,
    },
    ...slugField(),
  ],
  timestamps: true,
}
