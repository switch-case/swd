import { Component, OnInit } from '@angular/core';
import { IPerson } from '../model/person.model';
import { IPlanet } from '../model/planet.model';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  browsingPeople = false;
  browsingPlaces = false;

  placeCount = 0;
  peopleCount = 0;

  chosenPerson: IPerson = undefined;
  chosenPlace: IPlanet = undefined;

  constructor() { }

  ngOnInit() {
  }

  browsePeople() {
    this.browsingPeople = true;
    this.browsingPlaces = false;
  }
  newPerson(person) {
    this.chosenPerson = person;
  }
  browsePlaces() {
    this.browsingPeople = false;
    this.browsingPlaces = true;
  }

  newPlace(place) {
    this.chosenPlace = place;
  }

  updatePerson(person) {
    this.chosenPerson = person;
  }

  updatePlace(place) {
    this.chosenPlace = place;
  }
}
