import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogClose, MatDialogContent, MatDialogTitle } from '@angular/material/dialog';
import { AddToLeaderboardComponent } from '../add-to-leaderboard/add-to-leaderboard.component';
import { NgIf } from '@angular/common';
import { MatButton } from '@angular/material/button';
import { GameOverDialogData } from '../../typings/generic-interfaces';

@Component({
  selector: 'app-game-over',
  standalone: true,
  imports: [MatDialogContent, AddToLeaderboardComponent, NgIf, MatButton, MatDialogTitle, MatDialogClose],
  templateUrl: './game-over.component.html',
  styleUrl: './game-over.component.scss',
})
export class GameOverComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: GameOverDialogData) {}
}
