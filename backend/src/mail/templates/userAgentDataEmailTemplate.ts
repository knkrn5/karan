// Interface for user agent data
interface UserAgentDataPropTypes {
  dataAndTime?: string;
  brands?: { brand: string; version: string }[];
  mobile?: boolean;
  platform?: string;
  userAgent?: string;
  language?: string;
  ipAddress?: string;
  geoDetails?: {
    country_name: string;
    city: string;
    region: string;
    nearestLocation: string;
  };
}

// function to format the useragent data as HTML
export function formatUserAgentDataHTML(data: UserAgentDataPropTypes): string {
  let formattedHTML = '';

  // Browser information section
  formattedHTML += `
      <div style="margin-bottom: 20px;">
        <h3 style="color: #2d89ef; font-size: 16px; margin-bottom: 10px; font-weight: 600; border-bottom: 1px solid #e0e0e0; padding-bottom: 8px;">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2d89ef" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align: -2px; margin-right: 6px;">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="2" y1="12" x2="22" y2="12"></line>
            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
          </svg>
          Browser Information
        </h3>
        <div style="padding-left: 10px;">`;

  //matching browser name and version and engine
  if (data.brands && Array.isArray(data.brands)) {
    // Initialize default values
    let browserName = 'Unknown';
    let engineInfo = 'Unknown';
    let brandInfo = 'Unknown';

    // Try to find specific brands
    data.brands.forEach((brand: { brand: string; version: string }) => {
      const brandLower = brand.brand.toLowerCase();

      // matching browser name
      if (
        [
          'google chrome',
          'firefox',
          'opera',
          'brave',
          'microsoft edge',
          'safari',
          'samsung internet',
        ].includes(brandLower)
      ) {
        browserName = `${brand.brand} (version ${brand.version})`;
      }
      // matching browser engines
      else if (['chromium', 'gecko', 'webkit', 'blink'].includes(brandLower)) {
        engineInfo = `${brand.brand} (version ${brand.version})`;
      }
      // matching browser brands
      else if (brandLower.includes('not') && brandLower.includes('brand')) {
        brandInfo = `${brand.brand} (version ${brand.version})`;
      }
    });

    //organising information
    const displayItems = [
      { label: 'Name', value: browserName },
      { label: 'Engine', value: engineInfo },
      { label: 'Brand', value: brandInfo },
    ];

    // Displaying the organised information
    displayItems.forEach(item => {
      formattedHTML += `
        <div style="margin-bottom: 5px; display: flex;">
          <span style="min-width: 120px; font-weight: 500; color: #555555;">${item.label}:</span>
          <span style="color: #333333;">${item.value}</span>
        </div>`;
    });
  }

  // fallback for Firefox and others
  if (data.userAgent) {
    formattedHTML += `
      <div style="margin-bottom: 5px; display: flex;">
        <span style="min-width: 120px; font-weight: 500; color: #555555;">Browser:</span>
        <span style="color: #333333;">${data.userAgent}</span>
      </div>`;
  }

  formattedHTML += `
        </div>
      </div>`;

  // Login Time section
  if (data.dataAndTime) {
    formattedHTML += `
      <div style="margin-bottom: 20px;">
        <h3 style="color: #2d89ef; font-size: 16px; margin-bottom: 10px; font-weight: 600; border-bottom: 1px solid #e0e0e0; padding-bottom: 8px;">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2d89ef" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align: -2px; margin-right: 6px;">
            <circle cx="12" cy="12" r="10"></circle>
            <polyline points="12 6 12 12 16 14"></polyline>
          </svg>
          Login Time
        </h3>
        <div style="padding-left: 10px;">
          <div style="margin-bottom: 5px; display: flex;">
            <span style="min-width: 120px; font-weight: 500; color: #555555;">Date & Time:</span>
            <span style="color: #333333;">${data.dataAndTime}</span>
          </div>
        </div>
      </div>`;
  }

  // Location Information section
  if (data.geoDetails) {
    formattedHTML += `
      <div style="margin-bottom: 20px;">
        <h3 style="color: #2d89ef; font-size: 16px; margin-bottom: 10px; font-weight: 600; border-bottom: 1px solid #e0e0e0; padding-bottom: 8px;">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2d89ef" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align: -2px; margin-right: 6px;">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
            <circle cx="12" cy="10" r="3"></circle>
          </svg>
          Location Information
        </h3>
        <div style="padding-left: 10px;">`;

    if (data.geoDetails.city) {
      formattedHTML += `
          <div style="margin-bottom: 5px; display: flex;">
            <span style="min-width: 120px; font-weight: 500; color: #555555;">City:</span>
            <span style="color: #333333;">${data.geoDetails.city}</span>
          </div>`;
    }

    if (data.geoDetails.country_name) {
      formattedHTML += `
          <div style="margin-bottom: 5px; display: flex;">
            <span style="min-width: 120px; font-weight: 500; color: #555555;">Country:</span>
            <span style="color: #333333;">${data.geoDetails.country_name}</span>
          </div>`;
    }

    if (data.geoDetails.region) {
      formattedHTML += `
          <div style="margin-bottom: 5px; display: flex;">
            <span style="min-width: 120px; font-weight: 500; color: #555555;">Region:</span>
            <span style="color: #333333;">${data.geoDetails.region}</span>
          </div>`;
    }

    if (data.geoDetails.nearestLocation) {
      formattedHTML += `
          <div style="margin-bottom: 5px; display: flex;">
            <span style="min-width: 120px; font-weight: 500; color: #555555;">Nearest:</span>
            <span style="color: #333333;">${data.geoDetails.nearestLocation}</span>
          </div>`;
    }

    formattedHTML += `
        </div>
      </div>`;
  }

  // Device Information section
  formattedHTML += `
      <div style="margin-bottom: 10px;">
        <h3 style="color: #2d89ef; font-size: 16px; margin-bottom: 10px; font-weight: 600; border-bottom: 1px solid #e0e0e0; padding-bottom: 8px;">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2d89ef" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align: -2px; margin-right: 6px;">
            <rect x="4" y="2" width="16" height="20" rx="2" ry="2"></rect>
            <line x1="12" y1="18" x2="12.01" y2="18"></line>
          </svg>
          Device Information
        </h3>
        <div style="padding-left: 10px;">`;

  if (data.language) {
    formattedHTML += `
        <div style="margin-bottom: 5px; display: flex;">
          <span style="min-width: 120px; font-weight: 500; color: #555555;">Language:</span>
          <span style="color: #333333;">${data.language}</span>
        </div>`;
  }

  if (data.mobile !== undefined) {
    formattedHTML += `
        <div style="margin-bottom: 5px; display: flex;">
          <span style="min-width: 120px; font-weight: 500; color: #555555;">Mobile Device:</span>
          <span style="color: #333333;">${data.mobile ? 'Yes' : 'No'}</span>
        </div>`;
  }

  if (data.platform) {
    formattedHTML += `
        <div style="margin-bottom: 5px; display: flex;">
          <span style="min-width: 120px; font-weight: 500; color: #555555;">Platform:</span>
          <span style="color: #333333;">${data.platform}</span>
        </div>`;
  }

  formattedHTML += `
        </div>
      </div>`;

  return formattedHTML;
}

export function userAgentDataEmailTemplate(excerpt: string, userData: any): string {
  // Date
  const date = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'Asia/Kolkata',
  });

  // Time
  const time = new Date().toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
    timeZone: 'Asia/Kolkata',
  });

  // Year
  const year = new Date().getFullYear();

  // Format the user agent data as HTML
  const formattedUserAgentHTML = formatUserAgentDataHTML(userData);

  return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>New Login Detected - KARAN</title>
      </head>
      <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f7f7f7;">
        <div style="max-width: 600px; margin: 20px auto; padding: 0; background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.08);">
          <!-- Header -->
          <div style="background-color: #2d89ef; padding: 25px; text-align: center; border-radius: 8px 8px 0 0;">
            <h1 style="color: #ffffff; margin: 0; font-size: 26px; font-weight: 600; letter-spacing: 1px;">KARAN</h1>
          </div>
          
          <!-- Content -->
          <div style="padding: 35px 30px;">
            <p style="font-size: 14px; color: #777777; margin: 0 0 20px 0;">${date} at ${time} (IST)</p>
            
            
            <p style="font-size: 16px; color: #333333; margin-bottom: 25px; line-height: 1.5;">
              ${excerpt}
            </p>
            
            <div style="background-color: #f9f9f9; border: 1px solid #e5e5e5; padding: 25px; margin: 25px 0; border-radius: 6px;">
              <h2 style="color: #2d89ef; font-size: 18px; margin-top: 0; margin-bottom: 20px; font-weight: 600;">Login Details</h2>
              ${formattedUserAgentHTML}
            </div>
            
            <div style="background-color: #ffedeb; border-left: 4px solid #ff5c53; padding: 18px 20px; margin: 30px 0; border-radius: 4px;">
              <p style="font-size: 15px; color: #333333; margin: 0; line-height: 1.5;">
                <strong>Security Reminder:</strong> If you don't recognize this login activity, please change your password immediately and contact our support team.
              </p>
            </div>
            
            <p style="font-size: 15px; color: #555555; margin-top: 25px; line-height: 1.5;">
              This is an automated security notification. If you require Immediate assistance, please email us at <a href="mailto:support@karan.email" style="color: #2d89ef; text-decoration: none; font-weight: 500;">support@karan.email</a>.
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

// Modified sendUserAgentEmail function to pass the data object directly
export function sendUserDataAgentEmailTemplate(excerpt: string, userData: UserAgentDataPropTypes) {
  const emailHtmlTemplate = userAgentDataEmailTemplate(excerpt, userData);

  return emailHtmlTemplate;
}
