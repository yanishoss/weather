import { Speed, SpeedUnit } from './speed';

describe('Transpiles and returns the speed', () => {
  let speedMi: Speed;
  let speedKm: Speed;

  beforeEach(() => {
    speedMi = new Speed(20, SpeedUnit.KM_H);
    speedKm = new Speed(12.4274, SpeedUnit.MI_H);
  });

  test('in km/h', () => {
    expect(speedMi.kmPerH).toBeCloseTo(20);
    expect(speedKm.miPerH).toBeCloseTo(12.4274);
  });

  test('in mi/h', () => {
    expect(speedMi.kmPerH).toBeCloseTo(20);
    expect(speedKm.miPerH).toBeCloseTo(12.4274);
  });
});

describe('Allows us to modify the speed and converts it', () => {
  let speedMi: Speed;
  let speedKm: Speed;

  beforeEach(() => {
    speedMi = new Speed(20, SpeedUnit.KM_H);
    speedKm = new Speed(12.4274, SpeedUnit.MI_H);
  });

  test('in km/h', () => {
    speedMi.kmPerH = 40;
    expect(speedMi.kmPerH).toBeCloseTo(40);
    expect(speedMi.miPerH).toBeCloseTo(24.8548);
  });

  test('in mi/h', () => {
    speedKm.miPerH = 24.8548;
    expect(speedKm.kmPerH).toBeCloseTo(40);
    expect(speedKm.miPerH).toBeCloseTo(24.8548);
  });
});
