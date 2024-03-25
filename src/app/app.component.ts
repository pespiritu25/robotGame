import { Component, DoCheck } from '@angular/core';
import { NgIf } from '@angular/common';
import { RobotComponent } from './components/robot/robot.component';
import { TargetComponent } from './components/target/target.component';
import { ControlsComponent } from './components/controls/controls.component';
import { ScoreboardComponent } from './components/scoreboard/scoreboard.component';
import { TimerComponent } from './components/timer/timer.component';
import { GridboardComponent } from './components/gridboard/gridboard.component';
import { PositionXY } from './typings/generic-interfaces';
import { Controls } from './typings/generic-types';
import { GameService } from './services/game.service';
import { RobotService } from './services/robot.service';
import { ControlService } from './services/control.service';
import { TargetService } from './services/target.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RobotComponent,
    TargetComponent,
    NgIf,
    ControlsComponent,
    ScoreboardComponent,
    TimerComponent,
    GridboardComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements DoCheck {
  title = 'robot-game';

  gridSize: PositionXY = { x: 5, y: 5 };

  timerMilliseconds = 60000;

  constructor(
    public gameService: GameService,
    public robotService: RobotService,
    public targetService: TargetService,
    private controlService: ControlService,
  ) {}

  ngDoCheck() {
    if (this.controlService.controlUIMode === 'GAME') {
      this.gameService.checkOutOfBounds(this.gridSize);
      this.gameService.checkTargetHit(this.gridSize);
    }
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

  start() {
    // Set to the closest center from the provided x,y length
    const initialRobotPosition = {
      x: Math.floor(this.gridSize.x / 2),
      y: Math.floor(this.gridSize.y / 2),
    };

    this.gameService.startCurrentGame(initialRobotPosition, this.gridSize);
  }
}
