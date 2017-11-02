import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BrowsePlacesComponent } from './browse-places.component';

describe('BrowsePlacesComponent', () => {
  let component: BrowsePlacesComponent;
  let fixture: ComponentFixture<BrowsePlacesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BrowsePlacesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BrowsePlacesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
