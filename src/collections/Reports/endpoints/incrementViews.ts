import { Endpoint, PayloadRequest } from 'payload'

export const incrementViewsEndpoint: Endpoint = {
  method: 'get',
  path: '/:id/increment-views',
  handler: async (req: PayloadRequest) => {
    if (req.routeParams && req.routeParams.id) {
      const id = req.routeParams.id as string

      try {
        // Find the report by ID
        const report = await req.payload.findByID({
          collection: 'reports',
          id,
        })

        if (!report) {
          return Response.json({ message: 'Post not found' }, { status: 404 })
        }

        // Increment views
        const updatedReport = await req.payload.update({
          collection: 'reports',
          id,
          data: {
            views: (report.views || 0) + 1,
          },
        })

        // Return the updated report
        return Response.json(updatedReport, { status: 200 })
      } catch (error) {
        console.error(error)
        return Response.json({ message: 'An error occured' }, { status: 500 })
      }
    }
    return Response.json({ message: 'An error occured' }, { status: 500 })
  },
}
