import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { IPlanet } from '../planet.model';
import { Http } from '@angular/http';

@Component({
  selector: 'app-browse-places',
  templateUrl: './browse-places.component.html',
  styleUrls: ['./browse-places.component.scss'],
  styles: [`
    .card:hover {
      box-shadow: 0 0 5px #BBB;
    }
  `]
})
export class BrowsePlacesComponent implements OnInit {

  constructor(
    private http: Http
  ) { }

  places: IPlanet[] = [];
  page = 1;
  @Output() placeClicked: EventEmitter<IPlanet> = new EventEmitter();
  @Input() browsingPlaces: boolean;
  ngOnInit() {
    this.loadPlaces(this.page);
  }

  loadMore() {
    this.page++;
    this.loadPlaces(this.page);
  }

  loadPlaces(pageNum) {
    this.http.get('https://swapi.co/api/planets/?page=' + pageNum)
      .subscribe(response => this.places = this.places.concat(response.json().results.map(planet => {
        return <IPlanet>{
          name: planet.name,
          climate: planet.climate,
          gravity: planet.gravity,
          population: planet.population,
          terrain: planet.terrain,
          hoursPerDay: planet.rotation_period,
          daysPerYear: planet.orbital_period,
        };
      }
    )));
  }

  updatePlace(place) {
    this.placeClicked.emit(place);
  }
}
