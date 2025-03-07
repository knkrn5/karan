/* function setWithExpiry(key, value, ttl) {
    const now = new Date();
    const item = {
        value: value,
        expiry: now.getTime() + ttl, // Set expiry time
    };
    localStorage.setItem(key, JSON.stringify(item));
}

function getWithExpiry(key) {
    const itemStr = localStorage.getItem(key);
    if (!itemStr) return null;

    const item = JSON.parse(itemStr);
    const now = new Date();

    if (now.getTime() > item.expiry) {
        localStorage.removeItem(key); // Remove expired data
        return null;
    }
    return item.value;
}

// Store data for 15 minutes (900,000 milliseconds)
setWithExpiry("myData", { user: "Karan" }, 15 * 60 * 1000);

// Retrieve data
const data = getWithExpiry("myData");
console.log(data); // Returns data if not expired, otherwise null
 */