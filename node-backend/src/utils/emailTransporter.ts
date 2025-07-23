import nodemailer from 'nodemailer';

type EmailPropsTypes = {
  toEmail: string | string[];
  subject: string;
  fallbackEmail: string;
  template: () => string;
};

export const emailTransporter = async ({
  toEmail,
  subject,
  fallbackEmail,
  template,
}: EmailPropsTypes): Promise<void> => {
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: Number(process.env.EMAIL_PORT),
    secure: false, // true for port 465 (SSL), false for port 587 (STARTTLS)
    auth: {
      user: process.env.EMAIL_FROM,
      pass: process.env.EMAIL_PASS,
    },
  } as nodemailer.TransportOptions);

  const mailOptions = {
    from: `"karan.email" <${process.env.EMAIL_FROM}>`,
    to: toEmail,
    subject: `${subject} `,
    text: `${fallbackEmail}`,
    html: template(),
  };

  await transporter.sendMail(mailOptions);
};
