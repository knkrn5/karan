import nodemailer from 'nodemailer';

type EmailPropsTypes = {
  email: string;
  subject: string;
  fallbackEmail: string;
  template: () => string;
};

export const emailTransporter = async ({
  email,
  subject,
  fallbackEmail,
  template,
}: EmailPropsTypes) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.zoho.in',
    port: 465,
    secure: true, // true for 465, false for 587
    auth: {
      user: process.env.EMAIL_FROM,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: `"karan.email" <${process.env.EMAIL_FROM}>`,
    to: email,
    subject: `${subject} `,
    text: `${fallbackEmail}`,
    html: template(),
  };

  await transporter.sendMail(mailOptions);
};
