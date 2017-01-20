'use strict';

const monthsAbbreviated = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                           'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const months = ['January', 'February', 'March', 'April', 'May', 'June',
                'July', 'August', 'September', 'October', 'November', 'December'];
const daysOfTheWeek = ['Monday', 'Tuesday', 'Wednesday',
                       'Thursday', 'Friday', 'Saturday', 'Sunday'];

const time = {

  weekday: (UNIX_timestamp, offset = 0) => {
    const date = new Date(UNIX_timestamp * 1000 + (offset * 3600000));
    return daysOfTheWeek[date.getDay()];
  },

  dayOfWeek: (UNIX_timestamp, offset = 0) => {
    const date = new Date(UNIX_timestamp * 1000 + (offset * 3600000));
    return date.getDay();
  },

  hourOfDay: (UNIX_timestamp, offset = 0) => {
    const date = new Date(UNIX_timestamp * 1000 + (offset * 3600000));
    return date.getHours();
  },

  elapsedTime: (beginningTimestamp, endingTimestamp) => {
    return beginningTimestamp - endingTimestamp;
  },

  formattedDayAndMonth: (UNIX_timestamp, offset = 0) => {
    const date = new Date(UNIX_timestamp * 1000 + (offset * 3600000));
    const day = weekday(date.getDay());
    const month = monthsAbbreviated[date.getMonth()];
    return `${day} ${month}`;
  },

  formattedDateAndTime: (UNIX_timestamp, offset = 0) => {
    const date = new Date(UNIX_timestamp * 1000 + (offset * 3600000));
    const year = date.getFullYear();
    const month = monthsAbbreviated[date.getMonth()];
    const day = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    return `${day} ${month} ${year} ${hours}:${minutes}:${seconds}`;
  },

  formatted12HourTime: (UNIX_timestamp, offset = 0) => {
    const date = new Date(UNIX_timestamp * 1000 + (offset * 3600000));
    let hours = date.getHours() > 12 ? (date.getHours() - 12) : date.getHours();
    hours = hours === 0 ? 12 : hours;
    const minutes = date.getMinutes() < 10 ? ('0' + date.getMinutes()) : date.getMinutes();
    const ampm = date.getHours() < 12 ? 'AM' : 'PM';
    return `${hours}:${minutes} ${ampm}`;
  },

  formatted24HourTime: (UNIX_timestamp, offset = 0) => {
    const date = new Date(UNIX_timestamp * 1000 + (offset * 3600000));
    const hours = date.getHours();
    const minutes = date.getMinutes() < 10 ? ('0' + date.getMinutes()) : date.getMinutes();
    return `${hours}:${minutes}`;
  }
};

export default time;