import { Component, OnInit, Output, EventEmitter, Input, OnChanges } from '@angular/core';
import { IPerson } from '../model/person.model';
import { Http } from '@angular/http';
import { PeopleService } from '../service/people.service';

@Component({
  selector: 'app-give-me-someone',
  templateUrl: './give-me-someone.component.html',
  styleUrls: ['./give-me-someone.component.scss']
})
export class GiveMeSomeoneComponent implements OnInit {

  constructor(private http: Http,
    private peopleService: PeopleService) { }

  @Input() chosenPerson: IPerson;
  @Output() browsePeople: EventEmitter<string> = new EventEmitter();
  @Output() newPerson: EventEmitter<IPerson> = new EventEmitter();

  ngOnInit() {
    this.http.get('https://swapi.co/api/people')
      .subscribe(response => this.peopleService.setPeopleCount(response.json().count));
  }

  giveMeSomeone() {
    const rand =  Math.floor(Math.random() * this.peopleService.getPeopleCount()) + 1;
    this.http.get('https://swapi.co/api/people/' + rand)
      .subscribe(response => {
        const responseJson = response.json();
        const person = <IPerson>{
          name: responseJson.name,
          height: this.peopleService.convertFeet(responseJson.height) + this.peopleService.convertInches(responseJson.height),
          speciesUrl: responseJson.species[0],
          species: {}
        };

        // Fetch the species details for the new person
        this.http.get(person.speciesUrl)
          .subscribe(speciesResponse => {
            person.species = speciesResponse.json();
            const height = person.species.average_height;
            person.species.height = this.peopleService.convertFeet(height) + this.peopleService.convertInches(height);
            // Give parent component the new person
            this.newPerson.emit(person);
          }
        );
      }
    );
  }

  browse() {
    this.browsePeople.emit();
  }
}
