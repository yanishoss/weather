"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const user_home_1 = __importDefault(require("user-home"));
const PATH = `${user_home_1.default}/weather.lock`;
class Cache {
    constructor() {
        this.lockfile = {};
        fs_1.readFile(PATH, 'utf8', (err, lockfile) => {
            if (err) {
                return;
            }
            this.lockfile = JSON.parse(lockfile);
        });
    }
    fetch(key) {
        return this.lockfile[key];
    }
    push(key, data) {
        this.lockfile[key] = data;
        fs_1.writeFile(PATH, JSON.stringify(this.lockfile), (err) => {
            throw err;
        });
    }
}
exports.Cache = Cache;
