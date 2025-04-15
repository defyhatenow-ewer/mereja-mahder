import { Space } from '@/payload-types'
import { CollectionBeforeChangeHook } from 'payload'

// Hook to execute before creating a post
export const beforeCreatePost: CollectionBeforeChangeHook = async ({ req: { user }, data }) => {
  if (!user) {
    throw new Error('You must be logged in to create a post')
  }

  if (!user.space && user.role !== 'admin') {
    throw new Error('You must belong to a space to create a post')
  }

  // Add the logged-in user's space and id as the post's space and authors
  const updatedData = {
    ...data,
    ...(user.space && { space: (user.space as Space).id }), // Assuming user has a 'space' field that stores the space ID
    authors: [user.id], // Assuming user has an 'id' that can be used as an author reference
  }

  return updatedData
}
