import { Access } from 'payload'

export const isAdminOrEditor: Access = ({ req: { user } }) => {
  // Need to be logged in
  if (user) {
    // If user has role of 'admin' or 'editor'
    if (user.role === 'admin' || user.role === 'editor') {
      return true
    }
  }

  // Reject everyone else
  return false
}
