import { Component, OnInit, Output, EventEmitter, Input, OnChanges } from '@angular/core';
import { IPerson } from '../person.model';
import { Http } from '@angular/http';
import { PeopleService } from '../people.service';

@Component({
  selector: 'app-give-me-someone',
  templateUrl: './give-me-someone.component.html',
  styleUrls: ['./give-me-someone.component.scss']
})
export class GiveMeSomeoneComponent implements OnInit, OnChanges {

  constructor(private http: Http,
    private peopleService: PeopleService) { }

  people: number;
  person: IPerson = undefined;
  buttonTitle = 'Give me someone!';
  @Input() chosenPerson: IPerson;
  @Output() browsePeople: EventEmitter<string> = new EventEmitter();

  ngOnInit() {
    this.http.get('https://swapi.co/api/people')
      .subscribe(response => this.people = response.json().count);
    this.person = this.chosenPerson;
  }

  ngOnChanges() {
    this.person = this.chosenPerson;
  }
  giveMeSomeone() {
    const rand =  Math.floor(Math.random() * this.people) + 1;
    this.http.get('https://swapi.co/api/people/' + rand)
      .subscribe(response => {
        const person = response.json();
        this.person = <IPerson>{
          name: person.name,
          height: this.peopleService.convertFeet(person.height) + this.peopleService.convertInches(person.height),
          speciesUrl: person.species[0],
          species: {}
        };

        this.http.get(this.person.speciesUrl)
          .subscribe(speciesResponse => {
            this.person.species = speciesResponse.json();
            const height = this.person.species.average_height;
            this.person.species.height = this.peopleService.convertFeet(height) + this.peopleService.convertInches(height);
          }
        );
      }
    );
    this.buttonTitle = 'Give me someone else!';
  }

  browse() {
    this.browsePeople.emit();
  }
}
