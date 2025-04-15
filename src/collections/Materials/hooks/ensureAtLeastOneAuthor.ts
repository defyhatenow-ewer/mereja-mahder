import { CollectionBeforeChangeHook } from 'payload'

// Hook to ensure a post has at least one author
export const ensureAtLeastOneAuthor: CollectionBeforeChangeHook = async ({ req, data }) => {
  // For the "create" and "update" operations, ensure the post has at least one author
  if (data.authors && data.authors.length === 0) {
    throw new Error('A post must have at least one author.')
  }

  // In case authors is not set, we can automatically set the logged-in user as the author (if appropriate)
  if (!data.authors && req.user) {
    data.authors = [req.user.id] // Assuming the logged-in user's ID is used as the author
  }

  return data
}
