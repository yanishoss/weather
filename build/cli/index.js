"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const command_1 = __importStar(require("@oclif/command"));
const node_emoji_1 = require("node-emoji");
const common_api_1 = require("../common-api");
function emoji(iconNumber) {
    switch (iconNumber) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
        case 30:
        default:
            return node_emoji_1.get(':sunny');
            break;
        case 6:
        case 7:
        case 8:
        case 11:
        case 32:
            return node_emoji_1.get(':cloud:');
            break;
        case 12:
        case 13:
        case 14:
        case 18:
        case 25:
        case 26:
            return node_emoji_1.get(':umbrella:');
            break;
        case 15:
        case 16:
        case 17:
            return node_emoji_1.get(':zap:');
            break;
        case 19:
        case 20:
        case 21:
        case 22:
        case 23:
        case 24:
        case 29:
        case 31:
            return node_emoji_1.get(':snowflake:');
            break;
        case 33:
        case 34:
        case 35:
        case 36:
        case 37:
        case 38:
        case 39:
        case 40:
        case 41:
        case 42:
        case 43:
        case 44:
            return node_emoji_1.get(':moon:');
            break;
    }
}
function word(iconNumber) {
    switch (iconNumber) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
        case 30:
        default:
            return "Sunny";
            break;
        case 6:
        case 7:
        case 8:
        case 11:
        case 32:
            return "Cloudy";
            break;
        case 12:
        case 13:
        case 14:
        case 18:
        case 25:
        case 26:
            return "Rainy";
            break;
        case 15:
        case 16:
        case 17:
            return "Stormy";
            break;
        case 19:
        case 20:
        case 21:
        case 22:
        case 23:
        case 24:
        case 29:
        case 31:
            return "Snowy";
            break;
        case 33:
        case 34:
        case 35:
        case 36:
        case 37:
        case 38:
        case 39:
        case 40:
        case 41:
        case 42:
        case 43:
        case 44:
            return "Night";
            break;
    }
}
function complete({ city, isDaylight, temperature, realFeelTemperature, humidity, wind, cloudCover }) {
    return `City: ${city}\nTime: ${isDaylight ? "Day" : "Night"}\nTemperature: ${temperature.celsius.toFixed(1)} °C - ${temperature.fahrenheit.toFixed(1)} °F\nFelt Temperature: ${realFeelTemperature.celsius.toFixed(1)} °C - ${realFeelTemperature.fahrenheit.toFixed(1)} °F\nHumidity: ${humidity.toFixed(1)}%\nWind: \n\tSpeed: ${wind.speed.kmPerH.toFixed(1)} km/h - ${wind.speed.miPerH.toFixed(1)} mi/h\n\tDirection: ${wind.direction.degrees.toFixed(1)}° ${wind.direction.orientation}\nCloud: ${cloudCover.toFixed(1)}%`;
}
class Weather extends command_1.default {
    constructor(argv, config, accuweatherKey) {
        super(argv, config);
        this.accuweatherKey = accuweatherKey;
    }
    async run() {
        const { flags, args: { location } } = this.parse(Weather);
        if (!this.accuweatherKey) {
            this.log('There is not Accuweather API key, please create an .weatherrc.json and put a key at "accuweatherKey"');
        }
        try {
            const currentCondition = await new common_api_1.WeatherClient(this.accuweatherKey).getCurrentWeather(location);
            if (flags.emoji) {
                const iconEmoji = emoji(currentCondition.icon);
                return this.log(iconEmoji);
            }
            else if (flags.word) {
                return this.log(word(currentCondition.icon));
            }
            else if (flags.verbose) {
                return this.log(currentCondition.phrase);
            }
            else {
                return this.log(complete(currentCondition));
            }
        }
        catch (e) {
            if (flags.error) {
                this.error(e);
            }
            else {
                this.log(e.message);
            }
        }
    }
}
Weather.description = 'Gets the current weather';
Weather.usage = 'weather [location?] --emoji --word --verbose --complete';
Weather.examples = [
    '$ weather --emoji',
    '$ weather New York --verbose',
    '$ weather Paris --complete',
    '$ weather --word',
];
Weather.args = [
    {
        name: 'location',
        required: false,
        description: 'Sets the location you want the weather to be from',
    },
];
Weather.flags = {
    emoji: command_1.flags.boolean({
        char: 'e',
        description: 'Prints the weather as an emoji',
        exclusive: ['complete', 'word', 'verbose'],
        allowNo: false,
    }),
    word: command_1.flags.boolean({
        char: 'w',
        description: 'Prints the weather as a short word',
        exclusive: ['verbose', 'complete', 'emoji'],
        allowNo: false,
    }),
    verbose: command_1.flags.boolean({
        char: 'v',
        description: 'Prints the weather as a long sentence',
        exclusive: ['word', 'complete', 'emoji'],
        allowNo: false,
    }),
    complete: command_1.flags.boolean({
        char: 'c',
        description: 'Prints the weather in details, with temperature, wind and so on. The default output.',
        exclusive: ['emoji', 'word', 'verbose'],
        allowNo: false,
    }),
    error: command_1.flags.boolean({
        description: 'Prints the full error if one, with stack trace.'
    }),
};
exports.Weather = Weather;
