import type { CollectionAfterReadHook } from 'payload'
import { Post } from 'src/payload-types'

export const populateFeaturedImage: CollectionAfterReadHook<Post> = async ({
  doc,
  req,
  req: { payload },
}) => {
  if (doc?.featuredImage) {
    const image = await payload.findByID({
      id: typeof doc.featuredImage === 'object' ? doc.featuredImage?.id : doc.featuredImage,
      collection: 'media',
      depth: 0,
      req,
    })

    doc.featuredImage = image.url
  }

  return doc
}
