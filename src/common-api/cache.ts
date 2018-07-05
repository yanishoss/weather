import { readFile, writeFile } from 'fs';
import userHome from 'user-home';

const PATH = `${userHome}/weather.lock`;

export class Cache {
  private lockfile: {[name: string]: any} = {};
  constructor() {
    readFile(PATH, 'utf8', (err, lockfile) => {
      if (err) {
        return;
      }
      this.lockfile = JSON.parse(lockfile);
    });
  }

  public fetch<T>(key: string): T | undefined {
    return this.lockfile[key];
  }

  public push(key: string, data: any): void {
    this.lockfile[key] = data;

    writeFile(PATH, JSON.stringify(this.lockfile), (err) => {
      if (err) {
        throw err;
      }
    });
  }
}
