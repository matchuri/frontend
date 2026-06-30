export function startTimer(
    callback: () => void,
    interval: number = 1000
) {
  const timerId = setInterval(callback, interval);

  return () => {
    clearInterval(timerId);
  };
}