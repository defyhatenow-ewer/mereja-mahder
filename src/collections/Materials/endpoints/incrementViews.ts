import { Endpoint, PayloadRequest } from 'payload'

export const incrementViewsEndpoint: Endpoint = {
  method: 'get',
  path: '/:id/increment-views',
  handler: async (req: PayloadRequest) => {
    if (req.routeParams && req.routeParams.id) {
      const id = req.routeParams.id as string

      try {
        // Find the material by ID
        const material = await req.payload.findByID({
          collection: 'materials',
          id,
        })

        if (!material) {
          return Response.json({ message: 'Material not found' }, { status: 404 })
        }

        // Increment views
        const updatedMaterial = await req.payload.update({
          collection: 'materials',
          id,
          data: {
            views: (material.views || 0) + 1,
          },
        })

        // Return the updated material
        return Response.json(updatedMaterial, { status: 200 })
      } catch (error) {
        console.error(error)
        return Response.json({ message: 'An error occured' }, { status: 500 })
      }
    }
    return Response.json({ message: 'An error occured' }, { status: 500 })
  },
}
