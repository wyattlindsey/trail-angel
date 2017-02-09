import trailCalc from '../trail-calculations';

describe('trail calculations utility module', () => {
  it('estimates hiking time using Naismith\'s rule', () => {
    // 1 hour for every 3 miles and add 1 hour for every 2000 feet (610 meters)
    expect(trailCalc.calcEstimatedTime(610, 3)).toBe('2.0 hrs');
  });

  it('converts meters to feet', () => {
    expect(trailCalc.convertToFeet(1000)).toBeCloseTo(3280.84);
  });

  it('converts miles to kilometers', () => {
    expect(trailCalc.convertToKm(3)).toBeCloseTo(4.83);
  });
});