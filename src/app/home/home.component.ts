import { Component, OnInit } from '@angular/core';
import { IPerson } from '../person.model';
import { IPlanet } from '../planet.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  browsingPeople = false;
  browsingPlaces = false;
  chosenPerson: IPerson = undefined;
  chosenPlace: IPlanet = undefined;

  constructor() { }

  ngOnInit() {
  }

  browsePeople() {
    this.browsingPeople = true;
    this.browsingPlaces = false;
  }

  browsePlaces() {
    this.browsingPeople = false;
    this.browsingPlaces = true;
  }

  updatePerson(person) {
    this.chosenPerson = person;
  }

  updatePlace(place) {
    this.chosenPlace = place;
  }
}
