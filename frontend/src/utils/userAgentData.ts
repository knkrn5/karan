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
  };
}

// const FALLBACK_IP = '2409:40d0:10cc:2121:14de:63:4b89:ba14';
const ACCESS_KEY = 'f95a50c2-dc84-4ec5-9e30-eb2466051980';

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
    const url = 'https://apiip.net/api/check?ip=' + userIpAddress + '&accessKey=' + ACCESS_KEY;

    // Make a request and store the response
    const response = await axios(url);

    const geoData = response.data;
    console.log(geoData);
    return {
      country_name: geoData.countryName,
      region: geoData.regionName,
      city: geoData.city,
    };
  } catch (err) {
    console.error('Error fetching geo data:', err);
    return {
      country_name: 'unknow country',
      region: 'unknow region',
      city: 'unknow city',
    };
  }
}

//user agent data
export async function getUserAgentData() {
  const data = {} as UserAgentDataPropTypes;

  //date and time
  const dataAndTime = new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata' });
  data.dataAndTime = dataAndTime;

  const userGeoDetails = await getGeoDetails();

  if (userGeoDetails) {
    data.geoDetails = userGeoDetails;
  }

  // Modern userAgentData (Chrome 89+)
  if ('userAgentData' in navigator) {
    const ua = navigator.userAgentData as UserAgentDataPropTypes;

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

//===========ONLY LOCAL PACKAGES WAY TO GET THE GEO INFO, NO EXTERNAL API==================//
/* import geoip from 'geoip-lite';
import csc from 'country-state-city';
const { Country, State } = csc;

const ipAddress = "2409:40d0:10cc:2121:14de:63:4b89:ba14";
// const ipAddress = "127.0.0.1";

try {
    const geo = geoip.lookup(ipAddress);

    if (!geo) {
        throw new Error("Geo data not found for the IP address.");
    }

    const countryCode = geo.country;
    const regionCode = geo.region;
    const city = geo.city;

    const country = Country.getCountryByCode(countryCode);
    const state = State.getStateByCodeAndCountry(regionCode, countryCode);

    if (!country || !state) {
        throw new Error("Country or state not found for the given codes.");
    }

    console.log(`${country.name}, ${state.name}, ${city}`);
} catch (error) {
    console.error("Error fetching location info:", error.message);
} */
