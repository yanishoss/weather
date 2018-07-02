// tslint:disable

import Command, { flags } from '@oclif/command';
import * as Config from '@oclif/config';
import { get as getEmoji } from 'node-emoji';

import { WeatherClient } from '../common-api';

function emoji(iconNumber: number): string {
  switch (iconNumber) {
    case 1:
    case 2:
    case 3:
    case 4:
    case 5:
    case 30:
    default:
      return getEmoji(':sunny');
      break;
    case 6:
    case 7:
    case 8:
    case 11:
    case 32:
      return getEmoji(':cloud:');
      break;
    case 12:
    case 13:
    case 14:
    case 18:
    case 25:
    case 26:
      return getEmoji(':umbrella:');
      break;
    case 15:
    case 16:
    case 17:
      return getEmoji(':zap:');
      break;
    case 19:
    case 20:
    case 21:
    case 22:
    case 23:
    case 24:
    case 29:
    case 31:
      return getEmoji(':snowflake:');
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
      return getEmoji(':moon:');
      break;
  }
}

export class Weather extends Command {

  public static description = 'Gets the current weather';

  public static usage = 'weather [location?] --emoji --word --verbose --complete';

  public static examples: string[] = [
    '$ weather --emoji',
    '$ weather New York --verbose',
    '$ weather Paris --complete',
    '$ weather --word',
  ];

  public static args = [
    {
      name: 'location',
      required: false,
      description: 'Sets the location you want the weather to be from',
    },
  ];

  public static flags = {
    emoji: flags.boolean({
    char: 'e',
    description: 'Prints the weather as an emoji',
    exclusive: ['complete', 'word', 'verbose'],
    allowNo: false,
  }),
    word: flags.boolean({
    char: 'w',
    description: 'Prints the weather as a short word',
    exclusive: ['verbose', 'complete', 'emoji'],
    allowNo: false,
  }),
    verbose: flags.boolean({
    char: 'v',
    description: 'Prints the weather as a long sentence',
    exclusive: ['word', 'complete', 'emoji'],
    allowNo: false,
  }),
    complete: flags.boolean({
    char: 'c',
    description: 'Prints the weather in details, with temperature, wind and so on',
    exclusive: ['emoji', 'word', 'verbose'],
    allowNo: false,
  }),
  };

constructor(argv: string[], config: Config.IConfig, private accuweatherKey: string) { 
  super(argv, config);
}

  public async run() {
		const { flags, args: { location } } = this.parse(Weather); 

    if (!this.accuweatherKey) {
		this.error('There is not Accuweather API key, please create an .weatherrc.json and put a key at "accuweatherKey"'); 
  }

    try {
    const currentCondition = await new WeatherClient(this.accuweatherKey).getCurrentWeather(location);

    if (flags.emoji) {
		this.log(emoji(currentCondition.icon)); 
  }
  } catch (e) {
	this.error('A little network error occurred, please check your internet connection!'); 
  }
						console.log("From cache");
  }
}
