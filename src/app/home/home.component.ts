import { Component, OnInit } from '@angular/core';
import { IPerson } from '../model/person.model';
import { IPlanet } from '../model/planet.model';
import { PeopleService } from '../service/people.service';
import { PlanetService } from '../service/planet.service';

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

  constructor(
    private peopleService: PeopleService,
    private planetService: PlanetService,
  ) { }

  ngOnInit() {
    this.chosenPerson = this.peopleService.chosenPerson;
    this.chosenPlace = this.planetService.chosenPlace;
  }

  browsePeople() {
    this.browsingPeople = true;
    this.browsingPlaces = false;
  }
  newPerson(person) {
    this.peopleService.chosenPerson = person;
    this.chosenPerson = person;
  }
  browsePlaces() {
    this.browsingPeople = false;
    this.browsingPlaces = true;
  }

  newPlace(place) {
    this.planetService.chosenPlace = place;
    this.chosenPlace = place;
  }

  updatePerson(person) {
    this.peopleService.chosenPerson = person;
    this.chosenPerson = person;
  }

  updatePlace(place) {
    this.planetService.chosenPlace = place;
    this.chosenPlace = place;
  }
}
