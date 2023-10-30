export const formatTime = time => {
  const [hour, min] = time.split(':');
  if (Number(hour) <= 12) {
    return time + ' AM';
  }
  return `${Number(hour) - 12}:${min} PM`;
};


export const getServiceStatusStyles = (status) => {
    switch (status) {
        case 'UNASSIGNED': return {
            backgroundColor: '#D9D9D9',
            color: '#53616C',

        };
        case 'SCHEDULED': return {
            backgroundColor: '#D4F1F3',
            color: '#00B4AD',
        };
        case 'ON_HOLD': return {
            backgroundColor: '#D3D7F5',
            color: '#454FA2',
        };
        case 'COMPLETED': return {
            backgroundColor: '#00B4AD',
            color: '#FFFFFF',
        };
        case 'REQUIRE_FOLLOW_UP': return {
            backgroundColor: '#DD4949',
            color: '#FFFFFF',
        };
        case 'FOLLOW_UP_COMPLETED': return {
            backgroundColor: '#6CC294',
            color: '#FFFFFF',
        };
        default: return {
            backgroundColor: '#D9D9D9',
            color: '#53616C',

        };
    }
}

