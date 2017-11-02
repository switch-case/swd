import { Component, OnInit, Input, EventEmitter, Output, OnChanges } from '@angular/core';
import { IPlanet } from '../../model/planet.model';
import { PlanetService } from '../../service/planet.service';
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
export class BrowsePlacesComponent implements OnChanges {

  constructor(
    private http: Http,
    private planetService: PlanetService
  ) { }

  planetCount = 0;
  places: IPlanet[] = [];
  page = 1;
  @Output() placeClicked: EventEmitter<IPlanet> = new EventEmitter();
  @Input() browsingPlaces: boolean;
  @Input() chosenPlace: IPlanet;

  ngOnChanges() {
    if (this.places.length < 1 && this.browsingPlaces) {
      this.loadPlaces(this.page);
      this.planetCount = this.planetService.getPlanetCount();
    }
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
