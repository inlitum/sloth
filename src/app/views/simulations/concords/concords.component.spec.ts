import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConcordsComponent } from './concords.component';

describe('ConcordsComponent', () => {
  let component: ConcordsComponent;
  let fixture: ComponentFixture<ConcordsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConcordsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConcordsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
