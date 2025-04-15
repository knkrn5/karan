interface UserAgentData {
  brands?: { brand: string; version: string }[];
  mobile?: boolean;
  platform?: string;
  userAgent?: string;
  language?: string;
}

//user agent data
function getUserAgentData() {
  const data = {} as UserAgentData;

  // Modern userAgentData (Chrome 89+)
  if ('userAgentData' in navigator) {
    const ua = navigator.userAgentData as UserAgentData;

    data.brands = ua.brands || [];
    data.mobile = ua.mobile;
    data.platform = ua.platform;
  }

  // Fallback for older browsers
  data.userAgent = navigator.userAgent;
  data.language = navigator.language;
  data.platform = navigator.platform;

  return data;
}
const res = getUserAgentData();
console.log('User Agent Data:', res);
