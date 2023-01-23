import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListGeneratorsComponent } from './list-generators.component';

describe('ListGeneratorsComponent', () => {
  let component: ListGeneratorsComponent;
  let fixture: ComponentFixture<ListGeneratorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListGeneratorsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListGeneratorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
