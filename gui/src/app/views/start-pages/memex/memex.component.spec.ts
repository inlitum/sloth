import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemexComponent } from './memex.component';

describe('MemexComponent', () => {
  let component: MemexComponent;
  let fixture: ComponentFixture<MemexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MemexComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MemexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
