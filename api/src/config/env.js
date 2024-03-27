import 'dotenv/config'

export const env = {
  PORT: process.env.PORT || 8080,
  MONGO_URI: process.env.MONGO_URI,
  BUILD_MODE: process.env.BUILD_MODE,
  jwt: {
    SECRET: process.env.JWT_SECRET,
    EXPIRES_IN: process.env.JWT_EXPIRES_IN
  },
  email: {
    SMTP: {
      HOST: process.env.SENDGRID_HOST,
      PORT: process.env.SENDGRID_PORT,
      AUTH: {
        USER: process.env.SENDGRID_USERNAME,
        PASS: process.env.SENDGRID_PASSWORD
      }
    },
    FROM: process.env.EMAIL_FROM
  }
}
