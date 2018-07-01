import { Direction } from './direction';
import { Speed } from './speed';

export class Wind {
  constructor(public speed: Speed, public direction: Direction) {}
}
