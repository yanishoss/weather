import { WeatherClient } from './weatherClient';

import { IWeatherCondition } from './weatherCondition';

describe('Fetch the current weather from the API', () => {
  const client: WeatherClient = new WeatherClient('MV6dNWozxG1YlrL2E1GQlOGLtJBvZZQC');

  test('from the user\'s location', async () => {
    const response: IWeatherCondition = await client.getCurrentWeather();
    return expect(response).toBeDefined();
  });

  test('from the provided location', async () => {
    const response: IWeatherCondition = await client.getCurrentWeather('paris');
    return expect(response).toBeDefined();
  });
});
