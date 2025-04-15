import { Endpoint, PayloadRequest } from 'payload'

export const incrementViewsEndpoint: Endpoint = {
  method: 'get',
  path: '/:id/increment-views',
  handler: async (req: PayloadRequest) => {
    if (req.routeParams && req.routeParams.id) {
      const id = req.routeParams.id as string

      try {
        // Find the article by ID
        const article = await req.payload.findByID({
          collection: 'articles',
          id,
        })

        if (!article) {
          return Response.json({ message: 'Article not found' }, { status: 404 })
        }

        // Increment views
        const updatedArticle = await req.payload.update({
          collection: 'articles',
          id,
          data: {
            views: (article.views || 0) + 1,
          },
        })

        // Return the updated article
        return Response.json(updatedArticle, { status: 200 })
      } catch (error) {
        console.error(error)
        return Response.json({ message: 'An error occured' }, { status: 500 })
      }
    }
    return Response.json({ message: 'An error occured' }, { status: 500 })
  },
}
