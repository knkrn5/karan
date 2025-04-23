import { useICnotificationMsgStore } from '../components/stores/ICnotificationMsgStore';
import { useRemainingTimeCalculatorStore } from '../components/stores/remainingTimeCalculatorStore';

interface RemainingTimePropsTypes {
  remainingSeconds: number;
  formattedRemainingTime: string;
}

function remainingTimeCalculator(timeInSeconds: number) {
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

    //formatting the remaining time in minutes and seconds
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

export function remainingTimeCounter(timeInSeconds: number, cooldownTime: number) {
  // Clear any existing interval, if exists
  const remainingTimeCounterinterval =
    useRemainingTimeCalculatorStore.getState().clearRemainingTimeInterval;
  if (typeof remainingTimeCounterinterval === 'function') {
    remainingTimeCounterinterval();
  }

  const remainingTimeCounterInnerFn = remainingTimeCalculator(timeInSeconds);

  const remainingTimeCounterIntervalID = setInterval(() => {
    const { remainingSeconds, formattedRemainingTime } = remainingTimeCounterInnerFn();

    useRemainingTimeCalculatorStore
      .getState()
      .setRemainingSeconds(Math.max(remainingSeconds - cooldownTime, 0));
    useRemainingTimeCalculatorStore.getState().setFormattedRemainingTime(formattedRemainingTime);

    if (remainingSeconds <= 0) {
      useICnotificationMsgStore.getState().setICnotificationMsg({
        info: 'OTP expired, Please resend',
      });
      useRemainingTimeCalculatorStore.getState().resetRemainingTimeCalculatorStore();
      clearInterval(remainingTimeCounterIntervalID);
    }
  }, 1000);

  useRemainingTimeCalculatorStore
    .getState()
    .setclearRemainingTimeInterval(() => clearInterval(remainingTimeCounterIntervalID));
}
