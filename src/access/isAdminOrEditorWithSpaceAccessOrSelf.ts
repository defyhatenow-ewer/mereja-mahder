import { Access } from 'payload'

export const isAdminOrEditorWithSpaceAccessOrSelf =
  (spaceIDFieldName: string = 'space', authorsFieldName: string = 'authors'): Access =>
  ({ req: { user }, data }) => {
    if (user && user.isApproved) {
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

      if (data && data._status === 'published') {
        return false
      }

      return {
        [authorsFieldName]: {
          contains: user.id,
        },
      }
    }

    return false
  }
