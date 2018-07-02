"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const cosmiconfig_1 = __importDefault(require("cosmiconfig"));
const raven_1 = __importDefault(require("raven"));
const Config = __importStar(require("@oclif/config"));
const cli_1 = require("./cli");
const { searchSync } = cosmiconfig_1.default('weather');
const conf = searchSync();
raven_1.default.config(conf !== null ? conf.config.sentryKey : '', {
    release: conf !== null
        && !conf.isEmpty
        ? conf.config.version
        : 'unknown',
}).install();
async function run() {
    new cli_1.Weather(process.argv.slice(2), await Config.load(), conf ? conf.config.accuweatherKey : "").run();
}
exports.run = run;
;
