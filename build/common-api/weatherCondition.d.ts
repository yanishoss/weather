import { Temperature } from './temperature';
import { Wind } from './wind';
export interface IWeatherCondition {
    city: string;
    date: Date;
    icon: number;
    phrase: string;
    isDaylight: boolean;
    temperature: Temperature;
    realFeelTemperature: Temperature;
    humidity: number;
    wind: Wind;
    cloudCover: number;
}
//# sourceMappingURL=weatherCondition.d.ts.map