import { Endpoint, PayloadRequest } from 'payload'

export const incrementViewsEndpoint: Endpoint = {
  method: 'get',
  path: '/increment-views/:id',
  handler: async (req: PayloadRequest) => {
    if (req.routeParams && req.routeParams.id) {
      const id = req.routeParams.id as string

      try {
        // Find the post by ID
        const post = await req.payload.findByID({
          collection: 'posts',
          id,
        })

        if (!post) {
          return Response.json({ message: 'Post not found' }, { status: 404 })
        }

        // Increment views
        const updatedPost = await req.payload.update({
          collection: 'posts',
          id,
          data: {
            views: (post.views || 0) + 1,
          },
        })

        // Return the updated post
        return Response.json(updatedPost, { status: 200 })
      } catch (error) {
        console.error(error)
        return Response.json({ message: 'An error occured' }, { status: 500 })
      }
    }
    return Response.json({ message: 'An error occured' }, { status: 500 })
  },
}
