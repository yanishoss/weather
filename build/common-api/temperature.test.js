"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const temperature_1 = require("./temperature");
describe('Transpiles and returns the temperature', () => {
    let temperatureC;
    let temperatureF;
    beforeEach(() => {
        temperatureC = new temperature_1.Temperature(20, temperature_1.TemperatureUnit.CELSIUS);
        temperatureF = new temperature_1.Temperature(68, temperature_1.TemperatureUnit.FAHRENHEIT);
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
    let temperatureC;
    let temperatureF;
    beforeEach(() => {
        temperatureC = new temperature_1.Temperature(20, temperature_1.TemperatureUnit.CELSIUS);
        temperatureF = new temperature_1.Temperature(68, temperature_1.TemperatureUnit.FAHRENHEIT);
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
