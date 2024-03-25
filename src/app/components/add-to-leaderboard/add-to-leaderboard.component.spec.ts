import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddToLeaderboardComponent } from './add-to-leaderboard.component';

describe('AddToLeaderboardComponent', () => {
  let component: AddToLeaderboardComponent;
  let fixture: ComponentFixture<AddToLeaderboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddToLeaderboardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddToLeaderboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
