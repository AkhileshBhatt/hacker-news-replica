export function timeDifference(date1, date2) {
  var difference = date1 - date2;

  var daysDifference = Math.floor(difference / 1000 / 60 / 60 / 24);
  difference -= daysDifference * 1000 * 60 * 60 * 24;

  var hoursDifference = Math.floor(difference / 1000 / 60 / 60);
  difference -= hoursDifference * 1000 * 60 * 60;

  var minutesDifference = Math.floor(difference / 1000 / 60);
  difference -= minutesDifference * 1000 * 60;

  if (daysDifference > 365) {
    return `${Math.floor(daysDifference / 365)} years`;
  } else if (daysDifference > 30) {
    return `${Math.floor(daysDifference / 30)} months`;
  } else if (hoursDifference > 0) {
    return `${hoursDifference} hours`;
  } else return `${minutesDifference} minutes`;
}

export const saveStateToLocalStorage = (state) => {
  const seralizedState = JSON.stringify(state);
  localStorage.setItem('state', seralizedState);
};

export const loadStateFromLocalStorage = () => {
  const seralizedState = localStorage.getItem('state');
  if (seralizedState === null) return undefined;
  return JSON.parse(seralizedState);
};
