import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DrinkDmComponent } from './drink-dm.component';

describe('DrinkDmComponent', () => {
  let component: DrinkDmComponent;
  let fixture: ComponentFixture<DrinkDmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DrinkDmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DrinkDmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
