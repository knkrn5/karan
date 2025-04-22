import { useEffect, useState } from 'react';

export default function OtpRemainingTimeCounter(reamingOtpTime: number) {
  const [otpRemainingTime, setOtpRemainingTime] = useState('');

  useEffect(() => {
    let remainingSeconds = reamingOtpTime;

    //formatting the remaining time in mm:ss format
    let formattedRemaingTime = `${Math.floor(remainingSeconds / 60)}:${
      remainingSeconds % 60 < 10 ? '0' : ''
    }${remainingSeconds % 60}`;

    setOtpRemainingTime(formattedRemaingTime);

    const interval = setInterval(() => {
      remainingSeconds--;

      //updating formatted time
      formattedRemaingTime = `${Math.floor(remainingSeconds / 60)}:${
        remainingSeconds % 60 < 10 ? '0' : ''
      }${remainingSeconds % 60}`;

      setOtpRemainingTime(formattedRemaingTime);

      //clearing the interval when remaining time is 0 or less
      if (remainingSeconds <= 0) {
        clearInterval(interval);
      }
    }, 1000);

    // Cleanup function
    return () => {
      clearInterval(interval);
    };
  }, [reamingOtpTime]);

  return <div className="text-white">remaining Time: {otpRemainingTime}</div>;
}

