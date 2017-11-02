import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { GiveMeSomeoneComponent } from './give-me-someone/give-me-someone.component';
import { GiveMeSomewhereComponent } from './give-me-somewhere/give-me-somewhere.component';
import { PopulationPipe } from './pipe/population.pipe';
import { CapitalizePipe } from './pipe/capitalize.pipe';
import { BrowsePeopleComponent } from './browse-people/browse-people.component';
import { BrowsePlacesComponent } from './browse-places/browse-places.component';
import { HomeComponent } from './home/home.component';
import { PeopleService } from './service/people.service';
import { PlanetService } from './service/planet.service';

@NgModule({
  declarations: [
    AppComponent,
    GiveMeSomeoneComponent,
    GiveMeSomewhereComponent,
    PopulationPipe,
    CapitalizePipe,
    BrowsePeopleComponent,
    BrowsePlacesComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    HttpModule
  ],
  providers: [
    PeopleService,
    PlanetService
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
