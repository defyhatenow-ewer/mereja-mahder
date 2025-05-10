import { Access, AccessResult } from 'payload'

export const isLoggedInWithSpaceAccessOrPublished =
  (spaceIDFieldName: string = 'space'): Access =>
  ({ req: { user, query } }) => {
    const { hide } = query
    if (hide) return false
    if (user && user.isApproved) {
      if (user.role === 'admin') {
        return true
      }

      return {
        or: [
          {
            [spaceIDFieldName]: {
              equals: user.space as string,
            },
          },
          {
            _status: {
              equals: 'published',
            },
          },
        ],
      } as AccessResult
    }

    return {
      _status: {
        equals: 'published',
      },
    }
  }
