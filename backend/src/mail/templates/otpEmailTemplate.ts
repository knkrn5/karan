export function generateOTPEmailTemplate(otp: number, subject: string): string {
  const date = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  const year = new Date().getFullYear();
  return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Your OTP Code</title>
        </head>
        <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Arial, sans-serif; background-color: #f5f5f5;">
          <div style="max-width: 600px; margin: 20px auto; padding: 0; background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
            <!-- Header -->
            <div style="background-color: #2d89ef; padding: 20px; text-align: center; border-radius: 8px 8px 0 0;">
              <h1 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: 600; font-family: 'Times New Roman', serif;">KARAN</h1>
            </div>
            
            <!-- Content -->
            <div style="padding: 30px 25px;">
              <p style="font-size: 14px; color: #777777; margin: 0 0 20px 0;">${date}</p>
              <p style="font-size: 16px; color: #333; margin-bottom: 25px;">
                <strong>${subject}</strong>
              </p>
              
              <div style="text-align: center; margin: 30px 0;">
                <div style="display: inline-block; padding: 15px 30px; background-color: #f7f7f7; border: 1px dashed #2d89ef; border-radius: 8px;">
                  <span style="font-size: 32px; font-weight: bold; color: #2d89ef; letter-spacing: 4px;">
                    ${otp}
                  </span>
                </div>
              </div>
              
              <div style="background-color: #fff8e1; border-left: 4px solid #ffc107; padding: 12px 15px; margin: 25px 0; border-radius: 4px;">
                <p style="font-size: 14px; color: #795548; margin: 0;">
                  <strong>Security Notice:</strong> This code will expire in 5 minutes. Never share this code with anyone, including KARAN staff.
                </p>
              </div>
              
              <p style="font-size: 15px; color: #555; margin-top: 25px;">
                If you didn't request this code, please ignore this email or contact our support team immediately.
              </p>
            </div>
            
            <!-- Footer -->
            <div style="padding: 15px; text-align: center; background-color: #f5f5f5; border-top: 1px solid #eeeeee; border-radius: 0 0 8px 8px;">
              <p style="font-size: 13px; color: #777; margin: 0;">
                &copy; ${year} <a href="https://karan.email" style="color: #2d89ef; text-decoration: none;">karan.email</a>. All rights reserved.
              </p>
              <div style="margin-top: 10px;">
                <a href="https://www.karan.email" style="color: #777; text-decoration: none; font-size: 12px; margin: 0 8px;">Privacy Policy</a>
                <a href="https://karan.email" style="color: #777; text-decoration: none; font-size: 12px; margin: 0 8px;">Terms of Service</a>
                <a href="https://karan.email/contact" style="color: #777; text-decoration: none; font-size: 12px; margin: 0 8px;">Contact Us</a>
              </div>
            </div>
          </div>
        </body>
        </html>
      `;
}
