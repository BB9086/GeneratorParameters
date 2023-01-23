import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsGeneratorComponent } from './details-generator.component';

describe('DetailsGeneratorComponent', () => {
  let component: DetailsGeneratorComponent;
  let fixture: ComponentFixture<DetailsGeneratorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailsGeneratorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailsGeneratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
