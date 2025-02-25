export const formatTime = timeString => {
  if (typeof timeString === 'string') {
    // Ensure the time string is in the format "HH:MM"
    let [hour, min] = timeString.split(':');
    hour = parseInt(hour, 10);

    // Check if minutes are provided, if not, default to '00'
    min = min ? parseInt(min, 10) : 0;

    // Convert 24-hour time to 12-hour format
    const ampm = hour >= 12 ? 'PM' : 'AM';
    hour %= 12;
    hour = hour || 12; // Convert '0' hour to '12'

    // Format minutes to always be two digits
    const minutes = min < 10 ? `0${min}` : min;

    return `${hour}:${minutes} ${ampm}`;
  }

  // If input is not a string, return an empty string or a default value
  return '';
};

export const formatDateTime = datetimeStr => {
  const date = new Date(datetimeStr);
  const now = new Date();
  const diffMs = now - date; // difference in milliseconds
  const diffSec = Math.round(diffMs / 1000);
  const diffMin = Math.round(diffSec / 60);
  const diffHour = Math.round(diffMin / 60);
  const diffDay = Math.round(diffHour / 24);

  if (diffMs < 1000 * 60) {
    // less than 1 min
    return 'just now';
  }
  if (diffMin < 60) {
    // less than 1 hour
    return `${diffMin} minute${diffMin > 1 ? 's' : ''} ago`;
  }
  if (diffHour < 24) {
    // less than 1 day
    return `${diffHour} hour${diffHour > 1 ? 's' : ''} ago`;
  }
  if (diffDay === 1) {
    // yesterday
    return `yesterday at ${formatTime(date)}`;
  }
  // older than yesterday, show formatted date and time
  // Options for toLocaleDateString()
  const dateOptions = { year: 'numeric', month: 'long', day: 'numeric' };
  const formattedDate = date.toLocaleDateString('en-US', dateOptions);
  const formattedTime = formatTime(date);

  return `${formattedDate} at ${formattedTime}`;
};

export const getServiceStatusStyles = status => {
  switch (status) {
    case 'UNASSIGNED':
      return {
        backgroundColor: '#D9D9D9',
        color: '#53616C',
      };
    case 'SCHEDULED':
      return {
        backgroundColor: '#D4F1F3',
        color: '#00B4AD',
      };
    case 'ON_HOLD':
      return {
        backgroundColor: '#D3D7F5',
        color: '#454FA2',
      };
    case 'COMPLETED':
      return {
        backgroundColor: '#00B4AD',
        color: '#FFFFFF',
      };
    case 'REQUIRE_FOLLOW_UP':
      return {
        backgroundColor: '#DD4949',
        color: '#FFFFFF',
      };
    case 'FOLLOW_UP_COMPLETED':
      return {
        backgroundColor: '#6CC294',
        color: '#FFFFFF',
      };
    default:
      return {
        backgroundColor: '#D9D9D9',
        color: '#53616C',
      };
  }
};

export const app_url = data => {
  return `${import.meta.env.VITE_STORAGE_URL}/${data}`;
};
