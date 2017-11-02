import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { IPerson } from '../person.model';
import { Http } from '@angular/http';
import { PeopleService } from '../people.service';

@Component({
  selector: 'app-browse-people',
  templateUrl: './browse-people.component.html',
  styleUrls: ['./browse-people.component.scss'],
  styles: [`
  .card:hover {
    box-shadow: 0 0 5px #BBB;
  }
  `]
})
export class BrowsePeopleComponent implements OnInit {
  constructor(
    private http: Http,
    private peopleService: PeopleService
  ) { }

  people: IPerson[] = [];
  pendingPeople: IPerson[] = [];
  page = 1;
  @Output() personClicked: EventEmitter<IPerson> = new EventEmitter();
  @Input() browsingPeople: boolean;
  async ngOnInit() {
    await this.loadPeople(this.page);
    this.loadDetails();
  }

  async loadMore() {
    this.page++;
    await this.loadPeople(this.page);
    this.loadDetails();
  }

  async loadPeople(pageNum) {
    const response = await this.http.get('https://swapi.co/api/people/?page=' + pageNum).toPromise();
    this.pendingPeople = this.pendingPeople.concat(
      response.json().results.map(
        person => {
          return <IPerson>{
            name: person.name,
            height: this.peopleService.convertFeet(person.height) + this.peopleService.convertInches(person.height),
            speciesUrl: person.species[0],
            species: {}
          };
        }
      )
    );
  }

  loadDetails() {
    this.pendingPeople.forEach(person =>
      this.http.get(person.speciesUrl)
        .subscribe(speciesResponse => {
          person.species = speciesResponse.json();
          const height = person.species.average_height;
          person.species.height = this.peopleService.convertFeet(height) + this.peopleService.convertInches(height);
        }
      )
    );
    this.people = this.people.concat(this.pendingPeople);
    this.pendingPeople = [];
  }

  updatePerson(person) {
    this.personClicked.emit(person);
  }
}
