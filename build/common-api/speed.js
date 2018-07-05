"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const speedUnit_1 = require("./speedUnit");
var speedUnit_2 = require("./speedUnit");
exports.SpeedUnit = speedUnit_2.SpeedUnit;
function convertTo(speed, unit) {
    switch (unit) {
        case speedUnit_1.SpeedUnit.KM_H:
            return speed * 1.60934;
            break;
        case speedUnit_1.SpeedUnit.MI_H:
            return speed / 1.60934;
            break;
        default:
            return speed;
    }
}
class Speed {
    constructor(speed, unit) {
        switch (unit) {
            case speedUnit_1.SpeedUnit.KM_H:
                this._kmPerH = speed;
                this._miPerH = convertTo(speed, speedUnit_1.SpeedUnit.MI_H);
                break;
            case speedUnit_1.SpeedUnit.MI_H:
                this._kmPerH = convertTo(speed, speedUnit_1.SpeedUnit.KM_H);
                this._miPerH = speed;
                break;
            default:
                throw new Error('Unknown unit, please use either KM/H(0) or MI/H(1)');
        }
    }
    get miPerH() {
        return this._miPerH;
    }
    set miPerH(value) {
        this._kmPerH = convertTo(value, speedUnit_1.SpeedUnit.KM_H);
        this._miPerH = value;
    }
    get kmPerH() {
        return this._kmPerH;
    }
    set kmPerH(value) {
        this._kmPerH = value;
        this._miPerH = convertTo(value, speedUnit_1.SpeedUnit.MI_H);
    }
}
exports.Speed = Speed;
