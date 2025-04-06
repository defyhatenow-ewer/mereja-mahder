import { CollectionConfig, Field } from 'payload'
import { slugField } from '@/fields/slug'
import { anyone } from '@/access/anyone'
import { isAdminOrEditor } from '@/access/isAdminOrEditor'

export const CommentsFields: Field[] = [
  {
    name: 'author',
    type: 'relationship',
    relationTo: 'users',
  },
  {
    name: 'email',
    type: 'email',
  },
  {
    name: 'content',
    type: 'textarea',
  },
  {
    name: 'replyPost',
    type: 'relationship',
    relationTo: 'posts',
  },
  {
    name: 'replyComment',
    type: 'relationship',
    relationTo: 'comments',
  },
  {
    name: 'isApproved',
    type: 'checkbox',
    defaultValue: false,
  },
  ...slugField(),
]

export const Comments: CollectionConfig = {
  slug: 'comments',
  admin: {
    defaultColumns: ['id', 'author', 'email', 'isApproved', 'content'],
    useAsTitle: 'id',
  },
  access: {
    create: anyone,
    delete: isAdminOrEditor,
    read: anyone,
    update: isAdminOrEditor,
  },
  fields: CommentsFields,
  timestamps: true,
}
