# The common API
> The common API is a JS API that is shared by all our weather apps (the CLI and what comes next...)  
> Its meaning is to allow us to manipulate weather's data without worrying about anything.  
> We just use it as a JS API and we are good to go, we don't need to worry about what API use, where put the token and so on. 

## *Class WeatherClient*

| Name | Parameters | Value | Purpose |
|:-----|:----------:|:-----:|--------:|
| constructor | key: string | Instance of WeatherClient | Creates an instance of WeatherClient and communicates with the external API with the key passed in parameters. |
| getCurrentWeather | location?: string | Promise<[WeatherCondition](#weather-condition)\> | Gets the current weather conditions of the localization provided, if no localization is passed, gets the conditions of the client's location. | 
| getForecast | period: ForecastPeriod | Promise<Array<[WeatherCondition](#weather-condition)\>\> | Gets the forecasts for the provided period, returns a promise of an array of WeatherCondition Object sorted by date. | 


## <a name="weather-condition">*Type WeatherCondition*</a>

*{  
&nbsp;&nbsp; date: Date,                               // Date of the forecast.  
&nbsp;&nbsp; icon: number,                             // Number of the icon corresponding to the weather.  
&nbsp;&nbsp; phrase: string,                           // Phrase describing the weather.  
&nbsp;&nbsp; isDaylight: boolean,                      // Boolean telling if the forecast is happening in the day or in the night.  
&nbsp;&nbsp; temperature: [Temperature](#temperature), // Object describing the temperature.  
&nbsp;&nbsp; rainOdds: number,                         // Percentage of odds it will rain.  
&nbsp;&nbsp; snowOdds: number,                         // Same as "rainOdds" but for the snow.  
&nbsp;&nbsp; iceOdds: number,                          // Same as "rainOdds" but for the ice.  
&nbsp;&nbsp; cloudCover: number,                       // Percentage of the sky the clouds will cover.  
&nbsp;&nbsp; wind: [Wind](#wind)                       // Object describing the wind caracteristics.  
&nbsp;&nbsp; rain: [Rain](#rain)                       // Object describing the rain caracteristics.  
&nbsp;&nbsp; snow: [Snow](#snow)                       // Object describing the snow caracteristics.  
&nbsp;&nbsp; ice: [Ice](#ice)                          // Object describing the ice caracteristics.  
}*  
