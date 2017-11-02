import { Component, OnInit, Output, EventEmitter, Input, OnChanges } from '@angular/core';
import { Http } from '@angular/http';
import { IPlanet } from '../model/planet.model';
import { PlanetService } from '../service/planet.service';

@Component({
  selector: 'app-give-me-somewhere',
  templateUrl: './give-me-somewhere.component.html',
  styleUrls: ['./give-me-somewhere.component.scss']
})
export class GiveMeSomewhereComponent implements OnInit {

  constructor(
    private http: Http,
    private planetService: PlanetService
  ) { }

  @Input() chosenPlace: IPlanet;
  @Output() browsePlaces: EventEmitter<string> = new EventEmitter();
  @Output() newPlace: EventEmitter<IPlanet> = new EventEmitter();

  ngOnInit() {
    this.http.get('https://swapi.co/api/planets')
      .subscribe(response => this.planetService.setPlanetCount(response.json().count)
    );
  }

  giveMeSomewhere() {
    const rand =  Math.floor(Math.random() * this.planetService.getPlanetCount()) + 1;
    this.http.get('https://swapi.co/api/planets/' + rand)
      .subscribe(response => {
        const responseJson = response.json();
        const planet = <IPlanet>{
          name: responseJson.name,
          climate: responseJson.climate,
          gravity: responseJson.gravity,
          population: responseJson.population,
          terrain: responseJson.terrain,
          hoursPerDay: responseJson.rotation_period,
          daysPerYear: responseJson.orbital_period,
        };
        this.newPlace.emit(planet);
      }
    );
  }

  browse() {
    this.browsePlaces.emit();
  }
}
