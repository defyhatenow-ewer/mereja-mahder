import { Access } from 'payload'
import { User } from '../payload-types'

export const isAdminOrSelfOrMyEditor =
  (spaceIDFieldName: string = 'space'): Access<User> =>
  ({ req: { user } }) => {
    // Need to be logged in
    if (user && user.isApproved) {
      // If user has role of 'admin'
      if (user.role === 'admin') {
        return true
      }

      // If editor has access to access
      if (user.space && user.role === 'editor') {
        return {
          [spaceIDFieldName]: {
            equals: user.space,
          },
        }
      }

      // If any other type of user, only provide access to themselves
      return {
        id: {
          equals: user.id,
        },
      }
    }

    // Reject everyone else
    return false
  }
