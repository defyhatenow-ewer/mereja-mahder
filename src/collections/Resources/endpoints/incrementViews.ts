import { Endpoint, PayloadRequest } from 'payload'

export const incrementViewsEndpoint: Endpoint = {
  method: 'get',
  path: '/:id/increment-views',
  handler: async (req: PayloadRequest) => {
    if (req.routeParams && req.routeParams.id) {
      const id = req.routeParams.id as string

      try {
        // Find the resource by ID
        const resource = await req.payload.findByID({
          collection: 'resources',
          id,
        })

        if (!resource) {
          return Response.json({ message: 'Resource not found' }, { status: 404 })
        }

        // Increment views
        const updatedResource = await req.payload.update({
          collection: 'resources',
          id,
          data: {
            views: (resource.views || 0) + 1,
          },
        })

        // Return the updated resource
        return Response.json(updatedResource, { status: 200 })
      } catch (error) {
        console.error(error)
        return Response.json({ message: 'An error occured' }, { status: 500 })
      }
    }
    return Response.json({ message: 'An error occured' }, { status: 500 })
  },
}
