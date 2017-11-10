import { Component, OnInit, Input, EventEmitter, Output, OnChanges } from '@angular/core';
import { IPerson } from '../../model/person.model';
import { Http } from '@angular/http';
import { PeopleService } from '../../service/people.service';

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
export class BrowsePeopleComponent implements OnChanges {
  constructor(
    private http: Http,
    private peopleService: PeopleService
  ) { }

  peopleCount = 0;
  people: IPerson[] = [];
  @Output() personClicked: EventEmitter<IPerson> = new EventEmitter();
  @Input() browsingPeople: boolean;
  @Input() chosenPerson: IPerson;

  // ngOnInit() {
  //   if (this.peopleService.people.length > 0 && this.browsingPeople) {
  //     this.peopleCount = this.peopleService.getPeopleCount();
  //     this.people = this.peopleService.people;
  //   }
  // }

  async ngOnChanges() {
    if (this.browsingPeople) {
      if (this.peopleService.people.length < 1) {
        await this.peopleService.loadPeople();
      }
      this.peopleCount = this.peopleService.getPeopleCount();
      this.people = this.peopleService.people;
    }
  }

  async loadMore() {
    await this.peopleService.loadMore();
    this.people = this.peopleService.people;
  }

  updatePerson(person) {
    this.personClicked.emit(person);
  }
}
