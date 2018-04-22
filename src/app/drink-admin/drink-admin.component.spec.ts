import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DrinkAdminComponent } from './drink-admin.component';

describe('DrinkAdminComponent', () => {
  let component: DrinkAdminComponent;
  let fixture: ComponentFixture<DrinkAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DrinkAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DrinkAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
