import { Access, FieldAccess } from 'payload'
import { Space, User } from '../payload-types'

export const isAdminOrEditorWithSpaceAccess =
  (spaceIDFieldName: string = 'space'): Access<User> =>
  ({ req: { user } }) => {
    if (user) {
      if (user.role === 'admin') {
        return true
      }

      if (user.space && user.role === 'editor') {
        return {
          [spaceIDFieldName]: {
            equals: user.space,
          },
        }
      }
    }

    return false
  }

export const isAdminOrEditorWithSpaceAccessFieldLevel =
  (): FieldAccess<{ id: string; space: string }, User> =>
  ({ req: { user }, doc }) => {
    if (user && user.isApproved) {
      if (user.role === 'admin') {
        return true
      }

      if (user.space && user.role === 'editor' && doc) {
        // console.log({ user: user.space['id'] })
        return doc.space === (user.space as Space).id
      }
    }

    return false
  }
