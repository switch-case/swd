import { Component, OnInit, Output, EventEmitter, Input, OnChanges } from '@angular/core';
import { IPerson } from '../../model/person.model';
import { Http } from '@angular/http';
import { PeopleService } from '../../service/people.service';

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

  async giveMeSomeone() {
    const rand =  Math.floor(Math.random() * this.peopleService.getPeopleCount()) + 1;
    this.newPerson.emit(await this.peopleService.getPerson(rand));
  }

  browse() {
    this.browsePeople.emit();
  }
}
