import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GridboardComponent } from './gridboard.component';

describe('GridboardComponent', () => {
  let component: GridboardComponent;
  let fixture: ComponentFixture<GridboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GridboardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(GridboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
