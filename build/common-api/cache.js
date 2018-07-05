"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const proper_lockfile_1 = require("proper-lockfile");
const user_home_1 = __importDefault(require("user-home"));
const PATH = `${user_home_1.default}/weather.lock`;
class Cache {
    constructor() {
        this.lockfile = {};
        try {
            proper_lockfile_1.lock(PATH, {
                retries: 1000
            })
                .then((release) => {
                fs_1.readFile(PATH, 'utf8', (err, lockfile) => {
                    if (err) {
                        return;
                    }
                    this.lockfile = JSON.parse(lockfile);
                    release();
                });
            });
        }
        catch (e) {
            throw new Error(`There is a problem with the cache file locking. Here is the error: ${e}`);
        }
    }
    fetch(key) {
        return this.lockfile[key];
    }
    push(key, data) {
        this.lockfile[key] = data;
        try {
            proper_lockfile_1.lock(PATH, {
                retries: 1000
            })
                .then((release) => {
                fs_1.writeFile(PATH, JSON.stringify(this.lockfile), (err) => {
                    if (err) {
                        throw err;
                    }
                    release();
                });
            });
        }
        catch (e) {
            throw new Error(`There is a problem with the cache file locking. Here is the error: ${e}`);
        }
    }
}
exports.Cache = Cache;
