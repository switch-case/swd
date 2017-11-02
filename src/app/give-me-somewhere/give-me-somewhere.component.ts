import { Component, OnInit, Output, EventEmitter, Input, OnChanges } from '@angular/core';
import { Http } from '@angular/http';
import { IPlanet } from '../planet.model';

@Component({
  selector: 'app-give-me-somewhere',
  templateUrl: './give-me-somewhere.component.html',
  styleUrls: ['./give-me-somewhere.component.scss']
})
export class GiveMeSomewhereComponent implements OnInit, OnChanges {

  constructor(private http: Http) { }

  planet: IPlanet;
  planets = 0;
  @Input() chosenPlace: IPlanet;
  @Output() browsePlaces: EventEmitter<string> = new EventEmitter();

  ngOnInit() {
    this.http.get('https://swapi.co/api/planets')
      .subscribe(response => this.planets = response.json().count
    );
    this.planet = this.chosenPlace;
  }

  ngOnChanges() {
    this.planet = this.chosenPlace;
  }

  giveMeSomewhere() {
    const rand =  Math.floor(Math.random() * this.planets) + 1;
    this.http.get('https://swapi.co/api/planets/' + rand)
      .subscribe(response => {
        const planet = response.json();
        this.planet = <IPlanet>{
          name: planet.name,
          climate: planet.climate,
          gravity: planet.gravity,
          population: planet.population,
          terrain: planet.terrain,
          hoursPerDay: planet.rotation_period,
          daysPerYear: planet.orbital_period,
        };
      }
    );
  }

  browse() {
    this.browsePlaces.emit();
  }
}
