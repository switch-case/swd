import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PeopleService } from '../../service/people.service';
import { IPerson } from '../../model/person.model';

@Component({
  templateUrl: './person-details.component.html',
  styleUrls: ['./person-details.component.scss']
})
export class PersonDetailsComponent implements OnInit {

  constructor(
    private peopleService: PeopleService,
    private route: ActivatedRoute
  ) { }

  person: IPerson;
  private sub: any;

  async ngOnInit() {
    this.sub = this.route.params.subscribe(async params => {
      const id = params['id'];
      this.person = await this.peopleService.getPerson(id);
    });
  }
}
