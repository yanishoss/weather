"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const cosmiconfig_1 = __importDefault(require("cosmiconfig"));
const public_ip_1 = require("public-ip");
const cache_1 = require("./cache");
const direction_1 = require("./direction");
const speed_1 = require("./speed");
const temperature_1 = require("./temperature");
const { searchSync } = cosmiconfig_1.default('weather-cli');
const conf = searchSync();
const cache = new cache_1.Cache();
let httpConfig = {
    baseURL: 'http://dataservice.accuweather.com',
};
if (conf && conf.config) {
    httpConfig = Object.assign({}, conf.config.httpClient);
}
async function getClientLocation(axiosInstance) {
    const ip = await public_ip_1.v4();
    const response = await axiosInstance.get('/locations/v1/cities/ipaddress', {
        params: {
            q: ip,
        },
    });
    return {
        city: response.data.LocalizedName,
        key: response.data.Key,
    };
}
async function getLocation(location, axiosInstance) {
    const response = await axiosInstance.get('/locations/v1/search', {
        params: {
            q: location,
        },
    });
    return { key: response.data[0].Key, city: response.data[0].LocalizedName };
}
function responseToIWeatherCondition(obj) {
    return {
        city: obj.City,
        cloudCover: obj.CloudCover,
        date: new Date(obj.LocalObservationDateTime),
        humidity: obj.RelativeHumidity,
        icon: obj.WeatherIcon,
        isDaylight: obj.IsDayTime,
        phrase: obj.WeatherText,
        realFeelTemperature: new temperature_1.Temperature(obj.RealFeelTemperature.Metric.Value, temperature_1.TemperatureUnit.CELSIUS),
        temperature: new temperature_1.Temperature(obj.Temperature.Metric.Value, temperature_1.TemperatureUnit.CELSIUS),
        wind: {
            direction: new direction_1.Direction(obj.Wind.Direction.Degrees, obj.Wind.Direction.Localized),
            speed: new speed_1.Speed(obj.Wind.Speed.Metric.Value, speed_1.SpeedUnit.KM_H),
        },
    };
}
class WeatherClient {
    constructor(key) {
        this.httpClient = axios_1.default.create(httpConfig);
        this
            .httpClient
            .defaults
            .params = Object.assign({}, this.httpClient.defaults.params, { apikey: key });
    }
    async getCurrentWeather(location) {
        if (!location) {
            const lastLocationCheck = new Date(cache.fetch('lastLocationCheck') || 0);
            const checkValidityStamp = lastLocationCheck.getTime() + 1000 * 60 * 60;
            if (checkValidityStamp > Date.now()) {
                const lastUserWeather = cache
                    .fetch('lastUserWeather');
                if (lastUserWeather) {
                    lastUserWeather.date = new Date(lastUserWeather.date);
                    if (lastUserWeather.date.getTime() + 1000 * 60 * 60 > Date.now()) {
                        return lastUserWeather;
                    }
                }
            }
            const clientLocation = await getClientLocation(this.httpClient)
                .catch(() => {
                throw new Error('Cannot get the client location');
            });
            cache.push('lastLocationCheck', new Date(Date.now()).getTime());
            const responseFromUserLocation = await this
                .httpClient
                .get(`/currentconditions/v1/${clientLocation.key}.json`, {
                params: {
                    details: true,
                },
            })
                .catch((err) => {
                throw new Error(`Cannot get the current condition. Here is the error: ${err}`);
            });
            const userWeather = responseToIWeatherCondition(Object.assign({}, responseFromUserLocation.data[0], { City: clientLocation.city }));
            cache.push('lastUserWeather', Object.assign({}, userWeather, { date: userWeather.date.getTime() }));
            return userWeather;
        }
        const responsesFromCache = cache
            .fetch('results');
        const responseFromCache = responsesFromCache
            ? responsesFromCache[location]
            : undefined;
        if (responseFromCache) {
            responseFromCache.date = new Date(responseFromCache.date);
            if (responseFromCache.date.getTime() + 1000 * 60 * 60 > Date.now()) {
                return responseFromCache;
            }
        }
        const localization = await getLocation(location, this.httpClient)
            .catch((err) => {
            throw new Error(`Cannot get the location you provided. Here is the error: ${err}`);
        });
        const responseFromLocation = await this
            .httpClient
            .get(`/currentconditions/v1/${localization.key}.json`, {
            params: {
                details: true,
            },
        })
            .catch((err) => {
            throw new Error(`Cannot get the current condition of the provided location.
        Here is the error: ${err}`);
        });
        const locationWeather = responseToIWeatherCondition(Object.assign({}, responseFromLocation.data[0], { City: localization.city }));
        cache.push('results', Object.assign({}, responsesFromCache, { [location]: Object.assign({}, locationWeather, { date: locationWeather.date.getTime() }) }));
        return locationWeather;
    }
}
exports.WeatherClient = WeatherClient;
