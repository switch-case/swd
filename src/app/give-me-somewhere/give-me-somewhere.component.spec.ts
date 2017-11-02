import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GiveMeSomewhereComponent } from './give-me-somewhere.component';

describe('GiveMeSomewhereComponent', () => {
  let component: GiveMeSomewhereComponent;
  let fixture: ComponentFixture<GiveMeSomewhereComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GiveMeSomewhereComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GiveMeSomewhereComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
