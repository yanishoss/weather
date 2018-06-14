import cosmiconfig from 'cosmiconfig';
import * as Raven from 'raven';
const { searchSync } = cosmiconfig('weather');
const conf = searchSync();
Raven.config(conf !== null ? conf.config.SENTRY_KEY : '', {
    release: conf !== null
        && !conf.isEmpty
        ? conf.config.version
        : 'unknown',
}).install();
