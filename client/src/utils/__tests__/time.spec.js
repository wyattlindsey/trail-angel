'use strict';

import time from '../time';

describe('time module', () => {

  const offset = new Date().getTimezoneOffset() - 480;
  const timestamp = 1486614793;
  const offsetTimestamp = timestamp + (offset * 60);

  it('returns the weekday for a timestamp', () => {
    expect(time.weekday(1486614793)).toBe('Thursday');
  });

  it('returns the day of week for a timestamp', () => {
    expect(time.dayOfWeek(1486614793)).toBe(3);
  });

  it('returns the hour of day for a timestamp', () => {
    expect(time.hourOfDay(offsetTimestamp)).toBe(20);
  });

  it('returns elapsed time in milliseconds between two timestamps', () => {
    expect(time.elapsedTime(1486614793, 1486614783)).toBe(10);
  });

  it('returns formatted day and month for timestamp', () => {
    expect(time.formattedDayAndMonth(offsetTimestamp)).toBe('8 Feb');
  });

  it('returns formatted time and date for timestamp', () => {
    expect(time.formattedDateAndTime(offsetTimestamp)).toBe('8 Feb 2017 8:33 PM');
    expect(time.formattedDateAndTime(offsetTimestamp, { offset: 2 }))
      .toBe('8 Feb 2017 10:33 PM');
    expect(time.formattedDateAndTime(offsetTimestamp, { twelveHour: false }))
      .toBe('8 Feb 2017 20:33');
    expect(time.formattedDateAndTime(offsetTimestamp, { twelveHour: false, offset: 2 }))
      .toBe('8 Feb 2017 22:33');
  });

  it('returns formatted time using 12-hour clock for timestamp', () => {
    expect(time.formatted12HourTime(offsetTimestamp)).toBe('8:33 PM');
    expect(time.formatted12HourTime(offsetTimestamp, 1)).toBe('9:33 PM');
  });

  it('returns formatted time using 24-hour clock for timestamp', () => {
    expect(time.formatted24HourTime(offsetTimestamp)).toBe('20:33');
    expect(time.formatted24HourTime(offsetTimestamp, 1)).toBe('21:33');
  });
});