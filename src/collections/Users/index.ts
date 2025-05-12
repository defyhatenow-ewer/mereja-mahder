import type { CollectionConfig } from 'payload'

import { isLoggedIn } from '@/access/isLoggedIn'
import { isAdminOrEditorWithSpaceAccessFieldLevel } from '@/access/isAdminOrEditorWithSpaceAccess'
import { isAdmin, isAdminFieldLevel } from '@/access/isAdmin'
import { isLoggedInWithSpaceAccess } from '@/access/isLoggedInWithSpaceAccess'
import { isAdminOrSelfOrMyEditor } from '@/access/isAdminOrSelfOrMyEditor'
import { registerEndpoint } from './endpoints/register'
import { getClientSideURL } from '@/utilities/getURL'
import { loginEndpoint } from './endpoints/login'

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
      required: true,
      unique: true,
      index: true,
      saveToJWT: true,
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
        {
          label: 'Basic',
          value: 'basic',
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
      hooks: {
        afterChange: [
          async ({ value, req, originalDoc, operation }) => {
            if (operation === 'update') {
              if (value) {
                await req.payload.sendEmail({
                  to: originalDoc.email,
                  subject: 'Your account has been approved!',
                  html: `<div style="margin:30px; padding:30px; border:1px solid black; border-radius: 20px 10px;"><h4><strong>Hi ${originalDoc.name},</strong></h4>
                <p>Congratulations! Your account has been approved</p>
                <p>You can now login <a href="${getClientSideURL()}/auth/login" target="_blank">here</a></p>
                <p>Don't hesitate to contact us if you face any problems</p>
                <p>Regards,</p>
                <p><strong>Team</strong></p></div>`,
                })
              } else {
                await req.payload.sendEmail({
                  to: originalDoc.email,
                  subject: 'Your account has been blocked',
                  html: `<div style="margin:30px; padding:30px; border:1px solid black; border-radius: 20px 10px;"><h4><strong>Hi ${originalDoc.name},</strong></h4>
                <p>Sorry, your account has been blocked</p>
                <p>Please contact the admin for help</p>
                <p>Don't hesitate to contact us if you face any problems</p>
                <p>Regards,</p>
                <p><strong>Team</strong></p></div>`,
                })
              }
            }
          },
        ],
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
  endpoints: [registerEndpoint, loginEndpoint],
}
