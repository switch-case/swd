import { Component, OnInit } from '@angular/core';
import { PlanetService } from '../../service/planet.service';
import { IPlanet } from '../../model/planet.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-place-details',
  templateUrl: './place-details.component.html',
  styleUrls: ['./place-details.component.scss']
})
export class PlaceDetailsComponent implements OnInit {

  place: IPlanet;
  constructor(
    private planetService: PlanetService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const id = params['id'];
      this.planetService.getPlace(id).subscribe(
        response => {
        const planet = response.json();
        this.place =
          <IPlanet>{
            name: planet.name,
            climate: planet.climate,
            gravity: planet.gravity,
            population: planet.population,
            terrain: planet.terrain,
            hoursPerDay: planet.rotation_period,
            daysPerYear: planet.orbital_period,
          };
        }
      );
    });
  }
}
