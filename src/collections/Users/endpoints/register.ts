import { User } from '@/payload-types'
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
        const data = (await req.json()) as Omit<User, 'createdAt' | 'id' | 'sizes' | 'updatedAt'>

        // Create the user
        const user = await req.payload.create({
          collection: 'users',
          data: {
            email: data.email,
            password: data.password,
            role: 'basic',
            name: data.name,
            space: data.space,
          },
        })

        // Send email to registering user
        await req.payload.sendEmail({
          to: data.email,
          subject: 'Welcome to Mereja Mahder',
          html: `<div style="margin:30px; padding:30px; border:1px solid black; border-radius: 20px 10px;"><h4><strong>Hi ${data.name},</strong></h4>
            <p>Congratulations! Your account has been created successfully.</p>
            <p>Please wait while one of our admins approves your account</p>
            <p>Don't hesitate to contact us if you face any problems</p>
            <p>Regards,</p>
            <p><strong>Team</strong></p></div>`,
        })
        // Send emails to editors
        const editors = await req.payload.find({
          collection: 'users',
          where: {
            space: {
              equals: data.space,
            },
          },
        })

        editors.docs.forEach(async (editor) => {
          await req.payload.sendEmail({
            to: editor.email,
            subject: 'New User',
            html: `<div style="margin:30px; padding:30px; border:1px solid black; border-radius: 20px 10px;"><h4><strong>Hi Editor,</strong></h4>
            <p>You have a new user!.</p>
            <p>Please approve their account.</p>
            <p>Don't hesitate to contact us if you face any problems</p>
            <p>Regards,</p>
            <p><strong>Team</strong></p></div>`,
          })
        })

        // Login the user automatically
        // const loginResult = await req.payload.login({
        //   collection: 'users',
        //   data: {
        //     email: data.email,
        //     password: data.password as string,
        //   },
        // })

        return new Response(JSON.stringify(user), {
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
