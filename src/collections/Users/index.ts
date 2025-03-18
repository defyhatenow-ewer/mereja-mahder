import type { CollectionConfig } from 'payload'

import { isLoggedIn } from '@/access/isLoggedIn'
import { isAdminOrEditorWithSpaceAccessFieldLevel } from '@/access/isAdminOrEditorWithSpaceAccess'
import { isAdmin, isAdminFieldLevel } from '@/access/isAdmin'
import { isLoggedInWithSpaceAccess } from '@/access/isLoggedInWithSpaceAccess'
import { isAdminOrSelfOrMyEditor } from '@/access/isAdminOrSelfOrMyEditor'

export const Users: CollectionConfig = {
  slug: 'users',
  access: {
    admin: isLoggedIn,
    create: isAdmin,
    delete: isAdminOrSelfOrMyEditor(),
    read: isLoggedInWithSpaceAccess(),
    update: isAdminOrSelfOrMyEditor(),
  },
  admin: {
    defaultColumns: ['name', 'email', 'role'],
    useAsTitle: 'name',
  },
  auth: true,
  fields: [
    {
      name: 'name',
      type: 'text',
    },
    {
      name: 'role',
      type: 'select',
      saveToJWT: true,
      required: true,
      access: {
        update: isAdminFieldLevel,
      },
      options: [
        {
          label: 'Admin',
          value: 'admin',
        },
        {
          label: 'Editor',
          value: 'editor',
        },
        {
          label: 'Partner',
          value: 'partner',
        },
        {
          label: 'Fellow',
          value: 'fellow',
        },
        {
          label: 'Curator',
          value: 'curator',
        },
      ],
    },
    {
      name: 'avatar',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'isApproved',
      type: 'checkbox',
      defaultValue: false,
      access: {
        create: isAdminOrEditorWithSpaceAccessFieldLevel(),
        update: isAdminOrEditorWithSpaceAccessFieldLevel(),
      },
    },
    {
      name: 'space',
      type: 'relationship',
      relationTo: 'spaces',
      access: {
        update: isAdminFieldLevel,
      },
    },
  ],
  timestamps: true,
}
