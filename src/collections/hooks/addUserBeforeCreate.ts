import { CollectionBeforeChangeHook } from 'payload'

// Hook to execute before creating a post
export const addUserBeforeCreate: CollectionBeforeChangeHook = async ({ req: { user }, data }) => {
  if (!user) {
    throw new Error('Please login first')
  } else {
    const updatedData = {
      ...data,
      author: user.id, // Assuming user has an 'id' that can be used as an author reference
    }

    return updatedData
  }
}
