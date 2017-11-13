import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { IPlanet } from '../model/planet.model';
@Injectable()
export class PlanetService {

  API_URL = 'https://swapi.co/api/planets/';
  constructor(
    private http: Http
  ) { }

  planetCount = 0;
  pageNum = 1;
  places: IPlanet[] = [];
  chosenPlace: IPlanet;

  getPlace(id) {
    return this.http.get(`${this.API_URL}${id}`);
  }

  loadPlaces() {
    this.http.get(`${this.API_URL}?page=${this.pageNum}`)
      .subscribe(response => this.places = this.places.concat(response.json().results.map(planet => {
        return <IPlanet>{
          name: planet.name,
          climate: planet.climate,
          gravity: planet.gravity,
          population: planet.population,
          terrain: planet.terrain,
          hoursPerDay: planet.rotation_period,
          daysPerYear: planet.orbital_period,
        };
      }
    )));
  }

  loadMore() {
    this.pageNum++;
    this.loadPlaces();
  }

  setPlanetCount(count) {
    this.planetCount = count;
  }

  getPlanetCount() {
    return this.planetCount;
  }
}
