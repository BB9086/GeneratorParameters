import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateGeneratorComponent } from './create-generator.component';

describe('CreateGeneratorComponent', () => {
  let component: CreateGeneratorComponent;
  let fixture: ComponentFixture<CreateGeneratorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateGeneratorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateGeneratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
