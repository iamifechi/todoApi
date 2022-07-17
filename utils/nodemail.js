const nodemailer = require('nodemailer')

const { 
    mail_username,
    mail_password,
    oauth_client_id,
    oauth_client_secret,
    oauth_refresh_token
} = process.env;

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      type: 'OAuth2',
      user: mail_username,
      pass: mail_password,
      clientId: oauth_client_id,
      clientSecret: oauth_client_secret,
      refreshToken:  oauth_refresh_token,
    }
  })


module.exports = { transporter };

