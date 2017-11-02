import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GiveMeSomeoneComponent } from './give-me-someone.component';

describe('GiveMeSomeoneComponent', () => {
  let component: GiveMeSomeoneComponent;
  let fixture: ComponentFixture<GiveMeSomeoneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GiveMeSomeoneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GiveMeSomeoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
