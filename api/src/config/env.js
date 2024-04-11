import 'dotenv/config'

export const env = {
  PORT: process.env.PORT || 8080,
  MONGO_URI: process.env.MONGO_URI,
  BUILD_MODE: process.env.BUILD_MODE,
  jwt: {
    SECRET: process.env.JWT_SECRET,
    EXPIRES_IN: process.env.JWT_EXPIRES_IN,
    COOKIE_EXPIRES_IN: process.env.JWT_COOKIE_EXPIRES_IN
  },
  email: {
    smtp: {
      host: process.env.SENDGRID_HOST,
      port: process.env.SENDGRID_PORT,
      auth: {
        user: process.env.SENDGRID_USERNAME,
        pass: process.env.SENDGRID_PASSWORD
      }
    },
    from: process.env.EMAIL_FROM
  },
  cloudinary: {
    CLOUD_NAME: process.env.CLOUD_NAME,
    CLOUD_API_KEY: process.env.CLOUD_API_KEY,
    CLOUD_API_SECRET: process.env.CLOUD_API_SECRET
  },
  stripe: {
    SECRET_KEY: process.env.STRIPE_SECRET_KEY
  }
}
