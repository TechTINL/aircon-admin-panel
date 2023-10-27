export const getTimes = () => {
  const times = [];
  for (let i = 8; i <= 20; i++) {
    times.push(`${i < 13 ? i : i - 12}:00 ${i < 12 ? 'AM' : 'PM'}`);
    times.push(`${i < 13 ? i : i - 12}:30 ${i < 12 ? 'AM' : 'PM'}`);
  }
  return times;
};
