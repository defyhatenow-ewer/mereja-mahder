import { Report } from '@/payload-types'
import { CollectionAfterReadHook } from 'payload'

export const updateViews: CollectionAfterReadHook<Report> = async ({ doc, req }) => {
  // Only increment views if the document exists and it's a valid post
  if (doc && doc.views !== undefined) {
    // Increment the views count
    const updatedPost = await req.payload.update({
      collection: 'posts',
      id: doc.id,
      data: {
        views: (doc.views || 0) + 1, // Increment the views count
      },
    })

    return updatedPost // Return the updated post
  }

  return doc // If no views field exists, just return the doc as is
}
