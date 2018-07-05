import { readFile, writeFile } from 'fs';
import { lock } from 'proper-lockfile';
import userHome from 'user-home';

const PATH = `${userHome}/weather.lock`;

export class Cache {
  private lockfile: {[name: string]: any} = {};
  constructor() {
    try {
      lock(PATH, { retries: 1000 })
          .then((release) => {
            readFile(PATH, 'utf8', (err, lockfile) => {
              if (err) {
                return;
              }
              this.lockfile = JSON.parse(lockfile);
              release();
            });
          },
        );
    } catch (e) {
      throw new Error(`There is a problem with the cache file locking. Here is the error: ${e}`);
    }
  }

  public fetch<T>(key: string): T | undefined {
    return this.lockfile[key];
  }

  public push(key: string, data: any): void {
    this.lockfile[key] = data;

    try {
      lock(PATH, { retries: 1000 })
        .then((release) => {
          writeFile(PATH, JSON.stringify(this.lockfile), (err) => {
            if (err) {
              throw err;
            }

            release();
          });
        },
        );
    } catch (e) {
      throw new Error(`There is a problem with the cache file locking. Here is the error: ${e}`);
    }
  }
}
