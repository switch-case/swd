import { Injectable } from '@angular/core';

@Injectable()
export class PlanetService {

  constructor() { }

  planetCount = 0;
  setPlanetCount(count) {
    this.planetCount = count;
  }

  getPlanetCount() {
    return this.planetCount;
  }
}
