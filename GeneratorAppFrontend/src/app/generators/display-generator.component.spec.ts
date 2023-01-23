import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayGeneratorComponent } from './display-generator.component';

describe('DisplayGeneratorComponent', () => {
  let component: DisplayGeneratorComponent;
  let fixture: ComponentFixture<DisplayGeneratorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisplayGeneratorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DisplayGeneratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
