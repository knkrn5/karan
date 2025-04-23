interface RemainingTimePropsTypes {
  remainingSeconds: number;
  formattedRemainingTime: string;
}

export function remainingTimeCalculator(timeInSeconds: number) {
  const endTime = Date.now() + timeInSeconds * 1000;

  return function (): RemainingTimePropsTypes {
    const now = Date.now();
    const remainingTime = endTime - now;

    if (remainingTime <= 0) {
      return {
        remainingSeconds: 0,
        formattedRemainingTime: '00: 00',
      };
    }

    const remainingSeconds = Math.floor(remainingTime / 1000);
    const minutes = Math.floor(remainingSeconds / 60);
    const seconds = remainingSeconds % 60;
    const formattedTime = `${minutes}: ${seconds < 10 ? '0' : ''}${seconds} `;

    return {
      remainingSeconds: Math.floor(remainingTime / 1000),
      formattedRemainingTime: formattedTime,
    };
  };
}

// function otpRemainingTimeCounter(reamingOtpTime: number) {
//   const endTime = Date.now() + reamingOtpTime * 1000;

//   const remainingTimeIntervalID = setInterval(() => {
//     const now = Date.now();
//     const remainingMillis = endTime - now;
//     const remainingSeconds = Math.max(Math.floor(remainingMillis / 1000), 0);

//     const minutes = Math.floor(remainingSeconds / 60);
//     const seconds = remainingSeconds % 60;
//     const formattedRemainingTime = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

//     setotptiming(formattedRemainingTime);
//     setResendCooldown(Math.max(remainingSeconds - 240, 0));

//     if (remainingSeconds <= 0) {
//       setotptiming('00:00');
//       setICnotificationMsg({ error: 'OTP expired, Please resend' });
//       clearInterval(remainingTimeIntervalID);
//     }
//   }, 1000);

//   return () => clearInterval(remainingTimeIntervalID);
// }

// function callOtpRemainingTimeCounter(reamingOtpTime: number) {
//   // Clear the previous interval
//   if (otpCleanupRef.current) {
//     otpCleanupRef.current();
//   }
//   const res = otpRemainingTimeCounter(reamingOtpTime);
//   otpCleanupRef.current = res;
// }
