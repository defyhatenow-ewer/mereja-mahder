import { Banner, Space } from '@/payload-types'
import { CollectionBeforeChangeHook } from 'payload'

// Hook to execute before creating a post
export const beforeCreateBanner: CollectionBeforeChangeHook<Banner> = async ({
  req: { user },
  data,
}) => {
  if (!user) {
    throw new Error('You must be logged in to create a banner')
  }

  if (!user.space && user.role !== 'admin') {
    throw new Error('You must belong to a space to create a banner')
  }

  // Add the logged-in user's space and id as the banner's space
  const updatedData = {
    ...data,
    ...(user.space && { space: (user.space as Space).id }), // Assuming user has a 'space' field that stores the space ID
  }

  return updatedData
}
