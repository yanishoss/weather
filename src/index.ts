// tslint:disable

import * as Config from '@oclif/config';
import cosmiconfig, { CosmiconfigResult, Explorer } from 'cosmiconfig';
import Raven from 'raven';

import { Weather } from './cli';

// Get the value of a configuration file.
const { searchSync }: Explorer = cosmiconfig('weather');
const conf: CosmiconfigResult = searchSync();

// Configures the Sentry's client, see: https://sentry.io
Raven.config(conf !== null ? conf.config.sentryKey : '', {
  release: conf !== null
	&& !conf.isEmpty
	? conf.config.version
	: 'unknown',
}).install();

export async function run() {
  new Weather(process.argv.slice(2), await Config.load(), conf ? conf.config.accuweatherKey : '').run();
}
