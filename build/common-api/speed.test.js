"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const speed_1 = require("./speed");
describe('Transpiles and returns the speed', () => {
    let speedMi;
    let speedKm;
    beforeEach(() => {
        speedMi = new speed_1.Speed(20, speed_1.SpeedUnit.KM_H);
        speedKm = new speed_1.Speed(12.4274, speed_1.SpeedUnit.MI_H);
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
    let speedMi;
    let speedKm;
    beforeEach(() => {
        speedMi = new speed_1.Speed(20, speed_1.SpeedUnit.KM_H);
        speedKm = new speed_1.Speed(12.4274, speed_1.SpeedUnit.MI_H);
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
