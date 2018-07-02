import { IWeatherCondition } from './weatherCondition';
export declare class WeatherClient {
    private httpClient;
    constructor(key: string);
    getCurrentWeather(location?: string): Promise<IWeatherCondition>;
}
//# sourceMappingURL=weatherClient.d.ts.map