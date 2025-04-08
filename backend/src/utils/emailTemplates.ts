export function generateOTPEmailTemplate(otp: number ): string {
  return `
      <div style="max-width: 480px; margin: 0 auto; padding: 20px; font-family: 'Segoe UI', sans-serif; background-color: #f9f9f9; border-radius: 8px; border: 1px solid #e0e0e0;">
        <h2 style="color: #333; text-align: center;">
          Welcome to <span style="color: #2d89ef;">KARAN</span>
        </h2>
        <p style="font-size: 16px; color: #555;">Hello,</p>
        <p style="font-size: 16px; color: #555;">Your one-time password (OTP) is:</p>
        <div style="text-align: center; margin: 20px 0;">
          <span style="display: inline-block; padding: 12px 24px; font-size: 24px; background-color: #2d89ef; color: white; border-radius: 6px; letter-spacing: 2px;">
            ${otp}
          </span>
        </div>
        <p style="font-size: 14px; color: #888;">
          This code is valid for the next 5 minutes. Please do not share this code with anyone.
        </p>
        <p style="font-size: 14px; color: #aaa; text-align: center; margin-top: 30px;">
          &copy; ${new Date().getFullYear()} karan.email. All rights reserved.
        </p>
      </div>
    `;
}
