import { Component, DestroyRef, OnInit } from '@angular/core';
import { ControlsComponent } from '../../components/controls/controls.component';
import { GridboardComponent } from '../../components/gridboard/gridboard.component';
import { NgIf } from '@angular/common';
import { RobotComponent } from '../../components/robot/robot.component';
import { ScoreboardComponent } from '../../components/scoreboard/scoreboard.component';
import { TargetComponent } from '../../components/target/target.component';
import { TimerComponent } from '../../components/timer/timer.component';
import { Controls } from '../../typings/generic-types';
import { GameService } from '../../services/game.service';
import { RobotService } from '../../services/robot.service';
import { TargetService } from '../../services/target.service';
import { ControlService } from '../../services/control.service';
import { PositionXY } from '../../typings/generic-interfaces';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-game-page',
  standalone: true,
  imports: [
    ControlsComponent,
    GridboardComponent,
    NgIf,
    RobotComponent,
    ScoreboardComponent,
    TargetComponent,
    TimerComponent,
  ],
  templateUrl: './game-page.component.html',
  styleUrl: './game-page.component.scss',
})
export class GamePageComponent implements OnInit {
  gridSize: PositionXY = { x: 5, y: 5 };
  timerMilliseconds = 60000;

  constructor(
    public gameService: GameService,
    public robotService: RobotService,
    public targetService: TargetService,
    private controlService: ControlService,
    private destroyRef: DestroyRef,
  ) {}

  ngOnInit() {
    this.robotService.robotPOSChange.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => {
      if (this.controlService.controlUIMode === 'GAME') {
        this.gameService.checkOutOfBounds(this.gridSize);
        this.gameService.checkTargetHit(this.gridSize);
      }
    });
  }

  start() {
    // Set to the closest center from the provided x,y length
    const initialRobotPosition = {
      x: Math.floor(this.gridSize.x / 2),
      y: Math.floor(this.gridSize.y / 2),
    };

    this.gameService.startCurrentGame(initialRobotPosition, this.gridSize);
  }

  manageCurrentGameControls(control: Controls) {
    switch (this.controlService.controlUIMode) {
      case 'START': {
        this.start();
        break;
      }
      case 'GAME': {
        this.robotService.manageRobotControl(control);
        break;
      }
      case 'RESET': {
        this.gameService.resetCurrentGame(this.gridSize);
        break;
      }
    }
  }
}
