import nodemailer from 'nodemailer';
import config from '../config';

export const sendEmail = async (to: string, resetLink: string) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: config.node_env === 'production', // Use `true` for port 465, `false` for all other ports
    auth: {
      user: config.email_user, // generated ethereal user
      pass: config.email_pass,
    },
  });

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 5px;">
      <div style="text-align: center; margin-bottom: 30px;">
        <h1 style="color: #333;">Password Reset Request</h1>
        <p style="color: #555;">We're here to help you reset your password</p>
      </div>
      <div style="padding: 20px; background-color: #f9f9f9; border-radius: 5px;">
        <p style="color: #333; font-size: 16px;">Hello,</p>
        <p style="color: #555; font-size: 16px; line-height: 1.5;">
          We received a request to reset your password. Click the button below to reset it:
        </p>
        <div style="text-align: center; margin: 30px 0;">
          <a href="${resetLink}" style="background-color: #FEA633; color: white; padding: 10px 20px; border-radius: 5px; text-decoration: none; font-size: 16px;">
            Reset Your Password
          </a>
        </div>
        <p style="color: #555; font-size: 16px; line-height: 1.5;">
          If you did not request this, you can safely ignore this email.
        </p>
        <p style="color: #555; font-size: 16px; line-height: 1.5;">
          This link will expire in 30 minutes for your security.
        </p>
      </div>
      <div style="margin-top: 30px; text-align: center; color: #777;">
        <p style="font-size: 14px;">&copy; ${new Date().getFullYear()} car-rentals. All rights reserved.</p>
      </div>
    </div>
  `;

  await transporter.sendMail({
    from: `"Car-Retals" <${config.email_user}>`, // sender address
    to, // list of receivers
    subject: 'Reset your password within ten mins', // Subject line
    text: '', // plain text body
    html, // html body
  });
};
