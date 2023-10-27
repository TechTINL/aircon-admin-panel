export const formatTime = time => {
  const [hour, min] = time.split(':');
  if (Number(hour) <= 12) {
    return time + ' AM';
  }
  return `${Number(hour) - 12}:${min} PM`;
};
