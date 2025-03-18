import { Access } from 'payload'
import { User } from '../payload-types'

export const isAuthorOrSpaceEditorOrAdmin =
  (spaceIDFieldName: string = 'space', authorsFieldName: string = 'authors'): Access<User> =>
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

      return {
        [authorsFieldName]: {
          contains: user.id,
        },
      }
    }

    return false
  }
