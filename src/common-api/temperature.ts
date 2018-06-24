import { TemperatureUnit } from './temperatureUnit';

// This function assumes you are not going to
// convert celsius to celsius or fahrenheit to fahrenheit.
function convertTo(temperature: number, toUnit: TemperatureUnit): number {
  switch (toUnit) {
    case TemperatureUnit.CELSIUS:
      return temperature * -17.22;
    case TemperatureUnit.FAHRENHEIT:
      return temperature / -17.22;
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
        throw new Error('Unknown unit, please use either Farenheit (1) or Celsius(0)');
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
