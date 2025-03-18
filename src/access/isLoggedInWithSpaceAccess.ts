import { Access } from 'payload'
import { User } from '../payload-types'

export const isLoggedInWithSpaceAccess =
  (spaceIDFieldName: string = 'space'): Access<User> =>
  ({ req: { user } }) => {
    if (user) {
      if (user.role === 'admin') {
        return true
      }

      if (user.space) {
        return {
          [spaceIDFieldName]: {
            equals: user.space,
          },
        }
      }
    }

    return false
  }
