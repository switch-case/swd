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
    if (this.places.length < 1) {
      this.planetService.loadPlaces();
      if (this.browsingPlaces) {
        this.places = this.planetService.places;
        this.planetCount = this.planetService.getPlanetCount();
      }
    }
  }

  loadMore() {
    this.planetService.loadMore();
    this.places = this.planetService.places;
  }

  updatePlace(place) {
    this.placeClicked.emit(place);
  }
}
