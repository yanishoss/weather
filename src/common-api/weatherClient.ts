import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import cosmiconfig, { CosmiconfigResult, Explorer } from 'cosmiconfig';
import { v4 } from 'public-ip';

import { Cache } from './cache';
import { Direction } from './direction';
import { Speed, SpeedUnit } from './speed';
import { Temperature, TemperatureUnit } from './temperature';
import { IWeatherCondition } from './weatherCondition';

const { searchSync }: Explorer = cosmiconfig('weather-cli');

const conf: CosmiconfigResult = searchSync();

const cache: Cache = new Cache();

let httpConfig: AxiosRequestConfig = {
  baseURL: 'http://dataservice.accuweather.com',
};

if (conf && conf.config) {
  httpConfig = {
    ...conf.config.httpClient,
  };
}

interface ILocalization {
  key: number;
  city: string;
}

async function getClientLocation(axiosInstance: AxiosInstance): Promise<ILocalization> {
  const ip: string = await v4();
  const response: AxiosResponse = await axiosInstance.get('/locations/v1/cities/ipaddress', {
    params: {
      q: ip,
    },
  });
  return {
    city: response.data.LocalizedName,
    key: response.data.Key,
  };
}

async function getLocation(location: string, axiosInstance: AxiosInstance): Promise<ILocalization> {
  const response = await axiosInstance.get('/locations/v1/search', {
    params: {
      q: location,
    },
  });
  return { key: response.data[0].Key, city: response.data[0].LocalizedName };
}

function responseToIWeatherCondition(obj: {[name: string]: any}): IWeatherCondition {
  return {
    city: obj.City,
    cloudCover: obj.CloudCover,
    date: new Date(obj.LocalObservationDateTime),
    humidity: obj.RelativeHumidity,
    icon: obj.WeatherIcon,
    isDaylight: obj.IsDayTime,
    phrase: obj.WeatherText,
    realFeelTemperature: new Temperature(
			obj.RealFeelTemperature.Metric.Value,
			TemperatureUnit.CELSIUS,
		),
    temperature: new Temperature(
			obj.Temperature.Metric.Value,
			TemperatureUnit.CELSIUS,
		),
    wind: {
      direction: new Direction(
				obj.Wind.Direction.Degrees,
				obj.Wind.Direction.Localized,
			),
      speed: new Speed(
				obj.Wind.Speed.Metric.Value,
				SpeedUnit.KM_H,
			),
    },
  };
}

export class WeatherClient {
  private httpClient: AxiosInstance = axios.create(httpConfig);

  constructor(key: string) {
    this
			.httpClient
			.defaults
			.params = {
  ...this.httpClient.defaults.params,
  apikey: key,
};
  }

  public async getCurrentWeather(location?: string): Promise<IWeatherCondition> {
    if (!location) {
      const lastLocationCheck: Date = new Date(
				cache.fetch<number>('lastLocationCheck')
				|| 0,
			);
      const checkValidityStamp: number = lastLocationCheck
				.getMilliseconds()
				+ 1000 * 60 * 60;

      if (checkValidityStamp > Date.now()) {
        const lastWeather: IWeatherCondition | undefined = cache
					.fetch<IWeatherCondition>('lastWeather');

        if (lastWeather) {
          return lastWeather;
        }
      }

      const clientLocation: ILocalization = await getClientLocation(this.httpClient);
      cache.push('lastLocationCheck', new Date(Date.now()).toJSON());

      const responseFromUserLocation: AxiosResponse = await this
				.httpClient
				.get(`/currentconditions/v1/${clientLocation.key}.json`, {
  params: {
    details: true,
  },
});
      return responseToIWeatherCondition({
        ...responseFromUserLocation.data[0],
        City: clientLocation.city,
      });
    }

    const localization: ILocalization = await getLocation(location, this.httpClient);
    const responseFromLocation: AxiosResponse = await this
		.httpClient
		.get(`/currentconditions/v1/${localization.key}.json`, {
  params: {
    details: true,
  },
});

    return responseToIWeatherCondition({
      ...responseFromLocation.data[0],
      City: localization.city,
    });
  }
}
