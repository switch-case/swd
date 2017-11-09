import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { IPerson } from '../model/person.model';

@Injectable()
export class PeopleService {

  constructor(private http: Http) { }

  peopleCount = 0;
  API_URL = 'https://swapi.co/api/people';

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

  async getPerson(id): Promise<IPerson> {
    const response = await this.http.get('https://swapi.co/api/people/' + id).toPromise();
    const responseJson = response.json();
    const person = <IPerson>{
      name: responseJson.name,
      height: this.convertFeet(responseJson.height) + this.convertInches(responseJson.height),
      speciesUrl: responseJson.species[0],
      id,
      species: {}
    };

    // Fetch the species details for the new person
    const speciesResponse = await this.http.get(person.speciesUrl).toPromise();
    person.species = speciesResponse.json();
    const height = person.species.average_height;
    person.species.height = this.convertFeet(height) + this.convertInches(height);

    return person;
  }

  setPeopleCount(count) {
    this.peopleCount = count;
  }

  getPeopleCount() {
    return this.peopleCount;
  }
}
