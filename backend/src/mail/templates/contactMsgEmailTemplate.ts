export function contactMsgEmailTemplate(subject: string, content: string): string {
  //date
  const date = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  //time
  const time = new Date().toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });

  //year
  const year = new Date().getFullYear();

  return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Message Received - KARAN</title>
      </head>
      <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f7f7f7;">
        <div style="max-width: 600px; margin: 20px auto; padding: 0; background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.08);">
          <!-- Header -->
          <div style="background-color: #2d89ef; padding: 25px; text-align: center; border-radius: 8px 8px 0 0;">
            <h1 style="color: #ffffff; margin: 0; font-size: 26px; font-weight: 600; letter-spacing: 1px;">KARAN</h1>
          </div>
          
          <!-- Content -->
          <div style="padding: 35px 30px;">
            <p style="font-size: 14px; color: #777777; margin: 0 0 20px 0;">${date} at ${time}</p>
            
            <p style="font-size: 16px; color: #333333; margin-top: 0; line-height: 1.5;"><strong>${subject}</strong>.</p>
            
            <p style="font-size: 16px; color: #333333; margin-bottom: 25px; line-height: 1.5;">
              We have received your message and appreciate you taking the time to reach out to me.
            </p>
            
            <div style="background-color: #f9f9f9; border-left: 4px solid #2d89ef; padding: 20px; margin: 25px 0; border-radius: 4px;">
              <p style="font-size: 15px; color: #555555; margin: 0; line-height: 1.6;">
                <strong>Your message:</strong><br>
                ${content}
              </p>
            </div>
            
            <div style="background-color: #f0f7ff; border-left: 4px solid #2d89ef; padding: 18px 20px; margin: 30px 0; border-radius: 4px;">
              <p style="font-size: 15px; color: #333333; margin: 0; line-height: 1.5;">
                <strong>What happens next:</strong> A member of our team will review your message and respond within 24 hours. We appreciate your patience.
              </p>
            </div>
            
            <p style="font-size: 15px; color: #555555; margin-top: 25px; line-height: 1.5;">
              This is an automated response. If you require immediate assistance or do not receive a response within 24 hours, please email us directly at <a href="mailto:support@karan.email" style="color: #2d89ef; text-decoration: none; font-weight: 500;">support@karan.email</a>.
            </p>
          </div>
          
          <!-- Footer -->
          <div style="padding: 20px; text-align: center; background-color: #f5f5f5; border-top: 1px solid #eeeeee; border-radius: 0 0 8px 8px;">
            <p style="font-size: 13px; color: #777777; margin: 0;">
              &copy; ${year} <a href="https://karan.email" style="color: #2d89ef; text-decoration: none; font-weight: 500;">karan.email</a>. All rights reserved.
            </p>
            <div style="margin-top: 12px;">
              <a href="https://www.karan.email/privacy" style="color: #777777; text-decoration: none; font-size: 12px; margin: 0 10px;">Privacy Policy</a>
              <a href="https://karan.email/terms" style="color: #777777; text-decoration: none; font-size: 12px; margin: 0 10px;">Terms of Service</a>
              <a href="https://karan.email/contact" style="color: #777777; text-decoration: none; font-size: 12px; margin: 0 10px;">Contact Us</a>
            </div>
          </div>
        </div>
      </body>
      </html>
    `;
}
