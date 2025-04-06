import { Endpoint, PayloadRequest } from 'payload'

export const registerEndpoint: Endpoint = {
  path: '/register',
  method: 'post',
  handler: async (req: PayloadRequest) => {
    // Set CORS headers
    const headers = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    }

    // Handle preflight request
    if (req.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers })
    }

    if (req.json) {
      try {
        const data = await req.json()

        // Create the user
        await req.payload.create({
          collection: 'users',
          data: {
            email: data.email,
            password: data.password,
            role: 'basic',
            name: data.name,
          },
        })

        // Login the user automatically
        const loginResult = await req.payload.login({
          collection: 'users',
          data: {
            email: data.email,
            password: data.password,
          },
        })

        return new Response(JSON.stringify(loginResult), {
          status: 200,
          headers,
        })
      } catch (error) {
        return new Response(JSON.stringify(error), {
          status: 400,
          headers,
        })
      }
    }
    return new Response(JSON.stringify({ message: 'An error occured' }), {
      status: 500,
      headers,
    })
  },
}
