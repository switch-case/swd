import { Injectable } from '@angular/core';

@Injectable()
export class PeopleService {

  constructor() { }

  peopleCount = 0;

  convertFeet(height) {
    height = +height * 0.0328084;
    if (!!height) {
      return Math.floor(height) + '\'';
    }
    return 'n/a';
  }

  convertInches(height) {
    height = +height * 0.0328084;
    if (!!height) {
      return (height % 1 * 12).toFixed(1) + '\'\'';
    }
    return '';
  }

  setPeopleCount(count) {
    this.peopleCount = count;
  }

  getPeopleCount() {
    return this.peopleCount;
  }
}
