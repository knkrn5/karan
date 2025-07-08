import nodemailer from 'nodemailer';

type EmailPropsTypes = {
  toEmail: string;
  subject: string;
  fallbackEmail: string;
  template: () => string;
};

export const emailTransporter = async ({
  toEmail,
  subject,
  fallbackEmail,
  template,
}: EmailPropsTypes) => {
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: 465,
    secure: true, // true for 465, false for 587
    auth: {
      user: process.env.EMAIL_FROM,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: `"karan.email" <${process.env.EMAIL_FROM}>`,
    to: toEmail,
    subject: `${subject} `,
    text: `${fallbackEmail}`,
    html: template(),
  };

  await transporter.sendMail(mailOptions);
};
