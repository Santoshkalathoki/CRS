import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyGrievanceComponent } from './my-grievance.component';

describe('MyGrievanceComponent', () => {
  let component: MyGrievanceComponent;
  let fixture: ComponentFixture<MyGrievanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyGrievanceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyGrievanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
