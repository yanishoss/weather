import { TemperatureUnit } from './temperatureUnit';

export { TemperatureUnit } from './temperatureUnit';

// This function assumes you are not going to
// convert celsius to celsius and
// convert fahrenheit to fahrenheit.
// Stay clever bro.
function convertTo(temperature: number, toUnit: TemperatureUnit): number {
  switch (toUnit) {
    case TemperatureUnit.CELSIUS:
      return (temperature - 32) / 1.8;
    case TemperatureUnit.FAHRENHEIT:
      return (temperature * 1.8) + 32;
    default:
      return temperature;
  }
}

export class Temperature {
	private _celsius: number; // tslint:disable-line
	private _fahrenheit: number; // tslint:disable-line

  public constructor(temperature: number, unit: TemperatureUnit) {
    switch (unit) {
      case TemperatureUnit.CELSIUS:
        this._celsius = temperature;
        this._fahrenheit = convertTo(temperature, TemperatureUnit.FAHRENHEIT);
        break;
      case TemperatureUnit.FAHRENHEIT:
        this._celsius = convertTo(temperature, TemperatureUnit.CELSIUS);
        this._fahrenheit = temperature;
        break;
      default:
        throw new Error('Unknown unit, please use either Celsius(0) or Fahrenheit(1)');
    }
  }

  public get celsius(): number {
    return this._celsius;
  }

  public set celsius(value: number) {
    this._celsius = value;
    this._fahrenheit = convertTo(value, TemperatureUnit.FAHRENHEIT);
  }

  public get fahrenheit(): number {
    return this._fahrenheit;
  }

  public set fahrenheit(value: number) {
    this._celsius = convertTo(value, TemperatureUnit.CELSIUS);
    this._fahrenheit = value;
  }
}
