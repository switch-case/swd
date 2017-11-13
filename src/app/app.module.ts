import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { PopulationPipe } from './pipe/population.pipe';
import { CapitalizePipe } from './pipe/capitalize.pipe';
import { PeopleService } from './service/people.service';
import { PlanetService } from './service/planet.service';

import {
  HomeComponent,
  BrowsePlacesComponent,
  BrowsePeopleComponent,
  GiveMeSomewhereComponent,
  GiveMeSomeoneComponent
 } from './home/index';

import { Routes, RouterModule } from '@angular/router';
import { PersonDetailsComponent } from './details/person-details/person-details.component';
import { PlaceDetailsComponent } from './details/place-details/place-details.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home',  component: HomeComponent },
  { path: 'details/person/:id',  component: PersonDetailsComponent },
  { path: 'details/planet/:id',  component: PlaceDetailsComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    GiveMeSomeoneComponent,
    GiveMeSomewhereComponent,
    PopulationPipe,
    CapitalizePipe,
    BrowsePeopleComponent,
    BrowsePlacesComponent,
    HomeComponent,
    PersonDetailsComponent,
    PlaceDetailsComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    RouterModule.forRoot(routes),
  ],
  exports: [
    RouterModule
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
