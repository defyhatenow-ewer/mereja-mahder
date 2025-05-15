import { User } from '@/payload-types'
import { Endpoint, PayloadRequest } from 'payload'
import { serialize } from 'cookie'

export const loginEndpoint: Endpoint = {
  path: '/custom-login',
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
        const data = (await req.json()) as Pick<User, 'email' | 'password'>

        // Login the user automatically
        const loginResult = await req.payload.login({
          collection: 'users',
          data: {
            email: data.email,
            password: data.password as string,
          },
        })

        if (loginResult.token) {
          console.log('Token exists')
          // Set the cookie using the serialize function
          const cookie = serialize('payload-token', loginResult.token, {
            httpOnly: true, // Prevent client-side access
            secure: process.env.NODE_ENV === 'production', // Secure cookie in production
            path: '/', // Cookie is valid across the entire domain
            maxAge: loginResult.exp,
            domain: process.env.DOMAIN,
          })

          // Return the login result with the cookie in the headers
          return new Response(JSON.stringify(loginResult), {
            status: 200,
            headers: {
              ...headers,
              'Set-Cookie': cookie, // Set the cookie header
            },
          })
        }

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
