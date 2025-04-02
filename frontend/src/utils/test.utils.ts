setInterval(() => {
  const isSession = JSON.parse(localStorage.getItem('session') || 'null');
  const tokenExpirationTime = new Date(isSession * 1000);
  const fiveMinBeforeTokenExpiration = tokenExpirationTime.getTime() - 5 * 60 * 1000;
  const currentTime = new Date();
  const remainingTime = fiveMinBeforeTokenExpiration - currentTime.getTime();
  console.log('remainingTime', remainingTime);
}, 2000);
