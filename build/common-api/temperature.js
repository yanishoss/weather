"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const temperatureUnit_1 = require("./temperatureUnit");
var temperatureUnit_2 = require("./temperatureUnit");
exports.TemperatureUnit = temperatureUnit_2.TemperatureUnit;
function convertTo(temperature, toUnit) {
    switch (toUnit) {
        case temperatureUnit_1.TemperatureUnit.CELSIUS:
            return (temperature - 32) / 1.8;
        case temperatureUnit_1.TemperatureUnit.FAHRENHEIT:
            return (temperature * 1.8) + 32;
        default:
            return temperature;
    }
}
class Temperature {
    constructor(temperature, unit) {
        switch (unit) {
            case temperatureUnit_1.TemperatureUnit.CELSIUS:
                this._celsius = temperature;
                this._fahrenheit = convertTo(temperature, temperatureUnit_1.TemperatureUnit.FAHRENHEIT);
                break;
            case temperatureUnit_1.TemperatureUnit.FAHRENHEIT:
                this._celsius = convertTo(temperature, temperatureUnit_1.TemperatureUnit.CELSIUS);
                this._fahrenheit = temperature;
                break;
            default:
                throw new Error('Unknown unit, please use either Celsius(0) or Fahrenheit(1)');
        }
    }
    get celsius() {
        return this._celsius;
    }
    set celsius(value) {
        this._celsius = value;
        this._fahrenheit = convertTo(value, temperatureUnit_1.TemperatureUnit.FAHRENHEIT);
    }
    get fahrenheit() {
        return this._fahrenheit;
    }
    set fahrenheit(value) {
        this._celsius = convertTo(value, temperatureUnit_1.TemperatureUnit.CELSIUS);
        this._fahrenheit = value;
    }
}
exports.Temperature = Temperature;
