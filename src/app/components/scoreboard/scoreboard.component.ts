import { Component, Input } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatMiniFabButton } from '@angular/material/button';
import { MatTooltip } from '@angular/material/tooltip';
import { MatDialog } from '@angular/material/dialog';
import { LeaderboardComponent } from '../leaderboard/leaderboard.component';
import { GameService } from '../../services/game.service';

@Component({
  selector: 'app-scoreboard',
  standalone: true,
  imports: [MatIcon, MatMiniFabButton, MatTooltip],
  templateUrl: './scoreboard.component.html',
  styleUrl: './scoreboard.component.scss',
})
export class ScoreboardComponent {
  @Input() score: number = 0;

  constructor(
    public gameService: GameService,
    private dialog: MatDialog,
  ) {}

  openLeaderboard() {
    this.dialog.open(LeaderboardComponent);
  }
}
