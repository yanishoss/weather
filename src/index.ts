import cosmiconfig, { CosmiconfigResult, Explorer } from 'cosmiconfig';
import * as Raven from 'raven';

// Get the value of a configuration file.
const { searchSync }: Explorer = cosmiconfig('weather');
const conf: CosmiconfigResult = searchSync();

// Configures the Sentry's client, see: https://sentry.io
Raven.config(conf !== null ? conf.config.SENTRY_KEY : '', {
  release: conf !== null
	&& !conf.isEmpty
	? conf.config.version
	: 'unknown',
}).install();
