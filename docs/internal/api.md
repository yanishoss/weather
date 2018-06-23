# The common API
> The common API is a JS API that is shared by all our weather apps (the CLI and what comes next...)  
> Its meaning is to allow us to manipulate weather's data without worrying about anything.  
> We just use it as a JS API and we are good to go, we don't need to worry about what API use, where put the token and so on. 

## *Class WeatherClient*

| Name | Parameters | Value | Purpose |
|:-----|:----------:|:-----:|--------:|
| constructor | key: string | Instance of WeatherClient | Creates an instance of WeatherClient and communicates with the external API with the key passed in parameters. |
| getCurrentWeather | location?: string | Promise<[WeatherCondition](#weather-condition)\> | Gets the current weather conditions of the localization provided, if no localization is passed, gets the conditions of the client's location. | 
| getForecast | period: [ForecastPeriod](#forecast-period) | Promise<Array<[WeatherCondition](#weather-condition)\>\> | Gets the forecasts for the provided period, returns a promise of an array of WeatherCondition Object sorted by date. | 


## <a id="weather-condition">*Type WeatherCondition*</a>

*{  
&nbsp;&nbsp; date: Date,                                            // Date of the forecast.  
&nbsp;&nbsp; icon: number,                                          // Number of the icon corresponding to the weather.  
&nbsp;&nbsp; iconPhrase: string,                                    // Phrase describing the weather.  
&nbsp;&nbsp; shortPhrase: string,                                    // Phrase describing the weather.  
&nbsp;&nbsp; longPhrase: string,                                    // Phrase describing the weather.  
&nbsp;&nbsp; isDaylight: boolean,                                   // Boolean telling if the forecast is happening in the day or in the night.  
&nbsp;&nbsp; rainOdds: number,                                      // Probability it will rain.   
&nbsp;&nbsp; thunderstormOdds: number,                              // Probability it will storm.   
&nbsp;&nbsp; snowOdds: number,                                      // Probability it will snow.   
&nbsp;&nbsp; iceOdds: number,                                       // Probability there will be ice.   
&nbsp;&nbsp; temperature: {   
&nbsp;&nbsp;&nbsp;&nbsp; maximum: [Temperature](#temperature),              // Object describing the maximal temperature.    
&nbsp;&nbsp;&nbsp;&nbsp; minimum: [Temperature](#temperature),              // Object describing the minimal temperature.   
&nbsp;&nbsp;},   
&nbsp;&nbsp; realFeelTemperature: {   
&nbsp;&nbsp;&nbsp;&nbsp; maximum: [Temperature](#temperature),              // Object describing the maximal felt temperature.    
&nbsp;&nbsp;&nbsp;&nbsp; minimum: [Temperature](#temperature),              // Object describing the minimal felt temperature.   
&nbsp;&nbsp;},   
&nbsp;&nbsp; cloudCover: number,                                    // Percentage of the sky the clouds will cover.  
&nbsp;&nbsp; wind: [Wind](#wind),                                   // Object describing the wind caracteristics.  
&nbsp;&nbsp; hoursOfRain: number,                                   // Time of raining.   
&nbsp;&nbsp; hoursOfSun: number,                                    // Time of day.   
&nbsp;&nbsp; sun: {    
&nbsp;&nbsp;&nbsp;&nbsp; rise: Date,   
&nbsp;&nbsp;&nbsp;&nbsp; set: Date   
&nbsp;&nbsp;},   
&nbsp;&nbsp; moon: {    
&nbsp;&nbsp;&nbsp;&nbsp; rise: Date,   
&nbsp;&nbsp;&nbsp;&nbsp; set: Date   
&nbsp;&nbsp;}   
}*  

## <a id="forecast-period">*Enum ForecastPeriod*</a>

*enum ForecastPeriod {   
&nbsp;&nbsp; 1_HOUR,   
&nbsp;&nbsp; 12_HOUR,   
&nbsp;&nbsp; 24_HOUR,   
&nbsp;&nbsp; 72_HOUR,   
&nbsp;&nbsp; 120_HOUR,   
&nbsp;&nbsp; 240_HOUR,   
&nbsp;&nbsp; 1_DAY,   
&nbsp;&nbsp; 5_DAY,   
&nbsp;&nbsp; 10_DAY,   
&nbsp;&nbsp; 15_DAY,   
&nbsp;&nbsp; 25_DAY,   
&nbsp;&nbsp; 45_DAY,   
&nbsp;&nbsp; 1_QUARTER,   
&nbsp;&nbsp; 5_QUARTER,   
&nbsp;&nbsp; 10_QUARTER,   
&nbsp;&nbsp; 15_QUARTER   
}*

## <a id="temperature-unit">*Enum TemperatureUnit*</a>

*enum TemperatureUnit {   
&nbsp;&nbsp; CELCIUS,   
&nbsp;&nbsp; FAHRENHEIT   
}*

## <a id="temperature">*Class Temperature*</a>

*{   
&nbsp;&nbsp; constructor(temperature: number, unit: [TemperatureUnit](#temperature-unit)) // Creates a Temperature object.   
&nbsp;&nbsp; set celcius(value: number): void,                       // Sets the temperature in celcius.   
&nbsp;&nbsp; get celcius(): number,                                  // Gets the temperature in celcius.   
&nbsp;&nbsp; set fahrenheit(value: number): void,                    // Sets the temperature in fahrenheit.   
&nbsp;&nbsp; get fahrenheit(): number                                // Gets the temperature in fahrenheit.   
}*

## <a id="speed-unit">*Enum SpeedUnit*</a>

*enum SpeedUnit {   
&nbsp; KM_H,  
&nbsp; MI_H  
}*

## <a id="speed">*Class Speed*</a>

*{   
&nbsp;&nbsp; constructor(speed: number, unit: [SpeedUnit](#speed-unit)), // Creates a Speed object.   
&nbsp;&nbsp; set kmPerH(value: number): void,             // Sets the speed in kilometer per hour.   
&nbsp;&nbsp; get kmPerH(): number,                        // Gets the speed in kilometer per hour.   
&nbsp;&nbsp; set miPerH(value: number): void,             // Sets the speed in mile per hour.    
&nbsp;&nbsp; get miPerH(): number                         // Gets the speed in mile per hour.            
}*

## <a id="direction">*Type Direction*</a>

*{   
&nbsp;&nbsp; degrees: number, // The degrees.   
&nbsp;&nbsp; orientation: string // The orientation (South -> S, North -> N, West -> W, East -> E).   
}*

## <a id="wind">*Type Wind*</a>

*{    
&nbsp;&nbsp; speed: Speed, // The speed of the wind.   
&nbsp;&nbsp; direction: [Direction](#direction) // The direction of the wind in degrees.   
}*
