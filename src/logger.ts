import { environment } from './environments/environment';

export function logger(...objects) {
  if (!environment.production) {
    console.log(objects);
  }
}
