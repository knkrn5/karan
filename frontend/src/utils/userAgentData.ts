import axios from 'axios';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

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

const APIIP_KEY = import.meta.env.VITE_APIIP_KEY;
const OPENCAGE_KEY = import.meta.env.VITE_OPENCAGE_KEY;

async function getUserIpAddress() {
  try {
    const response = await axios.post(`${BACKEND_URL}/api/v1/auth/get-user-ip-address`);
    return response.data?.ip;
  } catch (error) {
    console.error('Error fetching IP address:', error);
    return null;
  }
}

async function getGeoDetails() {
  const userIpAddress = await getUserIpAddress();

  if (!userIpAddress) return null;

  try {
    const url = 'https://apiip.net/api/check?ip=' + userIpAddress + '&accessKey=' + APIIP_KEY;

    // Make a request and store the response
    const response = await axios(url);

    const geoData = response.data;

    const lat = geoData.latitude;
    const lon = geoData.longitude;

    //user exact location
    const exactGeoData = await getExactGeoDetails(lat, lon);

    return {
      country_name: geoData.countryName,
      region: geoData.regionName,
      city: geoData.city,
      nearestLocation: exactGeoData,
    };
  } catch (err) {
    console.error('Error fetching geo data:', err);
    return {
      country_name: 'unknow',
      region: 'unknow',
      city: 'unknow',
      nearestLocation: 'unknow',
    };
  }
}

async function getExactGeoDetails(lat: number, lon: number) {
  try {
    /* const response = await axios(
      `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`
    ); */

    const response = await axios(
      `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lon}&key=${OPENCAGE_KEY}`
    );

    const geoData = response.data;
    return geoData.display_name;
  } catch (error) {
    console.error('Error fetching exact geo data:', error);
    return 'unknow location';
  }
}

//user agent data
export async function getUserAgentData() {
  const userAgentData = {} as UserAgentDataPropTypes;

  //date and time
  const dataAndTime = new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata' });
  userAgentData.dataAndTime = dataAndTime;

  const userGeoDetails = await getGeoDetails();

  if (userGeoDetails) {
    userAgentData.geoDetails = userGeoDetails;
  }

  // Modern userAgentData (Chrome 89+)
  if ('userAgentData' in navigator) {
    const ua = navigator.userAgentData as UserAgentDataPropTypes;
    const navigatorInfo = navigator;

    userAgentData.brands = ua.brands || [];
    userAgentData.mobile = ua.mobile;
    userAgentData.platform = ua.platform;
    userAgentData.language = navigatorInfo.language;
  } else {
    throw new Error('User agent data is not available');
  }

  return userAgentData;
}

export async function sendUserAgentDataEmail(email: string, subject: string, excerpt: string) {
  const userAgentData = await getUserAgentData();
  try {
    await axios.post(`${BACKEND_URL}/api/email-notifications/email-user-agent-data`, {
      email,
      subject,
      excerpt,
      userAgentData: userAgentData,
    });
  } catch (error) {
    console.error('Error sending user agent data:', error);
    return null;
  }
}

//===========ONLY LOCAL PACKAGES WAY TO GET THE GEO INFO, NO EXTERNAL API==================//
/* const geoip = require('geoip-lite');
const NodeGeocoder = require('node-geocoder');

// Declare geocoder 
const geocoderOptions = {
    provider: 'openstreetmap',
};
const geocoder = NodeGeocoder(geocoderOptions);

const ip = "2409:40d0:10cc:2121:14de:63:4b89:ba14";
const geo = geoip.lookup(ip);

if (geo) {
    console.log("Latitude:", geo.ll[0]);
    console.log("Longitude:", geo.ll[1]);

    const lat = geo.ll[0];
    const lon = geo.ll[1];

    getAddress(lat, lon);
} else {
    console.log("Geo data not found for the IP address.");
}

// Define function after everything is ready
async function getAddress(lat, lon) {
    try {
        const res = await geocoder.reverse({ lat, lon });
        if (res.length > 0) {
            console.log("📍 node-geocoder:", res[0].formattedAddress);
        } else {
            console.log("❌ node-geocoder: No address found.");
        }
    } catch (err) {
        console.log("❌ Error in reverse geocoding:", err.message);
    }
} */

//===============================================================
