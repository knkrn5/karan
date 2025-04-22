export function remainingTimeCounter(time: number) {
  const endTime = Date.now() + time * 1000;

  return function () {
    const now = Date.now();
    const remainingTime = endTime - now;

    if (remainingTime <= 0) {
      return 0;
    }

    return Math.floor(remainingTime / 1000);
  };
}
