"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const weatherClient_1 = require("./weatherClient");
describe('Fetch the current weather from the API', () => {
    const client = new weatherClient_1.WeatherClient('MV6dNWozxG1YlrL2E1GQlOGLtJBvZZQC');
    test('from the user\'s location', async () => {
        const response = await client.getCurrentWeather();
        return expect(response).toBeDefined();
    });
    test('from the provided location', async () => {
        const response = await client.getCurrentWeather('paris');
        return expect(response).toBeDefined();
    });
});
