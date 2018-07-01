import { Temperature, TemperatureUnit } from './temperature';

describe('Transpiles and returns the temperature', () => {
  let temperatureC: Temperature;
  let temperatureF: Temperature;

  beforeEach(() => {
    temperatureC = new Temperature(20, TemperatureUnit.CELSIUS);
    temperatureF = new Temperature(68, TemperatureUnit.FAHRENHEIT);
  });

  test('in celsius', () => {
    expect(temperatureC.celsius).toEqual(20);
    expect(temperatureF.celsius).toEqual(20);
  });

  test('in fahrenheit', () => {
    expect(temperatureC.fahrenheit).toEqual(68);
    expect(temperatureF.celsius).toEqual(20);
  });
});

describe('Allows us to modify the temperature and converts it', () => {
  let temperatureC: Temperature;
  let temperatureF: Temperature;

  beforeEach(() => {
    temperatureC = new Temperature(20, TemperatureUnit.CELSIUS);
    temperatureF = new Temperature(68, TemperatureUnit.FAHRENHEIT);
  });

  test('in celsius', () => {
    temperatureC.celsius = 40;
    expect(temperatureC.celsius).toEqual(40);
    expect(temperatureC.fahrenheit).toEqual(104);
  });

  test('in fahrenheit', () => {
    temperatureF.fahrenheit = 104;
    expect(temperatureF.celsius).toEqual(40);
    expect(temperatureF.fahrenheit).toEqual(104);
  });
});
