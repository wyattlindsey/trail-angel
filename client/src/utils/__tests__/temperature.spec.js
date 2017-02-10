'use strict';

import temperature from '../temperature';

describe('temperature conversion module', () => {
  it('converts fahrenheit degrees to celsius', () => {
    expect(temperature.convertToCelcius(40)).toBeCloseTo(4.44444);
  });

  it('converts celsius degrees to fahrenheit', () => {
    expect(temperature.convertToFahrenheit(40)).toBe(104);
  });
});