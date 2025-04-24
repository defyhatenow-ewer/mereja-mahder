import { User } from '@/payload-types'
import { Access } from 'payload'

export const isAdminOrAuthor =
  (authorIDFieldName: string = 'author'): Access<User> =>
  ({ req: { user } }) => {
    // Need to be logged in
    if (user && user.isApproved) {
      // If user has role of 'admin'
      if (user.role === 'admin') {
        return true
      }

      // If any other type of user, only provide access to the author
      return {
        [authorIDFieldName]: {
          equals: user.id,
        },
      }
    }

    // Reject everyone else
    return false
  }
