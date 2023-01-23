import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalAnnualGeneratorFlowComponent } from './total-annual-generator-flow.component';

describe('TotalAnnualGeneratorFlowComponent', () => {
  let component: TotalAnnualGeneratorFlowComponent;
  let fixture: ComponentFixture<TotalAnnualGeneratorFlowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TotalAnnualGeneratorFlowComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TotalAnnualGeneratorFlowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
