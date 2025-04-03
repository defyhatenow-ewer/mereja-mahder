import type { Access } from 'payload'

export const authenticatedOrPublished: Access = ({ req: { user } }) => {
  if (user && user.isApproved) {
    return true
  }

  return {
    _status: {
      equals: 'published',
    },
  }
}
