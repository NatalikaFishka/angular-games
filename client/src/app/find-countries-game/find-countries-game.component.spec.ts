import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FindCountriesGameComponent } from './find-countries-game.component';

describe('FindCountriesGameComponent', () => {
  let component: FindCountriesGameComponent;
  let fixture: ComponentFixture<FindCountriesGameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FindCountriesGameComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FindCountriesGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
