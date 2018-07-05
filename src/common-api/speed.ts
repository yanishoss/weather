import { SpeedUnit } from './speedUnit';

export { SpeedUnit } from './speedUnit';

// This function assumes you are not going to
// convert mi/h to mi/h and
// convert km/h to km/h.
// Stay clever bro.
function convertTo(speed: number, unit: SpeedUnit): number {
  switch (unit) {
    case SpeedUnit.KM_H:
      return speed * 1.60934;
      break;
    case SpeedUnit.MI_H:
      return speed / 1.60934;
      break;
    default:
      return speed;
  }
}

export class Speed {
	private _miPerH: number; // tslint:disable-line
	private _kmPerH: number; // tslint:disable-line

  constructor(speed: number, unit: SpeedUnit) {
    switch (unit) {
      case SpeedUnit.KM_H:
        this._kmPerH = speed;
        this._miPerH = convertTo(speed, SpeedUnit.MI_H);
        break;
      case SpeedUnit.MI_H:
        this._kmPerH = convertTo(speed, SpeedUnit.KM_H);
        this._miPerH = speed;
        break;
      default:
        throw new Error('Unknown unit, please use either KM/H(0) or MI/H(1)');
    }
  }

  public get miPerH(): number {
    return this._miPerH;
  }

  public set miPerH(value: number) {
    this._kmPerH = convertTo(value, SpeedUnit.KM_H);
    this._miPerH = value;
  }

  public get kmPerH(): number {
    return this._kmPerH;
  }

  public set kmPerH(value: number) {
    this._kmPerH = value;
    this._miPerH = convertTo(value, SpeedUnit.MI_H);
  }
}
