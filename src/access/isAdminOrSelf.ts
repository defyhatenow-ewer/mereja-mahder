import { Access } from 'payload'

export const isAdminOrSelf: Access = ({ req: { user } }) => {
  // Need to be logged in
  if (user && user.isApproved) {
    // If user has role of 'admin'
    if (user.role === 'admin') {
      return true
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
