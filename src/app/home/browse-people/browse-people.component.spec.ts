import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BrowsePeopleComponent } from './browse-people.component';

describe('BrowsePeopleComponent', () => {
  let component: BrowsePeopleComponent;
  let fixture: ComponentFixture<BrowsePeopleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BrowsePeopleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BrowsePeopleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
