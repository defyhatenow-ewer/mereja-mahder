declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PAYLOAD_SECRET: string
      DATABASE_URI: string
      NEXT_PUBLIC_SERVER_URL: string
      NEXT_PUBLIC_CLIENT_URL: string
      DOMAIN: string
      VERCEL_PROJECT_PRODUCTION_URL: string
      SMTP_HOST: string
      SMTP_USER: string
      SMTP_PASS: string
      EMAIL_FROM: string
      CLOUDINARY_CLOUD_NAME: string
      CLOUDINARY_API_KEY: string
      CLOUDINARY_API_SECRET: string
    }
  }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {}
