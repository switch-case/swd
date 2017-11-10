import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { IPerson } from '../model/person.model';

@Injectable()
export class PeopleService {

  constructor(private http: Http) { }

  people: IPerson[] = [];
  pendingPeople: IPerson[] = [];
  peopleCount = 0;
  pageNum = 1;
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

  async loadMore() {
    this.pageNum++;
    await this.loadPeople();
  }

  async loadPeople() {
    const response = await this.http.get('https://swapi.co/api/people/?page=' + this.pageNum).toPromise();
    this.pendingPeople = this.pendingPeople.concat(
      response.json().results.map(
        (person, index) => {
          return <IPerson>{
            name: person.name,
            height: this.convertFeet(person.height) + this.convertInches(person.height),
            speciesUrl: person.species[0],
            id: person.url.split('/').splice(-2, 1)[0],
            species: {}
          };
        }
      )
    );
    await this.loadDetails();
  }

  loadDetails() {
    this.pendingPeople.forEach(person =>
      this.http.get(person.speciesUrl)
        .subscribe(speciesResponse => {
          person.species = speciesResponse.json();
          const height = person.species.average_height;
          person.species.height = this.convertFeet(height) + this.convertInches(height);
        }
      )
    );
    this.people = this.people.concat(this.pendingPeople);
    this.pendingPeople = [];
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
